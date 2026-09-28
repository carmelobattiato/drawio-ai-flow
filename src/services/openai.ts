import { ApiConfig, ExtractedDocument, ImageAttachment } from '../types';
import { DRAWIO_SYSTEM_PROMPT } from './drawioPrompt';

export const AVAILABLE_GEMINI_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Ultra-Stabile & Veloce)', tag: 'Consigliato' },
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash (Nuova Generazione)', tag: 'Nuovo' },
  { id: 'gemini-3.7-flash', name: 'Gemini 3.7 Flash (Elevata accuratezza)', tag: 'Popolare' },
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro (Deep Reasoning architetture)', tag: 'Pro' },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite (Leggero)', tag: 'Fast' },
];

export const AVAILABLE_CUSTOM_AI_PRESETS = [
  { id: 'openai', name: 'OpenAI Ufficiale', url: 'https://api.openai.com/v1', defaultModel: 'gpt-4o' },
  { id: 'openrouter', name: 'OpenRouter', url: 'https://openrouter.ai/api/v1', defaultModel: 'openai/gpt-4o' },
  { id: 'groq', name: 'Groq Cloud', url: 'https://api.groq.com/openai/v1', defaultModel: 'llama-3.3-70b-versatile' },
  { id: 'deepseek', name: 'DeepSeek API', url: 'https://api.deepseek.com/v1', defaultModel: 'deepseek-chat' },
  { id: 'ollama', name: 'Ollama (Locale)', url: 'http://localhost:11434/v1', defaultModel: 'llama3' },
  { id: 'together', name: 'Together AI', url: 'https://api.together.xyz/v1', defaultModel: 'meta-llama/Llama-3.3-70B-Instruct-Turbo' },
  { id: 'mistral', name: 'Mistral AI', url: 'https://api.mistral.ai/v1', defaultModel: 'mistral-large-latest' },
];

export const POPULAR_CUSTOM_AI_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o (OpenAI)', tag: 'Consigliato' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini (OpenAI)', tag: 'Fast' },
  { id: 'o3-mini', name: 'o3-mini (OpenAI High Reasoning)', tag: 'Reasoning' },
  { id: 'deepseek-chat', name: 'DeepSeek-V3 (DeepSeek)', tag: 'Economico' },
  { id: 'deepseek-reasoner', name: 'DeepSeek-R1 (Reasoning)', tag: 'Reasoning' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B (Groq / Meta)', tag: 'Ultra Veloce' },
  { id: 'mistral-large-latest', name: 'Mistral Large (Mistral AI)', tag: 'Preciso' },
  { id: 'qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B', tag: 'Avanzato' },
];

export const AVAILABLE_OPENAI_MODELS = POPULAR_CUSTOM_AI_MODELS;

export const DEFAULT_API_CONFIG: ApiConfig = {
  provider: 'gemini',
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1',
  model: 'gemini-3.8-flash',
  customAiApiKey: '',
  customAiBaseUrl: 'https://api.openai.com/v1',
  customAiModel: 'gpt-4o',
  geminiApiKey: '',
  geminiModel: 'gemini-3.8-flash',
  temperature: 0.1,
  iconMode: 'embed',
};

/**
 * Validates Custom AI (OpenAI API Standard) connection
 */
export async function testCustomAiConnection(config: ApiConfig): Promise<{ success: boolean; message: string }> {
  const apiKey = config.customAiApiKey || config.apiKey;
  const baseUrl = (config.customAiBaseUrl || config.baseUrl || 'https://api.openai.com/v1').replace(/\/+$/, '');
  const model = config.customAiModel || config.model || 'gpt-4o';

  if (!apiKey || apiKey.trim().length === 0) {
    return { success: false, message: 'La chiave API o Token per Custom AI è vuota.' };
  }

  try {
    const res = await fetch('/api/custom-ai/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: apiKey.trim(),
        baseUrl,
        model,
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      return { 
        success: true, 
        message: `Connessione a Custom AI (${baseUrl}) riuscita con successo!` 
      };
    }

    return { 
      success: false, 
      message: data?.error?.message || data?.error || `Errore di connessione a Custom AI (HTTP ${res.status}).` 
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Impossibile connettersi al proxy Custom AI.' };
  }
}

export const testOpenAIConnection = testCustomAiConnection;

/**
 * Validates Google Gemini connection (system or user key)
 */
export async function testGeminiConnection(config?: ApiConfig): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/gemini/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customApiKey: config?.geminiApiKey,
        model: config?.model || config?.geminiModel || 'gemini-3.8-flash',
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      return { 
        success: true, 
        message: `Connessione a Google Gemini riuscita con successo! (Modello: ${data.model})` 
      };
    }

    return { 
      success: false, 
      message: data?.error || 'Impossibile verificare la connessione con Google Gemini.' 
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Server proxy Gemini non raggiungibile.' };
  }
}

