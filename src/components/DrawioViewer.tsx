import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Download, 
  ExternalLink, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Code, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  FileCode, 
  ChevronDown, 
  Layers, 
  Sparkles, 
  RefreshCw, 
  Loader2, 
  X, 
  Move,
  Hand
} from 'lucide-react';
import { getDiagramsNetEmbedUrl, prepareOptimalDrawioXml, parseMxGraphXml } from '../services/drawioParser';
import { 
  exportAsDrawio, 
  exportAsPng, 
  exportAsSvg, 
  exportAsXml, 
  copyPngToClipboard,
  generateStandaloneSvg 
} from '../services/drawioExport';

interface DrawioViewerProps {
  xml: string;
  title?: string;
  onEditXml?: () => void;
  onQuickModify?: (instruction: string) => void;
  className?: string;
}

export const DrawioViewer: React.FC<DrawioViewerProps> = ({
  xml,
  title = 'Diagramma Draw.io',
  onEditXml,
  onQuickModify,
  className = '',
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isCopyingImage, setIsCopyingImage] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Zoom range from 10% (0.1) to 600% (6.0)
  // Baseline 100% is natural scale (1.0)
  const BASE_MULTIPLIER = 1.0;
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  
  // Interactive Pan state
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Generate crisp vector SVG markup directly in DOM for 100% centering and flawless 60fps pan & zoom
  const svgMarkup = useMemo(() => {
    try {
      const cleanXml = prepareOptimalDrawioXml(xml);
      const graph = parseMxGraphXml(cleanXml);
      return generateStandaloneSvg(graph, title);
    } catch (err) {
      console.error('[DrawioViewer] SVG generation failed:', err);
      return '';
    }
  }, [xml, title]);

  // Reset pan & zoom on XML change
  useEffect(() => {
    console.log('[DrawioViewer] Diagram updated:', title, 'Length:', xml.length);
    setZoomPercent(100);
    setPan({ x: 0, y: 0 });
  }, [xml, title]);

  // Re-center whenever fullscreen is toggled
  const handleToggleFullscreen = () => {
    setIsFullscreen(prev => {
      const next = !prev;
      console.log('[DrawioViewer] Fullscreen toggle:', next);
      setPan({ x: 0, y: 0 });
      return next;
    });
  };

  // Copy PNG image to clipboard
  const handleCopyPng = async () => {
    console.log('[DrawioViewer] Copy PNG Image to clipboard clicked');
    setIsCopyingImage(true);
    const cleanXml = prepareOptimalDrawioXml(xml);

    try {
      await copyPngToClipboard(cleanXml, title);
      setCopied(true);
      setExportMessage('Immagine PNG copiata negli appunti!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('[DrawioViewer] copyPngToClipboard failed, fallback to raw copy:', err);
      try {
        await navigator.clipboard.writeText(cleanXml);
        setCopied(true);
        setExportMessage('XML copiato negli appunti');
        setTimeout(() => setCopied(false), 2500);
      } catch (clipErr) {
        console.error('[DrawioViewer] Clipboard write failed:', clipErr);
      }
    } finally {
      setIsCopyingImage(false);
      setTimeout(() => setExportMessage(null), 3500);
    }
  };

  // Zoom controls (10% to 600%)
  const handleZoomIn = () => {
    setZoomPercent(prev => {
      const next = Math.min(600, prev + 25);
      console.log('[DrawioViewer] ZoomIn ->', next, '%');
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomPercent(prev => {
      const next = Math.max(10, prev - 25);
      console.log('[DrawioViewer] ZoomOut ->', next, '%');
      return next;
    });
  };

  const handleResetZoom = () => {
    console.log('[DrawioViewer] Reset zoom & center');
    setZoomPercent(100);
    setPan({ x: 0, y: 0 });
  };

  // High-performance Pointer Capture Pan Dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button === 0 || e.button === 1) {
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isPanning) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      setIsPanning(false);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 15 : -15;
      setZoomPercent(prev => Math.min(600, Math.max(10, prev + delta)));
    }
  };

  // Export handler
  const handleExport = async (type: 'drawio' | 'png' | 'svg' | 'xml') => {
    console.log(`[DrawioViewer] handleExport START -> Type: "${type}", Title: "${title}"`);
    setIsExportModalOpen(false);
    setIsExporting(true);
    const cleanXml = prepareOptimalDrawioXml(xml);
    console.log(`[DrawioViewer] Clean XML prepared, length: ${cleanXml.length} chars`);

    try {
      if (type === 'drawio') {
        console.log('[DrawioViewer] Calling exportAsDrawio...');
        exportAsDrawio(cleanXml, title);
        setExportMessage('File .drawio scaricato con successo!');
      } else if (type === 'png') {
        console.log('[DrawioViewer] Calling exportAsPng (3.0x Ultra-HD)...');
        setExportMessage('Generazione immagine PNG HD in corso...');
        await exportAsPng(cleanXml, title, 3.0);
        setExportMessage('Immagine PNG HD scaricata!');
      } else if (type === 'svg') {
        console.log('[DrawioViewer] Calling exportAsSvg...');
        await exportAsSvg(cleanXml, title);
        setExportMessage('File vettoriale SVG scaricato!');
      } else if (type === 'xml') {
        console.log('[DrawioViewer] Calling exportAsXml...');
        exportAsXml(cleanXml, title);
        setExportMessage('File sorgente XML scaricato!');
      }
      console.log(`[DrawioViewer] handleExport SUCCESS for type: "${type}"`);
    } catch (err: any) {
      console.error(`[DrawioViewer] handleExport ERROR for type: "${type}":`, err);
      exportAsDrawio(cleanXml, title);
      setExportMessage('Scaricato file .drawio di fallback');
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportMessage(null), 4000);
    }
  };

  // Effective scale calculation: 100% * 2.5 base = 2.5x visual magnification
  const effectiveScale = (zoomPercent / 100) * BASE_MULTIPLIER;

  return (
    <div 
      className={`flex flex-col bg-white border border-slate-200/90 overflow-hidden shadow-lg transition-all ${
        isFullscreen 
          ? 'fixed inset-0 z-50 w-screen h-screen rounded-none shadow-2xl' 
          : 'rounded-2xl ' + className
      }`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-50/95 backdrop-blur border-b border-slate-200 gap-2 shrink-0 z-20">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
            <Layers className="w-4 h-4" />
          </div>
          <div className="truncate">
            <h3 className="text-sm font-bold text-slate-900 truncate">{title}</h3>
            <p className="text-[11px] text-slate-500 font-medium">Draw.io HD Canvas • Centrato • Zoom 10%-600% • Pan Libero</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Zoom controls (10% to 600%) */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs text-slate-700 shadow-2xs">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomPercent <= 10}
              className="p-1.5 hover:text-indigo-600 hover:bg-slate-100 rounded transition disabled:opacity-40 cursor-pointer"
              title="Zoom Indietro (-25%)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] select-none text-slate-800 font-bold min-w-[46px] text-center">
              {zoomPercent}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomPercent >= 600}
              className="p-1.5 hover:text-indigo-600 hover:bg-slate-100 rounded transition disabled:opacity-40 cursor-pointer"
              title="Zoom Avanti (+25%)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 hover:text-indigo-600 hover:bg-slate-100 rounded transition border-l border-slate-200 cursor-pointer"
              title="Ripristina Zoom (100% Ingrandito) e Centra"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pan Hint */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px] text-slate-600 font-semibold select-none">
            <Hand className="w-3 h-3 text-indigo-600" /> Trascina per spostare la vista
          </div>

          {/* Code Edit XML */}
          {onEditXml && (
            <button
              type="button"
              onClick={() => {
                console.log('[DrawioViewer] Modifica XML clicked');
                onEditXml();
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Modifica il codice XML sorgente di Draw.io"
            >
              <Code className="w-3.5 h-3.5 text-indigo-600" />
              <span>Modifica XML</span>
            </button>
          )}

          {/* Copy PNG Image Button */}
          <button
            type="button"
            onClick={handleCopyPng}
            disabled={isCopyingImage}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-50"
            title="Copia l'immagine PNG del diagramma negli appunti"
          >
            {isCopyingImage ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
            ) : copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? 'Copiato!' : 'Copia PNG'}</span>
          </button>

          {/* Unified Export Button */}
          <button
            type="button"
            onClick={() => {
              console.log('[DrawioViewer] Esporta button clicked - opening export dialog');
              setIsExportModalOpen(true);
            }}
            disabled={isExporting}
            className="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
            title="Esporta in .drawio, PNG HD, SVG o XML"
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Esporta</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className={`p-2 rounded-lg transition shadow-2xs cursor-pointer ${
              isFullscreen 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-100 border border-slate-200'
            }`}
            title={isFullscreen ? 'Riduci visualizzazione' : 'Ingrandisci a schermo intero'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Open directly in app.diagrams.net */}
          <a
            href={getDiagramsNetEmbedUrl(xml)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => console.log('[DrawioViewer] Opening in app.diagrams.net')}
            className="p-2 text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition shadow-2xs"
            title="Apri direttamente in app.diagrams.net nel browser"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Notification banner */}
      {exportMessage && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in fade-in shrink-0 z-20">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* Main Diagram Viewport (Always Centered in Screen & Fullscreen, 100% Pan & Zoom Responsive) */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className={`relative flex-1 bg-slate-100/70 overflow-hidden select-none flex items-center justify-center cursor-grab active:cursor-grabbing touch-none ${
          isFullscreen ? 'w-full h-full' : 'min-h-[540px] h-[600px]'
        }`}
        style={{
          backgroundImage: 'radial-gradient(rgba(100, 116, 139, 0.2) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Scaling and Panning Inner Wrapper (Hardware accelerated 3D Transform) */}
        <div 
          className="flex items-center justify-center pointer-events-none p-8"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${effectiveScale})`,
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.12s ease-out',
            willChange: 'transform',
          }}
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      </div>

      {/* Export Selection Modal Dialog */}
      {isExportModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in"
          onClick={() => {
            console.log('[DrawioViewer] Export modal closed via backdrop click');
            setIsExportModalOpen(false);
          }}
        >
          <div 
            className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Esporta Diagramma Draw.io</h3>
                  <p className="text-xs text-slate-500">Seleziona il formato desiderato per il download</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Export Format Options */}
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {/* .drawio */}
              <button
                type="button"
                onClick={() => handleExport('drawio')}
                className="w-full p-3 bg-white hover:bg-indigo-50/80 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition flex items-center gap-3.5 group cursor-pointer shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition shadow-xs">
                  <Download className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">Diagramma Draw.io (.drawio)</div>
                  <div className="text-[11px] text-slate-500">Formato nativo editabile al 100% in app.diagrams.net</div>
                </div>
              </button>

              {/* PNG HD */}
              <button
                type="button"
                onClick={() => handleExport('png')}
                className="w-full p-3 bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition flex items-center gap-3.5 group cursor-pointer shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition shadow-xs">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Immagine PNG HD (.png)</div>
                  <div className="text-[11px] text-slate-500">Alta risoluzione 3.0x Ultra-HD con sfondo bianco puro</div>
                </div>
              </button>

              {/* SVG */}
              <button
                type="button"
                onClick={() => handleExport('svg')}
                className="w-full p-3 bg-white hover:bg-sky-50/80 border border-slate-200 hover:border-sky-300 rounded-xl text-left transition flex items-center gap-3.5 group cursor-pointer shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition shadow-xs">
                  <FileCode className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700">Grafica Vettoriale SVG (.svg)</div>
                  <div className="text-[11px] text-slate-500">Vettoriale scalabile per presentazioni e documenti</div>
                </div>
              </button>

              {/* XML */}
              <button
                type="button"
                onClick={() => handleExport('xml')}
                className="w-full p-3 bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 rounded-xl text-left transition flex items-center gap-3.5 group cursor-pointer shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition shadow-xs">
                  <Code className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">Codice Sorgente XML (.xml)</div>
                  <div className="text-[11px] text-slate-500">Modello mxGraphModel per integrazione software</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
