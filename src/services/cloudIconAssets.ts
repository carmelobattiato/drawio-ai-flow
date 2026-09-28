/**
 * Official High-Definition Vector SVG Icons & Universal Component Stencils
 * 100% Offline Reliable Base64 Data URIs + Direct SVG Vector Embedding.
 * Full-color authentic logos for AI/LLM Providers, Frameworks, Cloud (AWS, GCP, Azure, K8s),
 * Databases, Message Brokers, Networking, and Smart Custom Fallbacks.
 */

// Helper to reliably convert UTF-8 SVG string into a valid Base64 Data URI
export function utf8ToBase64(str: string): string {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  return Buffer.from(str, 'utf-8').toString('base64');
}

export function svgToDataUri(svg: string): string {
  const cleaned = svg.replace(/\s+/g, ' ').trim();
  // URL-encoded (comma) form, NOT ";base64": a draw.io style is "key=value;key=value",
  // so a value containing ";" (as in "data:image/svg+xml;base64,") gets truncated by the
  // style parser and the icon renders as a broken image. encodeURIComponent escapes ";".
  return `data:image/svg+xml,${encodeURIComponent(cleaned)}`;
}

// -----------------------------------------------------------------------------------------
// AUTHENTIC VECTOR SVG ASSETS (Full-color, precise geometry, standalone viewBox 0 0 64 64)
// -----------------------------------------------------------------------------------------
export const RAW_SVG_ICONS: Record<string, string> = {
  // === AI & LLM PROVIDERS ===
  openai: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#0A0A0A"/>
      <g transform="translate(32,32) scale(0.65) translate(-32,-32)">
        <path d="M57.6 25.4c-1.2-6.5-6.5-11.4-13.2-12.2-1.3-.2-2.7-.2-4 .1-1.3-4.5-4.8-8-9.4-9.3-6.6-1.9-13.6.5-17.4 6-1.5 2.2-2.4 4.8-2.7 7.5-4.4 1.4-7.8 4.9-9.1 9.4-1.9 6.6.5 13.6 6 17.4.2 1.4.6 2.7 1.2 4-1.2 6.5 1.2 13.1 6.3 16.8 5.7 4.2 13.3 4.2 19 0 1.5 2.5 3.9 4.3 6.8 5.2 6.6 1.9 13.6-.5 17.4-6 1.5-2.2 2.4-4.8 2.7-7.5 4.4-1.4 7.8-4.9 9.1-9.4 1.9-6.6-.5-13.6-6-17.4-.2-1.6-.7-3.1-1.3-4.6zM32 40.8c-4.9 0-8.8-4-8.8-8.8s4-8.8 8.8-8.8 8.8 4 8.8 8.8-4 8.8-8.8 8.8z" fill="#FFFFFF"/>
        <path d="M32 26.5c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.5-5.5-5.5z" fill="#10B981"/>
      </g>
    </svg>
  `,

  anthropic: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#FBF0EA"/>
      <g transform="translate(14,14) scale(0.56)">
        <polygon points="39.8,11.5 24.2,11.5 0,52.5 13.8,52.5 18.6,43.8 45.4,43.8 50.2,52.5 64,52.5" fill="#D97757"/>
        <polygon points="32,23.8 23.2,37.8 40.8,37.8" fill="#FBF0EA"/>
      </g>
    </svg>
  `,

  claude: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#FBF0EA"/>
      <g transform="translate(14,14) scale(0.56)">
        <polygon points="39.8,11.5 24.2,11.5 0,52.5 13.8,52.5 18.6,43.8 45.4,43.8 50.2,52.5 64,52.5" fill="#D97757"/>
        <polygon points="32,23.8 23.2,37.8 40.8,37.8" fill="#FBF0EA"/>
      </g>
    </svg>
  `,

  gemini: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_gem" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1A73E8"/>
          <stop offset="45%" stop-color="#4285F4"/>
          <stop offset="80%" stop-color="#9333EA"/>
          <stop offset="100%" stop-color="#E8710A"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#F0F4FF"/>
      <path d="M32 10 C32 22 42 32 54 32 C42 32 32 42 32 54 C32 42 22 32 10 32 C22 32 32 22 32 10 Z" fill="url(#g_gem)"/>
    </svg>
  `,

  mistral: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#FFF7ED"/>
      <g transform="translate(15,15) scale(0.53)">
        <rect x="0" y="0" width="16" height="64" fill="#FF7000"/>
        <rect x="16" y="16" width="16" height="48" fill="#FF5000"/>
        <rect x="32" y="0" width="16" height="64" fill="#FF7000"/>
        <rect x="48" y="16" width="16" height="48" fill="#FF5000"/>
      </g>
    </svg>
  `,

  cohere: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#F4EFEA"/>
      <g transform="translate(14,14) scale(0.56)">
        <path d="M16 12 C6 12 0 20 0 32 C0 44 8 52 20 52 C32 52 36 44 36 44 C36 44 42 52 52 52 C60 52 64 44 64 36 C64 24 54 12 40 12 C28 12 24 20 24 20 C24 20 22 12 16 12 Z" fill="#39594D"/>
        <circle cx="44" cy="28" r="8" fill="#D97757"/>
        <circle cx="20" cy="36" r="6" fill="#F8A087"/>
      </g>
    </svg>
  `,

  deepseek: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_ds" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0066FF"/>
          <stop offset="100%" stop-color="#0047BA"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#EFF6FF"/>
      <g transform="translate(14,14) scale(0.56)">
        <path d="M52 24 C48 14 36 10 24 12 C14 14 6 22 4 32 C2 42 8 50 18 52 C28 54 38 48 46 40 L56 46 L52 34 C55 30 55 27 52 24 Z" fill="url(#g_ds)"/>
        <circle cx="20" cy="28" r="3.5" fill="#FFFFFF"/>
        <path d="M28 36 Q34 40 40 34" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
      </g>
    </svg>
  `,

  qwen: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_qw" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#615CED"/>
          <stop offset="100%" stop-color="#4B44DB"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#F5F3FF"/>
      <g transform="translate(16,14) scale(0.5)">
        <polygon points="32,2 58,18 58,46 32,62 6,46 6,18" fill="url(#g_qw)"/>
        <polygon points="32,14 46,24 46,40 32,50 18,40 18,24" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="32" cy="32" r="7" fill="#615CED"/>
      </g>
    </svg>
  `,

  ollama: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#18181B"/>
      <g transform="translate(16,12) scale(0.5)">
        <path d="M12 18 C12 10 18 4 26 4 C34 4 38 8 42 12 C46 8 50 4 58 4 C66 4 72 10 72 18 L72 38 C72 54 58 66 42 66 C26 66 12 54 12 38 Z" fill="#FFFFFF"/>
        <circle cx="30" cy="30" r="4.5" fill="#18181B"/>
        <circle cx="54" cy="30" r="4.5" fill="#18181B"/>
        <ellipse cx="42" cy="42" rx="6" ry="4" fill="#18181B"/>
      </g>
    </svg>
  `,

  meta: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_meta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0064E0"/>
          <stop offset="100%" stop-color="#0081FB"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#EFF6FF"/>
      <path d="M43.2 21.6c-3.1 0-5.8 1.8-7.2 4.4-1.4-2.6-4.1-4.4-7.2-4.4-5.3 0-9.6 4.3-9.6 9.6 0 7.8 9.6 13.8 16.8 13.8s16.8-6 16.8-13.8c0-5.3-4.3-9.6-9.6-9.6zm-14.4 14.4c-2.6 0-4.8-2.1-4.8-4.8s2.1-4.8 4.8-4.8c2.4 0 4.4 1.8 4.7 4.2-.7 3.1-2.6 5.4-4.7 5.4zm14.4 0c-2.1 0-4-2.3-4.7-5.4.3-2.4 2.3-4.2 4.7-4.2 2.6 0 4.8 2.1 4.8 4.8s-2.2 4.8-4.8 4.8z" fill="url(#g_meta)"/>
    </svg>
  `,

  groq: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#FFF1EE"/>
      <circle cx="32" cy="32" r="18" fill="#F55036"/>
      <circle cx="32" cy="32" r="11" fill="#FFF1EE"/>
      <path d="M38 32 L46 44 L40 44 L34 35 Z" fill="#F55036"/>
    </svg>
  `,

  perplexity: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#E6F7F6"/>
      <g transform="translate(15,15) scale(0.53)" stroke="#20B2AA" stroke-width="5" stroke-linecap="round" fill="none">
        <line x1="32" y1="6" x2="32" y2="58"/>
        <line x1="6" y1="32" x2="58" y2="32"/>
        <line x1="14" y1="14" x2="50" y2="50"/>
        <line x1="14" y1="50" x2="50" y2="14"/>
      </g>
    </svg>
  `,

  // === AI FRAMEWORKS & ORCHESTRATORS ===
  langchain: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#F0FDF4"/>
      <g transform="translate(12,14) scale(0.62)">
        <circle cx="20" cy="30" r="14" fill="none" stroke="#16A34A" stroke-width="6"/>
        <circle cx="44" cy="30" r="14" fill="none" stroke="#0284C7" stroke-width="6"/>
        <circle cx="32" cy="18" r="4.5" fill="#16A34A"/>
        <circle cx="32" cy="42" r="4.5" fill="#0284C7"/>
      </g>
    </svg>
  `,

  llamaindex: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_li" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B5CF6"/>
          <stop offset="100%" stop-color="#6D28D9"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#F5F3FF"/>
      <g transform="translate(16,12) scale(0.5)">
        <path d="M16 12 L32 2 L48 12 L48 38 L32 48 L16 38 Z" fill="url(#g_li)"/>
        <path d="M32 48 L32 66 M24 66 L40 66" stroke="#8B5CF6" stroke-width="4" stroke-linecap="round"/>
        <circle cx="32" cy="22" r="5" fill="#FFFFFF"/>
      </g>
    </svg>
  `,

  huggingface: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#FFFBEB"/>
      <g transform="translate(13,13) scale(0.59)">
        <circle cx="32" cy="32" r="26" fill="#FFD21E"/>
        <!-- Eyes -->
        <ellipse cx="22" cy="26" rx="4" ry="5" fill="#1F2937"/>
        <ellipse cx="42" cy="26" rx="4" ry="5" fill="#1F2937"/>
        <circle cx="24" cy="24" r="1.5" fill="#FFFFFF"/>
        <circle cx="44" cy="24" r="1.5" fill="#FFFFFF"/>
        <!-- Smile -->
        <path d="M22 36 Q32 46 42 36" stroke="#1F2937" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <!-- Blush -->
        <ellipse cx="16" cy="34" rx="3.5" ry="2" fill="#F87171" opacity="0.8"/>
        <ellipse cx="48" cy="34" rx="3.5" ry="2" fill="#F87171" opacity="0.8"/>
        <!-- Hugging Hands -->
        <path d="M6 38 C6 28 14 26 18 32" stroke="#FFB000" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M58 38 C58 28 50 26 46 32" stroke="#FFB000" stroke-width="4" stroke-linecap="round" fill="none"/>
      </g>
    </svg>
  `,

  vllm: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#FAF5FF"/>
      <rect x="14" y="14" width="36" height="36" rx="8" fill="#8A2BE2"/>
      <path d="M22 24 L32 44 L42 24" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  `,

  dify: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#EFF6FF"/>
      <rect x="14" y="14" width="36" height="36" rx="8" fill="#155EEF"/>
      <circle cx="26" cy="26" r="4.5" fill="#FFFFFF"/>
      <circle cx="38" cy="38" r="4.5" fill="#FFFFFF"/>
      <line x1="26" y1="26" x2="38" y2="38" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,

  // === VECTOR DBS & DATA STORES ===
  qdrant_vectordb: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_vdb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#DC2626"/>
          <stop offset="100%" stop-color="#991B1B"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#FEE2E2"/>
      <rect x="14" y="14" width="36" height="36" rx="8" fill="url(#g_vdb)"/>
      <circle cx="24" cy="24" r="3.5" fill="#FFFFFF"/>
      <circle cx="40" cy="24" r="3.5" fill="#FCA5A5"/>
      <circle cx="32" cy="34" r="4.5" fill="#FFFFFF"/>
      <circle cx="24" cy="42" r="3" fill="#FCA5A5"/>
      <circle cx="40" cy="42" r="3.5" fill="#FFFFFF"/>
      <line x1="24" y1="24" x2="32" y2="34" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="24" x2="32" y2="34" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="42" x2="32" y2="34" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="42" x2="32" y2="34" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  pinecone: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#F4F4F5"/>
      <g transform="translate(16,14) scale(0.5)">
        <polygon points="32,6 18,22 46,22" fill="#18181B"/>
        <polygon points="32,20 14,38 50,38" fill="#18181B"/>
        <polygon points="32,34 10,54 54,54" fill="#18181B"/>
        <rect x="28" y="54" width="8" height="10" rx="1" fill="#71717A"/>
      </g>
    </svg>
  `,

  chroma: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_chr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF5722"/>
          <stop offset="50%" stop-color="#FF9800"/>
          <stop offset="100%" stop-color="#4CAF50"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#FFF7ED"/>
      <circle cx="32" cy="32" r="18" fill="none" stroke="url(#g_chr)" stroke-width="7"/>
    </svg>
  `,

  milvus: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#E0F2FE"/>
      <rect x="14" y="14" width="36" height="36" rx="8" fill="#00A1EA"/>
      <polygon points="24,24 40,24 32,40" fill="#FFFFFF"/>
    </svg>
  `,

  weaviate: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#ECFDF5"/>
      <g transform="translate(16,14) scale(0.5)">
        <polygon points="32,4 58,32 32,60 6,32" fill="#00D084"/>
        <polygon points="32,16 46,32 32,48 18,32" fill="#FFFFFF"/>
      </g>
    </svg>
  `,

  redis: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#FEF2F2"/>
      <rect x="14" y="16" width="36" height="32" rx="6" fill="#DC382D"/>
      <polygon points="32,20 44,27 32,34 20,27" fill="#EF4444"/>
      <polygon points="32,32 44,39 32,46 20,39" fill="#B91C1C"/>
    </svg>
  `,

  postgresql: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#EEF2FF"/>
      <rect x="14" y="14" width="36" height="36" rx="8" fill="#336791"/>
      <ellipse cx="32" cy="28" rx="10" ry="8" fill="#FFFFFF"/>
      <path d="M26 34 Q32 44 38 34" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
    </svg>
  `,

  mongodb: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#F0FDF4"/>
      <path d="M32 12 C32 12 20 24 20 36 C20 46 26 52 32 54 C38 52 44 46 44 36 C44 24 32 12 32 12 Z" fill="#47A248"/>
      <path d="M32 12 L32 54" stroke="#FFFFFF" stroke-width="2"/>
    </svg>
  `,

  // === AWS CLOUD ===
  aws_route53: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_r53" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8C4FFF"/>
          <stop offset="100%" stop-color="#5C2BE2"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#F3E8FF"/>
      <circle cx="32" cy="32" r="20" fill="url(#g_r53)"/>
      <circle cx="32" cy="32" r="14" fill="none" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="18" y1="32" x2="46" y2="32" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="32" y1="18" x2="32" y2="46" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="22" cy="24" r="2.5" fill="#FDE047"/>
      <circle cx="42" cy="40" r="2.5" fill="#FDE047"/>
    </svg>
  `,

  aws_alb: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_alb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8C4FFF"/>
          <stop offset="100%" stop-color="#6D28D9"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#F3E8FF"/>
      <rect x="14" y="14" width="36" height="36" rx="8" fill="url(#g_alb)"/>
      <circle cx="22" cy="32" r="4" fill="#FFFFFF"/>
      <circle cx="42" cy="22" r="4" fill="#FFFFFF"/>
      <circle cx="42" cy="42" r="4" fill="#FFFFFF"/>
      <path d="M26 32 L38 22" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M26 32 L38 42" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,

  aws_eks: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_eks" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF9900"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#FEF3C7"/>
      <path d="M32 12 L50 22.5 L50 43.5 L32 54 L14 43.5 L14 22.5 Z" fill="url(#g_eks)"/>
      <circle cx="32" cy="32" r="6" fill="#FFFFFF"/>
      <circle cx="32" cy="20" r="3" fill="#FFFFFF"/>
      <circle cx="42" cy="26" r="3" fill="#FFFFFF"/>
      <circle cx="42" cy="38" r="3" fill="#FFFFFF"/>
      <circle cx="32" cy="44" r="3" fill="#FFFFFF"/>
      <circle cx="22" cy="38" r="3" fill="#FFFFFF"/>
      <circle cx="22" cy="26" r="3" fill="#FFFFFF"/>
    </svg>
  `,

  aws_aurora: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_aur" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3B48CC"/>
          <stop offset="100%" stop-color="#1E2875"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#EEF2FF"/>
      <path d="M16 20 L16 44 A16 8 0 0 0 48 44 L48 20 Z" fill="url(#g_aur)"/>
      <ellipse cx="32" cy="44" rx="16" ry="8" fill="#3B48CC"/>
      <ellipse cx="32" cy="20" rx="16" ry="8" fill="#6366F1"/>
      <circle cx="32" cy="32" r="4.5" fill="#38BDF8"/>
    </svg>
  `,

  aws_lambda: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#FFF7ED"/>
      <path d="M32 12 L50 22.5 L50 43.5 L32 54 L14 43.5 L14 22.5 Z" fill="#ED7100"/>
      <text x="32" y="39" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">&#955;</text>
    </svg>
  `,

  aws_s3: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#F7FEE7"/>
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#7AA116"/>
      <ellipse cx="32" cy="18" rx="18" ry="6" fill="#A3E635"/>
      <rect x="18" y="27" width="28" height="4" rx="2" fill="#FFFFFF" opacity="0.9"/>
    </svg>
  `,

  aws_dynamodb: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#EEF2FF"/>
      <rect x="14" y="14" width="36" height="36" rx="6" fill="#3B48CC"/>
      <polygon points="32,18 44,28 32,38 20,28" fill="#6366F1"/>
      <polygon points="32,28 44,38 32,48 20,38" fill="#818CF8"/>
    </svg>
  `,

  dr_automation: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_dr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10B981"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#ECFDF5"/>
      <rect x="14" y="14" width="36" height="36" rx="8" fill="url(#g_dr)"/>
      <path d="M24 32 A8 8 0 1 1 36 39 L36 43 L42 37 L36 31 L36 35 A4 4 0 1 0 28 32 Z" fill="#FFFFFF"/>
    </svg>
  `,

  // === CLIENT & CORE INFRASTRUCTURE ===
  client: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g_cli" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4F46E5"/>
          <stop offset="100%" stop-color="#7C3AED"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#EEF2FF"/>
      <rect x="12" y="14" width="40" height="28" rx="4" fill="url(#g_cli)"/>
      <rect x="15" y="17" width="34" height="20" rx="2" fill="#FFFFFF"/>
      <circle cx="18" cy="20" r="1.5" fill="#EF4444"/>
      <circle cx="23" cy="20" r="1.5" fill="#F59E0B"/>
      <circle cx="28" cy="20" r="1.5" fill="#10B981"/>
      <rect x="18" y="24" width="28" height="10" rx="1" fill="#F1F5F9"/>
      <path d="M26 42 L24 48 L40 48 L38 42 Z" fill="#64748B"/>
      <line x1="20" y1="48" x2="44" y2="48" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  docker: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#E0F2FE"/>
      <rect x="14" y="14" width="36" height="36" rx="8" fill="#2496ED"/>
      <rect x="20" y="24" width="6" height="6" fill="#FFFFFF"/>
      <rect x="28" y="24" width="6" height="6" fill="#FFFFFF"/>
      <rect x="36" y="24" width="6" height="6" fill="#FFFFFF"/>
      <rect x="28" y="16" width="6" height="6" fill="#FFFFFF"/>
      <rect x="36" y="16" width="6" height="6" fill="#FFFFFF"/>
      <path d="M18 32 C18 42 28 46 44 44 C48 38 48 32 48 32 Z" fill="#FFFFFF"/>
    </svg>
  `,

  kubernetes: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#EFF6FF"/>
      <circle cx="32" cy="32" r="18" fill="#326CE5"/>
      <circle cx="32" cy="32" r="6" fill="#FFFFFF"/>
      <line x1="32" y1="14" x2="32" y2="50" stroke="#FFFFFF" stroke-width="3"/>
      <line x1="16" y1="23" x2="48" y2="41" stroke="#FFFFFF" stroke-width="3"/>
      <line x1="16" y1="41" x2="48" y2="23" stroke="#FFFFFF" stroke-width="3"/>
    </svg>
  `,
};

