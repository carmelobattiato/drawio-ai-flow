import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Paperclip, 
  Bot, 
  User, 
  FileText, 
  Layers, 
  Check, 
  ArrowRight, 
  Loader2,
  RefreshCw,
  Code,
  Copy,
  Download, 
  ExternalLink, 
  ChevronDown, 
  Image as ImageIcon, 
  Workflow, 
  X, 
  Maximize2 
} from 'lucide-react';
import { ChatMessage, ExtractedDocument, OutputFormatPreference, ApiConfig, ImageAttachment, AiProvider } from '../types';
import { DrawioViewer } from './DrawioViewer';
import { FormattedMessage } from './FormattedMessage';
import { parseDocumentFile } from '../services/docParser';
import { extractDrawioXml } from '../services/drawioParser';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  apiConfig: ApiConfig;
  onSendMessage: (text: string, doc?: ExtractedDocument, image?: ImageAttachment) => void;
  onOpenUpload: () => void;
  onDirectLoadDrawio?: (xml: string, title: string) => void;
  onEditXml: (xml: string) => void;
  onQuickModify: (instruction: string) => void;
  onModelChange: (modelId: string, provider: AiProvider) => void;
  onOpenSettings: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isGenerating,
  apiConfig,
  onSendMessage,
  onOpenUpload,
  onDirectLoadDrawio,
  onEditXml,
  onQuickModify,
  onModelChange,
  onOpenSettings,
}) => {
  const [input, setInput] = useState('');
  const [attachedImage, setAttachedImage] = useState<ImageAttachment | null>(null);
  const [attachedDoc, setAttachedDoc] = useState<ExtractedDocument | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const drawioInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  // Handle clipboard paste (e.g. Ctrl+V with image screenshot)
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            setAttachedImage({
              id: `paste_img_${Date.now()}`,
              name: `Screenshot_${new Date().toLocaleTimeString().replace(/:/g, '-')}.png`,
              dataUrl,
              mimeType: file.type || 'image/png',
              size: file.size,
            });
          };
          reader.readAsDataURL(file);
        }
        break;
      }
    }
  };

  // Handle file selection for images
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setAttachedImage({
        id: `upload_img_${Date.now()}`,
        name: file.name,
        dataUrl,
        mimeType: file.type || 'image/png',
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle direct .drawio or .xml file upload
  const handleDrawioFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    try {
      const text = await file.text();
      const extractedXml = extractDrawioXml(text) || text;
      
      if (onDirectLoadDrawio && (text.includes('<mxfile') || text.includes('<mxGraphModel') || text.includes('<root>'))) {
        onDirectLoadDrawio(extractedXml, file.name.replace(/\.(drawio|xml)$/i, ''));
      } else {
        const parsedDoc = await parseDocumentFile(file);
        setAttachedDoc(parsedDoc);
      }
    } catch (err) {
      console.error('Failed to parse drawio file:', err);
    }
    e.target.value = '';
  };

  // Copy text of message
  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Handle retry
  const handleRetryMessage = (msg: ChatMessage) => {
    console.log('[ChatInterface] Retrying message prompt:', msg.content);
    onSendMessage(msg.content, msg.document, msg.image);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !attachedImage && !attachedDoc) || isGenerating) return;

    onSendMessage(
      input.trim(),
      attachedDoc || undefined,
      attachedImage || undefined
    );

    setInput('');
    setAttachedImage(null);
    setAttachedDoc(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setAttachedImage({
            id: `drop_img_${Date.now()}`,
            name: file.name,
            dataUrl: reader.result as string,
            mimeType: file.type,
            size: file.size,
          });
        };
        reader.readAsDataURL(file);
      } else if (file.name.endsWith('.drawio') || file.name.endsWith('.xml') || file.name.endsWith('.drawio.xml')) {
        const text = await file.text();
        const extractedXml = extractDrawioXml(text) || text;
        if (onDirectLoadDrawio && (text.includes('<mxfile') || text.includes('<mxGraphModel') || text.includes('<root>'))) {
          onDirectLoadDrawio(extractedXml, file.name.replace(/\.(drawio|xml)$/i, ''));
        } else {
          const parsed = await parseDocumentFile(file);
          setAttachedDoc(parsed);
        }
      } else {
        const parsed = await parseDocumentFile(file);
        setAttachedDoc(parsed);
      }
    }
  };

  return (
    <div 
      onPaste={handlePaste}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={`flex flex-col h-full bg-slate-50/80 overflow-hidden relative transition-colors ${
        isDragOver ? 'bg-indigo-50/40 ring-2 ring-indigo-400 ring-inset' : ''
      }`}
    >
      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
        className="hidden"
        onChange={handleImageSelect}
      />
      <input
        ref={drawioInputRef}
        type="file"
        accept=".drawio,.xml,.drawio.xml"
        className="hidden"
        onChange={handleDrawioFileSelect}
      />

      {/* Drag overlay notice */}
      {isDragOver && (
        <div className="absolute inset-0 z-30 bg-indigo-600/10 backdrop-blur-xs flex items-center justify-center pointer-events-none">
          <div className="bg-white border-2 border-dashed border-indigo-500 rounded-2xl p-6 shadow-xl flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-indigo-600 animate-bounce" />
            <div className="text-sm font-bold text-slate-900">
              Rilascia l'immagine, il file .drawio o il documento per allegarlo alla chat
            </div>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          const isErrorMessage = !isUser && (msg.content.includes('⚠️') || msg.content.toLowerCase().includes('errore'));

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-6xl xl:max-w-7xl mx-auto w-full ${
                isUser ? 'justify-end' : 'justify-start'
              } animate-in fade-in duration-200`}
            >
              {/* Bot Avatar */}
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-600/20 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble Container (Enlarged +40%) */}
              <div className={`space-y-1.5 max-w-4xl lg:max-w-5xl xl:max-w-6xl flex flex-col ${isUser ? 'items-end' : 'items-start'} ${msg.diagram ? 'w-full' : ''}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-sm ml-auto shadow-md shadow-indigo-600/20 font-medium'
                      : isErrorMessage
                      ? 'bg-rose-50/90 border border-rose-200 text-rose-900 rounded-tl-sm shadow-sm w-full'
                      : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-sm shadow-sm w-full'
                  }`}
                >
                  {/* Image Attachment Preview */}
                  {msg.image && (
                    <div className="mb-3 rounded-xl overflow-hidden border border-white/20 bg-black/10 relative group">
                      <img 
                        src={msg.image.dataUrl} 
                        alt={msg.image.name} 
                        className="max-h-60 w-auto object-contain cursor-pointer transition hover:opacity-95"
                        onClick={() => setPreviewModalImage(msg.image?.dataUrl || null)}
                      />
                      <div className="p-1.5 bg-black/50 text-[10px] text-white flex items-center justify-between">
                        <span className="truncate">{msg.image.name}</span>
                        <button 
                          type="button"
                          onClick={() => setPreviewModalImage(msg.image?.dataUrl || null)}
                          className="hover:text-indigo-200 flex items-center gap-1 cursor-pointer"
                        >
                          <Maximize2 className="w-3 h-3" /> Ingrandisci
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Document Attachment badge */}
                  {msg.document && (
                    <div className={`mb-3 p-2.5 rounded-xl flex items-center gap-2.5 ${
                      isUser 
                        ? 'bg-indigo-700/60 border border-indigo-400/30 text-white'
                        : 'bg-slate-50 border border-slate-200 text-slate-800'
                    }`}>
                      <FileText className={`w-4 h-4 shrink-0 ${isUser ? 'text-indigo-200' : 'text-indigo-600'}`} />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs truncate">
                          {msg.document.name}
                        </div>
                        <div className={`text-[10px] ${isUser ? 'text-indigo-200' : 'text-slate-500'}`}>
                          {(msg.document.size / 1024).toFixed(1)} KB • {msg.document.type.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Text Content with Rich Markdown Rendering */}
                  <div className="font-sans">
                    <FormattedMessage content={msg.content} isUser={isUser} />
                  </div>

                  {/* Interactive Options Prompt if present */}
                  {msg.optionsPrompt && (
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                      <p className="font-bold text-xs text-indigo-700">
                        {msg.optionsPrompt.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {msg.optionsPrompt.choices.map((choice, i) => (
                          <button
                            key={i}
                            onClick={() => onSendMessage(choice.value)}
                            className="p-2.5 bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition group cursor-pointer"
                          >
                            <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 flex items-center justify-between">
                              {choice.label}
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition" />
                            </div>
                            {choice.description && (
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {choice.description}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Bottom Action Toolbar (Copy & Retry) */}
                <div className={`flex items-center gap-1.5 px-1 text-[11px] ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {/* Copy chat text button */}
                  <button
                    type="button"
                    onClick={() => handleCopyMessage(msg.id, msg.content)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-200/60 active:bg-slate-300/60 transition cursor-pointer font-medium"
                    title="Copia il testo di questo messaggio"
                  >
                    {copiedMsgId === msg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copiato!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-600" />
                        <span>Copia testo</span>
                      </>
                    )}
                  </button>

                  {/* Retry button for User messages */}
                  {isUser && (
                    <button
                      type="button"
                      onClick={() => handleRetryMessage(msg)}
                      disabled={isGenerating}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-200/60 active:bg-slate-300/60 transition disabled:opacity-40 cursor-pointer font-medium"
                      title="Riprova / reinvia questo prompt"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-slate-400 hover:text-indigo-600 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>Riprova</span>
                    </button>
                  )}

                  {/* Retry button for Assistant error messages */}
                  {isErrorMessage && index > 0 && messages[index - 1].role === 'user' && (
                    <button
                      type="button"
                      onClick={() => handleRetryMessage(messages[index - 1])}
                      disabled={isGenerating}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-100 text-rose-700 hover:bg-rose-200 transition font-bold disabled:opacity-40 cursor-pointer"
                      title="Riprova la richiesta precedente"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>Riprova Prompt</span>
                    </button>
                  )}
                </div>

                {/* Embedded Draw.io Viewer if diagram is generated */}
                {msg.diagram && (
                  <div className="w-full mt-2">
                    <DrawioViewer
                      xml={msg.diagram.xml}
                      title={msg.diagram.title}
                      onEditXml={() => msg.diagram && onEditXml(msg.diagram.xml)}
                      onQuickModify={onQuickModify}
                    />
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 mt-1 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Generating Indicator */}
        {isGenerating && (
          <div className="flex gap-3 max-w-6xl xl:max-w-7xl mx-auto w-full items-start animate-in fade-in">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 animate-pulse shadow-md shadow-indigo-600/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3 text-xs font-semibold text-slate-700">
              <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>Generazione o modifica del diagramma Draw.io in corso...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 bg-white/95 border-t border-slate-200/90 backdrop-blur shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-6xl xl:max-w-7xl mx-auto space-y-2">
          {/* Attachment Chips if any */}
          {(attachedImage || attachedDoc) && (
            <div className="flex items-center gap-2 flex-wrap pb-1 animate-in fade-in">
              {attachedImage && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 shadow-2xs">
                  <img src={attachedImage.dataUrl} alt="Thumbnail" className="w-6 h-6 object-cover rounded border border-sky-300" />
                  <span className="font-semibold truncate max-w-[180px]">{attachedImage.name}</span>
                  <span className="text-[10px] text-sky-600">({(attachedImage.size ? attachedImage.size / 1024 : 0).toFixed(0)} KB)</span>
                  <button
                    type="button"
                    onClick={() => setAttachedImage(null)}
                    className="p-0.5 text-sky-600 hover:text-rose-600 rounded transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {attachedDoc && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 shadow-2xs">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold truncate max-w-[180px]">{attachedDoc.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachedDoc(null)}
                    className="p-0.5 text-indigo-600 hover:text-rose-600 rounded transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="relative bg-white border border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 rounded-2xl p-2.5 transition-all shadow-xs">
            <textarea
              ref={textareaRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Descrivi il diagramma, chiedi modifiche a quello caricato o incolla un'immagine dalla clipboard (Ctrl+V)..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-2 py-1 focus:outline-none resize-none"
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 px-1 gap-2 flex-wrap sm:flex-nowrap">
              {/* Attachment Actions */}
              <div className="flex items-center gap-1.5">
                {/* Image upload trigger */}
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                  title="Incolla o allega immagine / screenshot (PNG, JPG, WebP)"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-sky-600" />
                  <span className="hidden sm:inline">Incolla/Allega Immagine</span>
                  <span className="sm:hidden">Immagine</span>
                </button>

                {/* Direct Draw.io upload trigger */}
                <button
                  type="button"
                  onClick={() => drawioInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                  title="Carica un file .drawio o XML esistente per visualizzarlo o modificarlo"
                >
                  <Workflow className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Carica .drawio</span>
                  <span className="sm:hidden">.drawio</span>
                </button>

                {/* Document upload trigger */}
                <button
                  type="button"
                  onClick={onOpenUpload}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                  title="Importa DOCX, PPTX, PDF, Excel"
                >
                  <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Doc</span>
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end w-full sm:w-auto">
                {/* Combobox selezione Modello */}
                <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-indigo-500 rounded-xl px-2.5 py-1 transition group shadow-2xs">
                  <Sparkles className="w-3 h-3 text-indigo-600 shrink-0 mr-1.5" />
                  <select
                    value={`${apiConfig.provider === 'openai' ? 'custom_ai' : apiConfig.provider}:${apiConfig.model}`}
                    onChange={(e) => {
                      const [provider, model] = e.target.value.split(':') as [AiProvider, string];
                      onModelChange(model, provider);
                      
                      // Check if custom AI requires opening settings
                      if (provider === 'custom_ai' && (!apiConfig.customAiApiKey && !apiConfig.apiKey)) {
                        onOpenSettings();
                      }
                    }}
                    className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer pr-1 appearance-none max-w-[180px] sm:max-w-none truncate"
                    title="Seleziona modello AI per la generazione"
                  >
                    <optgroup label="Google Gemini (Chiave di Sistema)" className="bg-white text-slate-900">
                      <option value="gemini:gemini-2.5-flash">Gemini 2.5 Flash (Stabile)</option>
                      <option value="gemini:gemini-3.8-flash">Gemini 3.8 Flash</option>
                      <option value="gemini:gemini-3.7-flash">Gemini 3.7 Flash</option>
                      <option value="gemini:gemini-3.1-pro-preview">Gemini 3.1 Pro (Deep)</option>
                      <option value="gemini:gemini-3.1-flash-lite">Gemini 3.1 Lite</option>
                    </optgroup>

                    <optgroup label="Custom AI (Standard OpenAI API)" className="bg-white text-slate-900">
                      <option value="custom_ai:gpt-4o">Custom AI: GPT-4o</option>
                      <option value="custom_ai:gpt-4o-mini">Custom AI: GPT-4o Mini</option>
                      <option value="custom_ai:o3-mini">Custom AI: o3-mini (Reasoning)</option>
                      <option value="custom_ai:deepseek-chat">Custom AI: DeepSeek-V3</option>
                      <option value="custom_ai:deepseek-reasoner">Custom AI: DeepSeek-R1</option>
                      <option value="custom_ai:llama-3.3-70b-versatile">Custom AI: Llama 3.3 70B</option>
                      {apiConfig.customAiModel && !['gpt-4o', 'gpt-4o-mini', 'o3-mini', 'deepseek-chat', 'deepseek-reasoner', 'llama-3.3-70b-versatile'].includes(apiConfig.customAiModel) && (
                        <option value={`custom_ai:${apiConfig.customAiModel}`}>Custom: {apiConfig.customAiModel}</option>
                      )}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-500 pointer-events-none shrink-0" />
                </div>

                <span className="text-[10px] text-slate-400 hidden md:inline shrink-0">
                  Premi <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono">Invio</kbd>
                </span>

                <button
                  type="submit"
                  disabled={(!input.trim() && !attachedImage && !attachedDoc) || isGenerating}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20 shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Invia
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Image Preview Enlarged Modal */}
      {previewModalImage && (
        <div 
          onClick={() => setPreviewModalImage(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer animate-in fade-in"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setPreviewModalImage(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={previewModalImage} alt="Preview" className="max-h-[85vh] w-auto object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