export interface GenerationRequest {
  config: ApiConfig;
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
  currentDiagramXml?: string;
  documentContext?: ExtractedDocument;
  images?: ImageAttachment[];
  customInstruction?: string;
}

/**
 * Calls AI model (Google Gemini or Custom AI OpenAI Standard)
 */
export async function generateDiagramResponse(req: GenerationRequest): Promise<string> {
  const { config, messages, currentDiagramXml, documentContext, images, customInstruction } = req;

  // Build full system content
  let systemContent = DRAWIO_SYSTEM_PROMPT;
  if (currentDiagramXml) {
    systemContent += `\n\n### DIAGRAMMA ATTUALE IN USO (da aggiornare o modificare su richiesta dell'utente):\n\`\`\`xml\n${currentDiagramXml}\n\`\`\``;
  }
  if (documentContext) {
    if (documentContext.drawioXml) {
      systemContent += `\n\n### DIAGRAMMA DRAW.IO IMPORTATO DA FILE (${documentContext.name}):\n\`\`\`xml\n${documentContext.drawioXml}\n\`\`\`\n*Applica fedelmente le modifiche richieste dall'utente partendo da questo XML.*`;
    } else {
      systemContent += `\n\n### DOCUMENTO DI RIFERIMENTO ESTRATTO (${documentContext.name}):\n\`\`\`markdown\n${documentContext.markdown.slice(0, 20000)}\n\`\`\``;
    }
  }
  if (images && images.length > 0) {
    systemContent += `\n\n### IMMAGINI / SCREENSHOT ALLEGATI: Sono presenti ${images.length} immagine/i allegate. Analizza attentamente le forme visive, le etichette di testo, i collegamenti logici, i cluster o i layout e ricreali / modificali con precisione in Draw.io XML.`;
  }
  if (customInstruction) {
    systemContent += `\n\n### ISTRUZIONE AGGIUNTIVA:\n${customInstruction}`;
  }

  const isGemini = config.provider === 'gemini';

  // 1. Google Gemini Provider
  if (isGemini) {
    const response = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.geminiModel || config.model || 'gemini-3.8-flash',
        customApiKey: config.geminiApiKey,
        systemPrompt: systemContent,
        messages: messages.map(m => ({
          role: m.role === 'system' ? 'user' : m.role,
          content: m.content,
        })),
        images: images && images.length > 0 ? images.map(img => ({ dataUrl: img.dataUrl, mimeType: img.mimeType })) : undefined,
        temperature: config.temperature ?? 0.1,
      }),
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({ error: { message: `HTTP ${response.status} ${response.statusText}` } }));
      throw new Error(`Gemini Error: ${errorJson?.error?.message || `HTTP ${response.status}`}`);
    }

    const data = await response.json();
    return data.text || '';
  }

  // 2. Custom AI (OpenAI API Standard)
  const apiKey = config.customAiApiKey || config.apiKey;
  const baseUrl = (config.customAiBaseUrl || config.baseUrl || 'https://api.openai.com/v1').replace(/\/+$/, '');
  const model = config.customAiModel || config.model || 'gpt-4o';

  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error('Nessuna chiave API o token configurato per Custom AI. Inseriscilo nelle Impostazioni o seleziona Google Gemini.');
  }

  const response = await fetch('/api/custom-ai/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: apiKey.trim(),
      baseUrl,
      model,
      systemPrompt: systemContent,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
      images: images && images.length > 0 ? images.map(img => ({ dataUrl: img.dataUrl, mimeType: img.mimeType })) : undefined,
      temperature: config.temperature ?? 0.1,
    }),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({ error: { message: `HTTP ${response.status} ${response.statusText}` } }));
    throw new Error(`Custom AI Error (${baseUrl}): ${errorJson?.error?.message || errorJson?.error || `HTTP ${response.status}`}`);
  }

  const data = await response.json();
  return data.text || '';
}
