export type AiProvider = 'gemini' | 'custom_ai' | 'openai';

export interface ApiConfig {
  provider: AiProvider;
  
  // Custom AI (OpenAI Standard API: URL, Model, Custom Key)
  customAiApiKey?: string;
  customAiBaseUrl?: string;
  customAiModel?: string;

  // Legacy OpenAI fields for backward compatibility
  apiKey: string;
  baseUrl: string;
  model: string;

  // Google Gemini (System key & optional personal Gemini API Key)
  geminiApiKey?: string;
  geminiModel?: string;

  // Common parameters
  temperature: number;
}

export interface ImageAttachment {
  id: string;
  name: string;
  dataUrl: string;
  mimeType: string;
  size?: number;
}

export interface ExtractedDocument {
  id: string;
  name: string;
  size: number;
  type: 'pdf' | 'docx' | 'pptx' | 'xlsx' | 'csv' | 'txt' | 'md' | 'drawio' | 'image' | 'other';
  rawText: string;
  markdown: string;
  drawioXml?: string;
  imageUrl?: string;
  metadata?: {
    pages?: number;
    slides?: number;
    sheets?: string[];
    wordCount?: number;
  };
}

export type DiagramType = 
  | 'flowchart'
  | 'sequence'
  | 'architecture'
  | 'erd'
  | 'swimlane'
  | 'mindmap'
  | 'network'
  | 'state'
  | 'class'
  | 'custom';

export type OutputFormatPreference = 'visual_and_drawio' | 'only_drawio' | 'all_formats';

export interface DiagramData {
  id: string;
  title: string;
  type: DiagramType;
  xml: string;
  summary: string;
  timestamp: number;
  pngDataUrl?: string;
  sourceDocId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  document?: ExtractedDocument;
  image?: ImageAttachment;
  diagram?: DiagramData;
  isGenerating?: boolean;
  optionsPrompt?: {
    type: 'output_choice' | 'diagram_type_choice' | 'clarification';
    question: string;
    choices: { label: string; value: string; description?: string }[];
  };
}

export interface DiagramTheme {
  name: string;
  id: string;
  primaryFill: string;
  primaryStroke: string;
  secondaryFill: string;
  secondaryStroke: string;
  accentFill: string;
  accentStroke: string;
  fontColor: string;
  bgColor: string;
  edgeColor: string;
}