// -----------------------------------------------------------------------------------------
// PRE-BUILT BASE64 DATA URIS
// -----------------------------------------------------------------------------------------
export const RICH_ICONS: Record<string, string> = Object.fromEntries(
  Object.entries(RAW_SVG_ICONS).map(([key, svg]) => [key, svgToDataUri(svg)])
);

/**
 * Generates an elegant, vibrant custom vector SVG badge for ANY unknown component label.
 */
export function generateCustomComponentBadgeSvg(label: string): string {
  const clean = (label || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\([^)]*\)/g, '')
    .trim();

  const words = clean.split(/[\s_\-/\\]+/).filter(Boolean);
  let initials = 'AI';
  if (words.length >= 2) {
    initials = (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1 && words[0].length >= 2) {
    initials = words[0].slice(0, 2).toUpperCase();
  }

  const safeId = `badge_${initials.replace(/[^A-Z0-9]/g, '')}_${Math.abs(hashString(clean)) % 10000}`;

  const q = (label || '').toLowerCase();
  let bg = '#EEF2FF';
  let primary = '#4F46E5';
  let secondary = '#818CF8';

  if (q.includes('dns') || q.includes('route') || q.includes('traffic') || q.includes('domain') || q.includes('net')) {
    bg = '#F3E8FF';
    primary = '#8C4FFF';
    secondary = '#A855F7';
  } else if (q.includes('data') || q.includes('db') || q.includes('sql') || q.includes('store') || q.includes('aurora') || q.includes('rds') || q.includes('dynamo')) {
    bg = '#EEF2FF';
    primary = '#3B48CC';
    secondary = '#6366F1';
  } else if (q.includes('dr') || q.includes('auto') || q.includes('sync') || q.includes('backup') || q.includes('failover') || q.includes('replic')) {
    bg = '#ECFDF5';
    primary = '#10B981';
    secondary = '#34D399';
  } else if (q.includes('k8s') || q.includes('eks') || q.includes('cluster') || q.includes('container') || q.includes('docker') || q.includes('pod')) {
    bg = '#FEF3C7';
    primary = '#F59E0B';
    secondary = '#FBBF24';
  } else if (q.includes('ai') || q.includes('llm') || q.includes('model') || q.includes('rag') || q.includes('agent') || q.includes('gpt')) {
    bg = '#FDF2F8';
    primary = '#DB2777';
    secondary = '#EC4899';
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}"/>
          <stop offset="100%" stop-color="${secondary}"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="${bg}"/>
      <rect x="12" y="12" width="40" height="40" rx="10" fill="url(#${safeId})"/>
      <circle cx="32" cy="32" r="16" fill="#FFFFFF" opacity="0.15"/>
      <text x="32" y="38" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="800" font-size="15" fill="#FFFFFF" letter-spacing="1">${initials}</text>
    </svg>
  `;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function generateCustomComponentBadge(label: string): string {
  const svg = generateCustomComponentBadgeSvg(label);
  return svgToDataUri(svg);
}

/**
 * Matches URL string or component name to authentic vector SVG
 */
export function getRichCloudIconSvg(query: string): string {
  if (!query) return generateCustomComponentBadgeSvg('AI');
  const q = query.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. AI & LLM Providers
  if (q.includes('openai') || q.includes('chatgpt') || q.includes('gpt4') || q.includes('dalle') || q.includes('o1') || q.includes('o3')) return RAW_SVG_ICONS.openai;
  if (q.includes('anthropic') || q.includes('claude') || q.includes('sonnet') || q.includes('haiku') || q.includes('opus')) return RAW_SVG_ICONS.anthropic;
  if (q.includes('gemini') || q.includes('bard') || q.includes('googleai') || q.includes('vertex')) return RAW_SVG_ICONS.gemini;
  if (q.includes('mistral') || q.includes('mixtral') || q.includes('codestral')) return RAW_SVG_ICONS.mistral;
  if (q.includes('cohere') || q.includes('commandr')) return RAW_SVG_ICONS.cohere;
  if (q.includes('deepseek')) return RAW_SVG_ICONS.deepseek;
  if (q.includes('qwen') || q.includes('tongyi')) return RAW_SVG_ICONS.qwen;
  if (q.includes('ollama')) return RAW_SVG_ICONS.ollama;
  if (q.includes('meta') || q.includes('llama')) return RAW_SVG_ICONS.meta;
  if (q.includes('groq')) return RAW_SVG_ICONS.groq;
  if (q.includes('perplexity')) return RAW_SVG_ICONS.perplexity;

  // 2. Frameworks & Tools
  if (q.includes('langchain') || q.includes('langgraph')) return RAW_SVG_ICONS.langchain;
  if (q.includes('llamaindex') || q.includes('llama_index')) return RAW_SVG_ICONS.llamaindex;
  if (q.includes('huggingface') || q.includes('transformers') || q.includes('hf')) return RAW_SVG_ICONS.huggingface;
  if (q.includes('vllm')) return RAW_SVG_ICONS.vllm;
  if (q.includes('dify')) return RAW_SVG_ICONS.dify;
  if (q.includes('docker')) return RAW_SVG_ICONS.docker;
  if (q.includes('kubernetes') || q.includes('k8s')) return RAW_SVG_ICONS.kubernetes;

  // 3. Vector DBs & Data Stores
  if (q.includes('qdrant')) return RAW_SVG_ICONS.qdrant_vectordb;
  if (q.includes('pinecone')) return RAW_SVG_ICONS.pinecone;
  if (q.includes('chroma')) return RAW_SVG_ICONS.chroma;
  if (q.includes('milvus')) return RAW_SVG_ICONS.milvus;
  if (q.includes('weaviate')) return RAW_SVG_ICONS.weaviate;
  if (q.includes('redis')) return RAW_SVG_ICONS.redis;
  if (q.includes('postgres') || q.includes('psql') || q.includes('pgvector')) return RAW_SVG_ICONS.postgresql;
  if (q.includes('mongodb') || q.includes('mongo')) return RAW_SVG_ICONS.mongodb;

  // 4. AWS Ecosystem
  if (q.includes('route53') || (q.includes('route') && q.includes('53')) || q.includes('dns')) return RAW_SVG_ICONS.aws_route53;
  if (q.includes('alb') || q.includes('loadbalancer') || q.includes('loadbalanc') || q.includes('elb')) return RAW_SVG_ICONS.aws_alb;
  if (q.includes('eks')) return RAW_SVG_ICONS.aws_eks;
  if (q.includes('aurora') || q.includes('rds') || q.includes('writer') || q.includes('replica')) return RAW_SVG_ICONS.aws_aurora;
  if (q.includes('dr') || q.includes('automation') || q.includes('recovery') || q.includes('failover') || q.includes('stepfunction')) return RAW_SVG_ICONS.dr_automation;
  if (q.includes('lambda') || q.includes('serverless')) return RAW_SVG_ICONS.aws_lambda;
  if (q.includes('s3') || q.includes('bucket')) return RAW_SVG_ICONS.aws_s3;
  if (q.includes('dynamodb') || q.includes('dynamo')) return RAW_SVG_ICONS.aws_dynamodb;

  // 5. Client
  if (q.includes('client') || q.includes('chatui') || q.includes('ui') || q.includes('frontend') || q.includes('browser') || q.includes('app')) return RAW_SVG_ICONS.client;

  // Custom Vector Badge Fallback
  return generateCustomComponentBadgeSvg(query);
}

export function getRichCloudIconUrl(query: string): string {
  const rawSvg = getRichCloudIconSvg(query);
  return svgToDataUri(rawSvg);
}
