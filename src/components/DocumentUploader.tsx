import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  FileSpreadsheet, 
  FileCheck, 
  Presentation, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  Eye,
  CheckCircle2,
  X,
  FileCode,
  Image as ImageIcon,
  Workflow
} from 'lucide-react';
import { parseDocumentFile } from '../services/docParser';
import { ExtractedDocument, DiagramType, OutputFormatPreference } from '../types';

interface DocumentUploaderProps {
  onDocumentProcessed: (doc: ExtractedDocument, preferredWorkflow?: string, formatPref?: OutputFormatPreference) => void;
  onDirectLoadDrawio?: (xml: string, title: string) => void;
  onCancel?: () => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onDocumentProcessed,
  onDirectLoadDrawio,
  onCancel,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [doc, setDoc] = useState<ExtractedDocument | null>(null);
  const [activeTab, setActiveTab] = useState<'workflow' | 'markdown'>('workflow');
  const [workflowGoal, setWorkflowGoal] = useState<string>('flowchart');
  const [customGoal, setCustomGoal] = useState<string>('');
  const [formatPref, setFormatPref] = useState<OutputFormatPreference>('visual_and_drawio');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    
    setIsParsing(true);
    setErrorMsg(null);

    try {
      const extracted = await parseDocumentFile(file);
      setDoc(extracted);
      if (extracted.type === 'drawio') {
        setWorkflowGoal('modify_drawio');
      } else if (extracted.type === 'image') {
        setWorkflowGoal('image_to_drawio');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Errore durante la conversione del file.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleGenerate = () => {
    if (!doc) return;
    
    let goalDescription = '';
    if (doc.type === 'drawio') {
      if (customGoal.trim()) {
        goalDescription = `Ho caricato il diagramma Draw.io esistente "${doc.name}". Applica queste modifiche: ${customGoal.trim()}. Restituisci l'XML Draw.io completo aggiornato mantenendo lo stile Light Mode pulito.`;
      } else {
        goalDescription = `Ho caricato il diagramma Draw.io "${doc.name}". Ottimizzalo, uniforma i colori in Light Mode e migliora la disposizione dei connettori e dei nodi.`;
      }
    } else if (doc.type === 'image') {
      if (customGoal.trim()) {
        goalDescription = `Analizza questa immagine/screenshot "${doc.name}" e ricrea il diagramma corrispondente in formato Draw.io XML applicando anche: ${customGoal.trim()}.`;
      } else {
        goalDescription = `Analizza attentamente l'immagine/screenshot "${doc.name}" fornita. Estrai e ricrea tutte le forme geometriche, le etichette di testo, i collegamenti a freccia e la gerarchia in un diagramma Draw.io completo in Light Mode.`;
      }
    } else {
      if (workflowGoal === 'flowchart') goalDescription = 'Genera un Diagramma di Flusso (Flowchart) completo e logico in Light Mode che illustri step-by-step il workflow descritto nel documento.';
      else if (workflowGoal === 'architecture') goalDescription = 'Genera un Diagramma di Architettura di Sistema / Cloud in Light Mode che mostri tutti i componenti, i servizi, i database e le interazioni descritte.';
      else if (workflowGoal === 'swimlane') goalDescription = 'Genera un Diagramma Swimlane (a corsie) in Light Mode per separare ruoli, dipartimenti o servizi coinvolti nel processo.';
      else if (workflowGoal === 'sequence') goalDescription = 'Genera un Diagramma di Sequenza in Light Mode che evidenzi lo scambio di messaggi e chiamate API in ordine temporale.';
      else if (workflowGoal === 'erd') goalDescription = 'Genera un Entity Relationship Diagram (ERD) in Light Mode con le entità, attributi e relazioni descritte.';
      else if (workflowGoal === 'custom' && customGoal.trim()) goalDescription = customGoal.trim();
      else goalDescription = 'Genera un diagramma Draw.io professionale in Light Mode che sintetizzi in modo ottimale il documento.';
    }

    onDocumentProcessed(doc, goalDescription, formatPref);
  };

  const handleDirectCanvasLoad = () => {
    if (doc && doc.drawioXml && onDirectLoadDrawio) {
      onDirectLoadDrawio(doc.drawioXml, doc.name);
    }
  };

  const getDocIcon = (type: ExtractedDocument['type']) => {
    switch (type) {
      case 'drawio': return <Workflow className="w-8 h-8 text-indigo-600" />;
      case 'image': return <ImageIcon className="w-8 h-8 text-sky-500" />;
      case 'pdf': return <FileText className="w-8 h-8 text-rose-500" />;
      case 'docx': return <FileText className="w-8 h-8 text-blue-500" />;
      case 'pptx': return <Presentation className="w-8 h-8 text-amber-500" />;
      case 'xlsx':
      case 'csv': return <FileSpreadsheet className="w-8 h-8 text-emerald-500" />;
      default: return <FileCode className="w-8 h-8 text-indigo-500" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Importa File, Draw.io o Immagine</h2>
            <p className="text-xs text-slate-500">Supporta .drawio / XML, Immagini/Screenshot, DOCX, PPTX, PDF, Excel</p>
          </div>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {!doc ? (
        /* Drag & Drop Area */
        <div>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50/70 scale-[1.01]'
                : 'border-slate-300 hover:border-indigo-400 bg-slate-50/70 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".drawio,.xml,.drawio.xml,.png,.jpg,.jpeg,.webp,.svg,.pdf,.docx,.doc,.pptx,.ppt,.xlsx,.xls,.csv,.txt,.md"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            {isParsing ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-semibold text-slate-800">Elaborazione file in corso...</p>
                <p className="text-xs text-slate-500">Lettura metadati, XML o estrazione Markdown</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4 shadow-xs">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="text-base font-semibold text-slate-800 mb-1">
                  Trascina qui il file o <span className="text-indigo-600 underline font-bold">sfoglia</span>
                </p>
                <p className="text-xs text-slate-500 max-w-sm mb-4">
                  Puoi caricare un diagramma <strong>.drawio</strong> da modificare, uno <strong>screenshot/immagine</strong> da convertire o un <strong>documento di testo</strong>.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-[11px] font-bold text-indigo-700 shadow-2xs">
                    📐 File Draw.io (.drawio / .xml)
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-[11px] font-bold text-sky-700 shadow-2xs">
                    🖼️ Immagine / Screenshot
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs">
                    📄 Word (.docx)
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs">
                    📊 PowerPoint (.pptx)
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs">
                    📕 PDF (.pdf)
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs">
                    📈 Excel (.xlsx, .csv)
                  </span>
                </div>
              </>
            )}
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              {errorMsg}
            </div>
          )}
        </div>
      ) : (
        /* Document Processed: Step 2 Review & Config */
        <div className="space-y-6">
          {/* File Card info */}
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-3">
              {getDocIcon(doc.type)}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  {doc.name}
                  {doc.type === 'drawio' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
                      File Draw.io
                    </span>
                  )}
                  {doc.type === 'image' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700">
                      Immagine / Visual
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                  <span>{(doc.size / 1024).toFixed(1)} KB</span>
                  {doc.metadata?.pages && <span>• {doc.metadata.pages} Pagine</span>}
                  {doc.metadata?.slides && <span>• {doc.metadata.slides} Slide</span>}
                  {doc.metadata?.sheets && <span>• {doc.metadata.sheets.length} Fogli</span>}
                  {doc.metadata?.wordCount && <span>• {doc.metadata.wordCount} parole</span>}
                </div>
              </div>
            </div>

            <button
              onClick={() => setDoc(null)}
              className="text-xs text-slate-500 hover:text-rose-600 transition font-semibold"
            >
              Cambia file
            </button>
          </div>

          {/* If image uploaded, show thumbnail preview */}
          {doc.type === 'image' && doc.imageUrl && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4">
              <img 
                src={doc.imageUrl} 
                alt={doc.name} 
                className="w-24 h-20 object-contain rounded-lg border border-slate-200 bg-white shadow-xs" 
              />
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">Anteprima Immagine Acquisita</p>
                <p>L'AI analizzerà la disposizione dei blocchi, le etichette e le frecce per generare il diagramma Draw.io nativo.</p>
              </div>
            </div>
          )}

          {/* If drawio uploaded, provide direct load or modify options */}
          {doc.type === 'drawio' ? (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-indigo-600" />
                  Cosa vuoi fare con questo file Draw.io?
                </h4>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  Puoi caricarlo direttamente sul canvas interattivo per visualizzarlo ed esportarlo, oppure inserire qui sotto le modifiche che desideri applicare via AI.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Istruzioni di modifica per l'AI (opzionale):
                </label>
                <textarea
                  rows={3}
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="Es. 'Aggiungi una coda SQS tra Catalog Service e Order Service', 'Sposta il database in una subnet isolata', 'Converti il layout da verticale a orizzontale'..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {onDirectLoadDrawio && doc.drawioXml && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleDirectCanvasLoad}
                    className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Eye className="w-4 h-4 text-indigo-600" />
                    Carica direttamente sul Canvas (senza modifiche AI)
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Document / Image Config */
            <>
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <button
                  onClick={() => setActiveTab('workflow')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                    activeTab === 'workflow'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> 1. Configura Flusso & Istruzioni
                </button>
                <button
                  onClick={() => setActiveTab('markdown')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                    activeTab === 'markdown'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" /> 2. Ispeziona Contenuto Estratto
                </button>
              </div>

              {activeTab === 'workflow' ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      {doc.type === 'image' 
                        ? 'Come desideri elaborare l\'immagine in Draw.io?' 
                        : 'Quale tipo di diagramma desideri generare dal documento?'}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {[
                        { id: 'flowchart', title: 'Flowchart / Processo', desc: 'Step sequenziali, decisioni if/else, azioni' },
                        { id: 'architecture', title: 'Architettura Tecnica', desc: 'Servizi, Cloud AWS/GCP/Azure, API, DB' },
                        { id: 'swimlane', title: 'Swimlane Cross-Ruolo', desc: 'Corsie separate per ruoli o dipartimenti' },
                        { id: 'sequence', title: 'Sequenza Temporale', desc: 'Chiamate ordinate tra attori e sistemi' },
                        { id: 'erd', title: 'Modello Dati / ERD', desc: 'Tabelle, chiavi e relazioni tra entità' },
                        { id: 'custom', title: 'Personalizzato...', desc: 'Specifica tu i dettagli del workflow' },
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setWorkflowGoal(item.id)}
                          className={`p-3 rounded-xl border text-left transition ${
                            workflowGoal === item.id
                              ? 'bg-indigo-50 border-indigo-400 shadow-xs ring-1 ring-indigo-300'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                            {item.title}
                            {workflowGoal === item.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-3">
                      <input
                        type="text"
                        value={customGoal}
                        onChange={(e) => setCustomGoal(e.target.value)}
                        placeholder="Istruzioni specifiche aggiuntive (es. 'Usa layout orizzontale da sinistra a destra con icone AWS')..."
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Markdown Preview Tab */
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-80 overflow-y-auto font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {doc.markdown}
                </div>
              )}
            </>
          )}

          {/* Action Generate Button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                Annulla
              </button>
            )}
            <button
              onClick={handleGenerate}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" /> 
              {doc.type === 'drawio' ? 'Applica Modifiche con AI' : 'Genera Diagramma Draw.io'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
