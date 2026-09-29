import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

function resolvePort(): number {
  const argv = process.argv.slice(2);
  const idx = argv.findIndex((a) => a === '--port' || a === '-p');
  if (idx !== -1 && argv[idx + 1]) {
    const p = parseInt(argv[idx + 1], 10);
    if (!Number.isNaN(p)) return p;
  }
  const eq = argv.find((a) => a.startsWith('--port='));
  if (eq) {
    const p = parseInt(eq.split('=')[1], 10);
    if (!Number.isNaN(p)) return p;
  }
  return parseInt(process.env.PORT || '8090', 10);
}

const port = resolvePort();

app.use(express.json({ limit: '30mb' }));

// Helper to initialize GenAI client with custom or system key
function getGenAIClient(customApiKey?: string): GoogleGenAI {
  const key = (customApiKey && customApiKey.trim().length > 5)
    ? customApiKey.trim()
    : undefined;

  if (!key) {
    throw new Error('Chiave API Gemini personalizzata mancante. Inseriscila nelle Impostazioni.');
  }

  return new GoogleGenAI({ apiKey: key });
}

// Blocks SSRF: rejects private/link-local/loopback targets.
// Loopback allowed only in dev (local Ollama preset).
function isSafeOutboundUrl(rawUrl: string): boolean {
  let u: URL;
  try {
    u = new URL(rawUrl);
  } catch {
    return false;
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;

  const host = u.hostname.toLowerCase();
  const allowLoopback = process.env.NODE_ENV !== 'production';

  if (host === 'localhost' || host.endsWith('.localhost')) return allowLoopback;
  if (host === '::1') return allowLoopback;
  if (host.startsWith('fd') || host.startsWith('fe80')) return false;

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    const p = host.split('.').map(Number);
    if (p[0] === 127) return allowLoopback;
    if (p[0] === 0 || p[0] === 10) return false;
    if (p[0] === 169 && p[1] === 254) return false;
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return false;
    if (p[0] === 192 && p[1] === 168) return false;
  }
  return true;
}

// -------------------------------------------------------------
// 1. GOOGLE GEMINI (SYSTEM KEY & CUSTOM KEY)
// -------------------------------------------------------------

app.post('/api/gemini/test', async (req, res) => {
  try {
    const customKey = req.body.customApiKey || req.headers['x-gemini-api-key'] as string;
    const model = req.body.model || 'gemini-3.8-flash';
    const ai = getGenAIClient(customKey);

    const testPrompt = 'Rispondi solo "OK" per test di connessione.';
    const response = await ai.models.generateContent({
      model,
      contents: testPrompt,
    });

    return res.json({
      success: true,
      model,
      response: response.text?.trim() || 'OK',
      usingCustomKey: Boolean(customKey && customKey.trim().length > 5),
    });
  } catch (error: any) {
    console.error('Gemini Test Error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Errore durante il test delle API Gemini.',
    });
  }
});

