import React from 'react';
import { X, Sparkles, Layers, ArrowRight, Check } from 'lucide-react';
import { DIAGRAM_TEMPLATES, TemplateItem } from '../services/templates';

interface TemplateGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TemplateItem) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Libreria Template Draw.io Pronti (Light Mode)</h3>
              <p className="text-xs text-slate-500">Seleziona un diagramma professionale pre-configurato in Light Mode</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
          {DIAGRAM_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="p-4 bg-slate-50/80 border border-slate-200 hover:border-indigo-400 hover:bg-white rounded-xl transition-all group flex flex-col justify-between shadow-2xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {tmpl.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Light Mode</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {tmpl.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => {
                    onSelectTemplate(tmpl);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                >
                  Carica Template <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
