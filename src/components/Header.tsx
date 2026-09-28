import React from 'react';
import { 
  Sparkles, 
  Settings, 
  Layers, 
  PlusCircle, 
  Workflow
} from 'lucide-react';
import { ApiConfig } from '../types';

declare const __APP_VERSION__: string;
const APP_VERSION = __APP_VERSION__;

interface HeaderProps {
  apiConfig: ApiConfig;
  onOpenSettings: () => void;
  onOpenTemplates: () => void;
  onNewDiagram: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  apiConfig,
  onOpenSettings,
  onOpenTemplates,
  onNewDiagram,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur border-b border-slate-200 px-4 lg:px-6 py-3 shrink-0 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                DrawIO AI Flow Studio
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 font-mono">
                v{APP_VERSION}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
                Developed by Carmelo Battiato
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Light Mode
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Generatore e visualizzatore interattivo di diagrammi Draw.io professionali
            </p>
          </div>
        </div>

        {/* Action Controls (Cleaned & Minimal, no duplicates with chat bar) */}
        <div className="flex items-center gap-2">
          {/* Quick template button */}
          <button
            type="button"
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-2xs"
            title="Sfoglia template pronti all'uso"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Template</span>
          </button>

          {/* New Diagram Reset button */}
          <button
            type="button"
            onClick={onNewDiagram}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-2xs"
            title="Avvia una nuova sessione vuota"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Nuovo</span>
          </button>

          {/* Settings / API Key button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 text-slate-600 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-2xs"
            title="Impostazioni & Chiavi API"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