app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { model, systemPrompt, messages, temperature, customApiKey, images } = req.body;
    const headerKey = req.headers['x-gemini-api-key'] as string;
    const keyToUse = customApiKey || headerKey;

    const ai = getGenAIClient(keyToUse);
    const requestedModel = model || 'gemini-3.8-flash';

    // Build parts for multimodal prompt/contents
    const parts: any[] = [];

    if (images && Array.isArray(images) && images.length > 0) {
      for (const img of images) {
        if (img && img.dataUrl) {
          const mime = img.mimeType || (img.dataUrl.includes('image/png') ? 'image/png' : img.dataUrl.includes('image/jpeg') ? 'image/jpeg' : 'image/png');
          const base64Data = img.dataUrl.includes('base64,') ? img.dataUrl.split('base64,')[1] : img.dataUrl;
          parts.push({
            inlineData: {
              mimeType: mime,
              data: base64Data,
            }
          });
        }
      }
    }

    let textContent = '';
    if (messages && Array.isArray(messages)) {
      textContent = messages
        .map((m: { role: string; content: string }) => `${m.role.toUpperCase()}: ${m.content}`)
        .join('\n\n');
    } else {
      textContent = req.body.prompt || '';
    }

    parts.push({ text: textContent });

    const contents = (parts.length === 1 && typeof parts[0].text === 'string') 
      ? parts[0].text 
      : parts;

    const config: any = {};
    if (systemPrompt) {
      config.systemInstruction = systemPrompt;
    }
    if (temperature !== undefined) {
      config.temperature = temperature;
    }

    const candidateModels = [
      requestedModel,
      ...(requestedModel !== 'gemini-2.5-flash' ? ['gemini-2.5-flash'] : []),
      ...(requestedModel !== 'gemini-3.7-flash' ? ['gemini-3.7-flash'] : []),
      ...(requestedModel !== 'gemini-3.8-flash' ? ['gemini-3.8-flash'] : []),
      ...(requestedModel !== 'gemini-3.1-flash-lite' ? ['gemini-3.1-flash-lite'] : []),
    ];

    let lastError: any = null;
    let successfulText = '';
    let usedModel = requestedModel;

    for (const candidate of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: candidate,
          contents,
          config,
        });

        if (response.text && response.text.trim().length > 0) {
          successfulText = response.text;
          usedModel = candidate;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemini Engine] Model ${candidate} returned: ${err?.message || err}. Fallback...`);
      }
    }

    if (!successfulText) {
      const errMsg = lastError?.message || 'Errore imprevisto durante la generazione con Gemini.';
      return res.status(500).json({
        error: { message: errMsg }
      });
    }

    return res.json({
      text: successfulText,
      model: usedModel,
    });
  } catch (error: any) {
    console.error('Gemini Generate Endpoint Error:', error);
    return res.status(500).json({
      error: {
        message: error?.message || 'Errore durante la chiamata alle API Gemini.',
      }
    });
  }
});

// -------------------------------------------------------------
// 2. CUSTOM AI (STANDARD OPENAI API: URL, MODEL, API KEY)
// -------------------------------------------------------------

app.post('/api/custom-ai/test', async (req, res) => {
  try {
    const { apiKey, baseUrl, model } = req.body;
    const cleanUrl = (baseUrl || 'https://api.openai.com/v1').replace(/\/+$/, '');
    const targetModel = model || 'gpt-4o';

    if (!apiKey || apiKey.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nessuna API Key o Bearer Token fornito per Custom AI.',
      });
    }

    if (!isSafeOutboundUrl(cleanUrl)) {
      return res.status(400).json({
        success: false,
        error: 'Endpoint Custom AI non consentito.',
      });
    }

    // Try /models first, fallback to lightweight /chat/completions
    let modelsRes = await fetch(`${cleanUrl}/models`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
      },
    }).catch(() => null);

    if (modelsRes && modelsRes.ok) {
      return res.json({
        success: true,
        baseUrl: cleanUrl,
        message: 'Connessione a Custom AI verificata con successo.',
      });
    }

    // Fallback lightweight chat completion test
    const chatRes = await fetch(`${cleanUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: targetModel,
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 5,
      }),
    });

    if (!chatRes.ok) {
      const errJson = await chatRes.json().catch(() => ({ error: { message: `HTTP ${chatRes.status} ${chatRes.statusText}` } }));
      return res.status(chatRes.status).json({
        success: false,
        error: errJson?.error?.message || `Errore HTTP ${chatRes.status} da ${cleanUrl}`,
      });
    }

    return res.json({
      success: true,
      baseUrl: cleanUrl,
      message: 'Connessione a Custom AI completata con successo.',
    });
  } catch (error: any) {
    console.error('Custom AI Test Error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Impossibile connettersi all\'endpoint Custom AI specificato.',
    });
  }
});

app.post('/api/custom-ai/generate', async (req, res) => {
  try {
    const { apiKey, baseUrl, model, systemPrompt, messages, temperature, images } = req.body;
    const cleanUrl = (baseUrl || 'https://api.openai.com/v1').replace(/\/+$/, '');
    const targetModel = model || 'gpt-4o';

    if (!apiKey || apiKey.trim().length === 0) {
      return res.status(400).json({
        error: { message: 'Chiave API o Token Custom AI mancante.' }
      });
    }

    if (!isSafeOutboundUrl(cleanUrl)) {
      return res.status(400).json({
        error: { message: 'Endpoint Custom AI non consentito.' }
      });
    }

    const apiMessages: any[] = [];
    if (systemPrompt) {
      apiMessages.push({ role: 'system', content: systemPrompt });
    }

    const srcMessages = Array.isArray(messages) ? messages : [{ role: 'user', content: req.body.prompt || '' }];
    for (let i = 0; i < srcMessages.length; i++) {
      const m = srcMessages[i];
      const isLast = i === srcMessages.length - 1;

      if (isLast && images && Array.isArray(images) && images.length > 0) {
        const contentParts: any[] = [{ type: 'text', text: m.content || '' }];
        for (const img of images) {
          if (img && img.dataUrl) {
            contentParts.push({
              type: 'image_url',
              image_url: { url: img.dataUrl }
            });
          }
        }
        apiMessages.push({
          role: m.role === 'system' ? 'user' : m.role,
          content: contentParts,
        });
      } else {
        apiMessages.push({
          role: m.role,
          content: m.content,
        });
      }
    }

    const isReasoning = targetModel.startsWith('o1') || targetModel.startsWith('o3') || targetModel.includes('reasoner');

    const bodyPayload: any = {
      model: targetModel,
      messages: apiMessages,
    };

    if (!isReasoning && temperature !== undefined) {
      bodyPayload.temperature = temperature;
    }

    const response = await fetch(`${cleanUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({ error: { message: `HTTP ${response.status} ${response.statusText}` } }));
      return res.status(response.status).json({
        error: { message: errJson?.error?.message || `Errore Custom AI HTTP ${response.status}` }
      });
    }

    const data = await response.json();
    const outputText = data.choices?.[0]?.message?.content || '';

    return res.json({
      text: outputText,
      model: targetModel,
    });
  } catch (error: any) {
    console.error('Custom AI Generate Error:', error);
    return res.status(500).json({
      error: {
        message: error?.message || 'Errore durante la chiamata a Custom AI.',
      }
    });
  }
});

// API endpoint to test Gemini system connectivity
app.get('/api/gemini/status', async (req, res) => {
  return res.json({
    hasSystemKey: false,
    defaultModel: 'gemini-3.8-flash',
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`DrawIO AI Flow Studio server running on port ${port}`);
  });
}

startServer().catch(console.error);
