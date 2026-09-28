import React, { useState, useEffect } from 'react';
import { Code, Check, Copy, X, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface XmlCodeEditorProps {
  xml: string;
  isOpen: boolean;
  onClose: () => void;
  onApply: (updatedXml: string) => void;
}

export const XmlCodeEditor: React.FC<XmlCodeEditorProps> = ({
  xml,
  isOpen,
  onClose,
  onApply,
}) => {
  const [content, setContent] = useState<string>(xml || '');
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sync content whenever modal opens or xml prop changes
  useEffect(() => {
    if (isOpen) {
      setContent(xml || '');
      setError(null);
    }
  }, [xml, isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    // XML validation check
    try {
      if (!content.trim()) {
        setError('Il codice XML non può essere vuoto.');
        return;
      }
      const parser = new DOMParser();
      const dom = parser.parseFromString(content, 'text/xml');
      const parserErrors = dom.getElementsByTagName('parsererror');
      if (parserErrors.length > 0) {
        setError('Sintassi XML non valida. Controlla i tag o le virgolette non chiuse.');
        return;
      }
      setError(null);
      onApply(content);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'XML non valido');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Editor Sorgente XML Draw.io</h3>
              <p className="text-xs text-slate-500">Modifica direttamente celle mxCell, coordinate e attributi grafici in Light Mode</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiato!' : 'Copia XML'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code text area */}
        <div className="flex-1 p-4 bg-slate-100/70 flex flex-col overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error) setError(null);
            }}
            spellCheck={false}
            placeholder="Incolla o modifica qui l'XML del diagramma Draw.io..."
            className="w-full h-full bg-white text-slate-900 font-mono text-xs p-4 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none resize-none leading-relaxed selection:bg-indigo-600 selection:text-white shadow-inner"
          />
        </div>

        {error && (
          <div className="mx-4 mb-2 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 bg-slate-50/80">
          <button
            type="button"
            onClick={() => setContent(xml || '')}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs rounded-lg transition flex items-center gap-1.5 shadow-2xs font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Ripristina originale
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-indigo-600/20"
            >
              Applica Modifiche
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
