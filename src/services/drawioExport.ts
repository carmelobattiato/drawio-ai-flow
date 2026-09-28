import { ParsedGraph, parseMxGraphXml } from './drawioParser';
import { getRichCloudIconUrl, getRichCloudIconSvg } from './cloudIconAssets';

/**
 * Converts external SVG / image URLs inside SVG string to base64 Data URIs
 * to prevent browser canvas CORS tainting during PNG rasterization.
 */
export async function inlineSvgImages(svgText: string): Promise<string> {
  const urlRegex = /href="(https:\/\/[^"]+)"/g;
  const matches = [...svgText.matchAll(urlRegex)];
  const uniqueUrls = [...new Set(matches.map(m => m[1]))];

  let inlinedSvg = svgText;

  for (const url of uniqueUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const blob = await res.blob();
        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        inlinedSvg = inlinedSvg.replaceAll(`href="${url}"`, `href="${base64Data}"`);
      }
    } catch (e) {
      console.warn('[drawioExport] Could not inline image URL:', url, e);
    }
  }

  return inlinedSvg;
}

/**
 * High-definition SVG generator from Draw.io parsed graph for standalone export & PNG rasterization
 */
export function generateStandaloneSvg(graph: ParsedGraph, title = 'Diagram'): string {
  console.log('[drawioExport] generateStandaloneSvg started for:', title, 'nodes:', graph.nodes.length, 'edges:', graph.edges.length);
  const { minX, minY, width, height } = graph.bounds;
  const nodeMap = new Map<string, typeof graph.nodes[0]>();
  graph.nodes.forEach(n => nodeMap.set(n.id, n));

  const swimlanes = graph.nodes.filter(n => n.shape === 'swimlane');
  const regularNodes = graph.nodes.filter(n => n.shape !== 'swimlane');

  let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="${minX} ${minY} ${width} ${height}" style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.08" />
    </filter>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
      <polygon points="0 0, 7 3.5, 0 7" fill="#475569" />
    </marker>
    <marker id="arrow-indigo" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
      <polygon points="0 0, 7 3.5, 0 7" fill="#4f46e5" />
    </marker>
  </defs>

  <!-- Background Canvas -->
  <rect x="${minX}" y="${minY}" width="${width}" height="${height}" fill="#ffffff" />
`;

  // 1. Render Swimlanes / Containers first (background layer)
  swimlanes.forEach(node => {
    svgContent += `
  <g class="swimlane">
    <rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="10" ry="10" fill="${node.fillColor || '#f8fafc'}" stroke="${node.strokeColor || '#cbd5e1'}" stroke-width="1.5" stroke-dasharray="4 4" />
    <path d="M ${node.x} ${node.y + 28} L ${node.x + node.width} ${node.y + 28}" stroke="${node.strokeColor || '#cbd5e1'}" stroke-width="1" />
    <text x="${node.x + 14}" y="${node.y + 19}" fill="${node.fontColor || '#334155'}" font-size="12" font-weight="700">${escapeXml(node.value)}</text>
  </g>`;
  });

  // 2. Render Connectors with Orthogonal Stepped Routing
  graph.edges.forEach(edge => {
    const src = nodeMap.get(edge.source);
    const tgt = nodeMap.get(edge.target);
    if (!src || !tgt) return;

    // Default center points
    let x1 = src.x + src.width / 2;
    let y1 = src.y + src.height / 2;
    let x2 = tgt.x + tgt.width / 2;
    let y2 = tgt.y + tgt.height / 2;

    // Precise exit/entry anchors if specified
    if (edge.exitX !== undefined) x1 = src.x + src.width * edge.exitX;
    if (edge.exitY !== undefined) y1 = src.y + src.height * edge.exitY;
    if (edge.entryX !== undefined) x2 = tgt.x + tgt.width * edge.entryX;
    if (edge.entryY !== undefined) y2 = tgt.y + tgt.height * edge.entryY;

    const strokeColor = edge.strokeColor || '#475569';
    const strokeWidth = edge.strokeWidth || 1.5;
    const strokeDash = edge.dashed ? 'stroke-dasharray="4 4"' : '';

    // Calculate stepped orthogonal path
    let pathD = '';
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);

    if (dx < 10 || dy < 10) {
      pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
    } else if (dx >= dy) {
      const midX = (x1 + x2) / 2;
      pathD = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
    } else {
      const midY = (y1 + y2) / 2;
      pathD = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
    }

    svgContent += `
  <g class="edge">
    <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" ${strokeDash} marker-end="url(#arrow)" />`;

    if (edge.value) {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const labelW = Math.max(50, edge.value.length * 8);
      svgContent += `
    <rect x="${midX - labelW / 2}" y="${midY - 10}" width="${labelW}" height="20" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
    <text x="${midX}" y="${midY + 3.5}" text-anchor="middle" fill="#475569" font-size="11" font-weight="600">${escapeXml(edge.value)}</text>`;
    }

    svgContent += `
  </g>`;
  });

  // 3. Render Regular Nodes & Brand Icons
  regularNodes.forEach(node => {
    const fill = node.fillColor || '#ffffff';
    const stroke = node.strokeColor || '#4f46e5';
    const fontColor = node.fontColor || '#0f172a';
    const fontSize = node.fontSize || 12;

    svgContent += `
  <g class="node" filter="url(#shadow)">`;

    if (node.shape === 'image') {
      // Consistent uniform icon sizing (centered)
      const iconSize = Math.min(node.width, node.height, 56);
      const iconX = node.x + (node.width - iconSize) / 2;
      const iconY = node.y + (node.height - iconSize) / 2;

      // Direct Vector SVG embedding for 100% offline reliability (Zero Broken Images)
      const lookupKey = `${node.imageUrl || ''} ${node.value || ''} ${node.id || ''}`;
      const rawIconSvg = getRichCloudIconSvg(lookupKey);
      const cleanSvg = rawIconSvg
        .replace(/<\?xml[^>]*\?>/gi, '')
        .trim()
        .replace(/<svg\b([^>]*)>/i, `<svg x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" preserveAspectRatio="xMidYMid meet" $1>`);

      svgContent += `
        <!-- Direct High-Definition Vector Icon -->
        ${cleanSvg}
      `;
    } else if (node.shape === 'actor') {
      // Classic Draw.io / UML Actor Stickman
      const midX = node.x + node.width / 2;
      const headR = Math.min(node.width, node.height) * 0.16;
      const headY = node.y + headR + 2;
      const torsoTop = headY + headR;
      const torsoBottom = node.y + node.height * 0.65;
      const armsY = torsoTop + (torsoBottom - torsoTop) * 0.35;
      const armSpan = node.width * 0.38;
      const legSpan = node.width * 0.32;
      const legBottom = node.y + node.height - 2;

      svgContent += `
        <!-- UML Actor Stickman -->
        <circle cx="${midX}" cy="${headY}" r="${headR}" fill="${fill}" stroke="${stroke}" stroke-width="2" />
        <line x1="${midX}" y1="${torsoTop}" x2="${midX}" y2="${torsoBottom}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" />
        <line x1="${midX - armSpan}" y1="${armsY}" x2="${midX + armSpan}" y2="${armsY}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" />
        <line x1="${midX}" y1="${torsoBottom}" x2="${midX - legSpan}" y2="${legBottom}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" />
        <line x1="${midX}" y1="${torsoBottom}" x2="${midX + legSpan}" y2="${legBottom}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" />
      `;
    } else if (node.shape === 'component') {
      // Classic Draw.io / UML Component with 2 left tabs
      const tabW = 16;
      const tabH = 10;
      svgContent += `
        <rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="4" ry="4" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
        <rect x="${node.x - 6}" y="${node.y + node.height * 0.22}" width="${tabW}" height="${tabH}" rx="1.5" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
        <rect x="${node.x - 6}" y="${node.y + node.height * 0.58}" width="${tabW}" height="${tabH}" rx="1.5" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
      `;
    } else if (node.shape === 'cylinder') {
      // Classic Draw.io / UML Database Cylinder
      const capH = Math.min(node.height * 0.22, 14);
      svgContent += `
        <path d="M${node.x} ${node.y + capH} L${node.x} ${node.y + node.height - capH} A${node.width / 2} ${capH} 0 0 0 ${node.x + node.width} ${node.y + node.height - capH} L${node.x + node.width} ${node.y + capH} Z" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
        <ellipse cx="${node.x + node.width / 2}" cy="${node.y + node.height - capH}" rx="${node.width / 2}" ry="${capH}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
        <ellipse cx="${node.x + node.width / 2}" cy="${node.y + capH}" rx="${node.width / 2}" ry="${capH}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
      `;
    } else if (node.shape === 'document') {
      // Classic UML Document with folded corner
      const fold = 14;
      svgContent += `
        <path d="M${node.x} ${node.y} L${node.x + node.width - fold} ${node.y} L${node.x + node.width} ${node.y + fold} L${node.x + node.width} ${node.y + node.height} L${node.x} ${node.y + node.height} Z" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
        <polygon points="${node.x + node.width - fold},${node.y} ${node.x + node.width - fold},${node.y + fold} ${node.x + node.width},${node.y + fold}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
      `;
    } else if (node.shape === 'cloud') {
      // Classic Cloud Shape
      svgContent += `
        <path d="M${node.x + 20} ${node.y + node.height - 8} 
                 Q${node.x} ${node.y + node.height - 8} ${node.x + 6} ${node.y + node.height - 24} 
                 Q${node.x} ${node.y + 12} ${node.x + 24} ${node.y + 12} 
                 Q${node.x + node.width * 0.4} ${node.y} ${node.x + node.width * 0.65} ${node.y + 10} 
                 Q${node.x + node.width} ${node.y + 6} ${node.x + node.width - 4} ${node.y + node.height - 20} 
                 Q${node.x + node.width} ${node.y + node.height - 8} ${node.x + node.width - 20} ${node.y + node.height - 8} Z" 
              fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
      `;
    } else if (node.shape === 'rhombus') {
      const p1 = `${node.x + node.width / 2},${node.y}`;
      const p2 = `${node.x + node.width},${node.y + node.height / 2}`;
      const p3 = `${node.x + node.width / 2},${node.y + node.height}`;
      const p4 = `${node.x},${node.y + node.height / 2}`;
      svgContent += `<polygon points="${p1} ${p2} ${p3} ${p4}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />`;
    } else if (node.shape === 'ellipse' || node.shape === 'circle') {
      svgContent += `<ellipse cx="${node.x + node.width / 2}" cy="${node.y + node.height / 2}" rx="${node.width / 2}" ry="${node.height / 2}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />`;
    } else {
      // Standard rounded or rectangle
      const rx = node.shape === 'rounded' ? '10' : '6';
      svgContent += `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="${rx}" ry="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />`;
    }

    // Node text label
    const lines = (node.value || '').split('\n').filter(Boolean);
    if (lines.length > 0) {
      const lineH = fontSize + 4;
      const isBottomLabel = node.shape === 'image' || node.style.verticalLabelPosition === 'bottom';
      const startY = isBottomLabel 
        ? node.y + node.height + fontSize + 4 
        : node.y + (node.height - lines.length * lineH) / 2 + fontSize;
      
      lines.forEach((line, idx) => {
        svgContent += `<text x="${node.x + node.width / 2}" y="${startY + idx * lineH}" text-anchor="middle" fill="${fontColor}" font-size="${fontSize}" font-weight="600">${escapeXml(line)}</text>`;
      });
    }

    svgContent += `
  </g>`;
  });

  svgContent += `
</svg>`;
  console.log('[drawioExport] generateStandaloneSvg completed, size:', svgContent.length);
  return svgContent;
}

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Clean filename helper
 */
export function sanitizeFilename(title: string, ext: string): string {
  const clean = title.toLowerCase().replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'diagram';
  return `${clean}.${ext.replace(/^\./, '')}`;
}

/**
 * Download file trigger
 */
export function triggerDownload(blob: Blob, filename: string) {
  console.log('[drawioExport] triggerDownload START:', { filename, size: blob.size, type: blob.type });
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    console.log('[drawioExport] triggerDownload click() executed for:', filename);
    setTimeout(() => {
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
      URL.revokeObjectURL(url);
      console.log('[drawioExport] triggerDownload cleanup complete for:', filename);
    }, 1500);
  } catch (err) {
    console.error('[drawioExport] triggerDownload ERROR:', err);
    throw err;
  }
}

/**
 * 1. Export as native .drawio file
 */
export function exportAsDrawio(xml: string, title = 'diagram') {
  console.log('[drawioExport] exportAsDrawio called for:', title);
  const blob = new Blob([xml], { type: 'application/vnd.jgraph.mxfile;charset=utf-8' });
  triggerDownload(blob, sanitizeFilename(title, 'drawio'));
}

/**
 * 2. Export as raw .xml
 */
export function exportAsXml(xml: string, title = 'diagram') {
  console.log('[drawioExport] exportAsXml called for:', title);
  const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
  triggerDownload(blob, sanitizeFilename(title, 'xml'));
}

/**
 * 3. Export as .svg
 */
export async function exportAsSvg(xml: string, title = 'diagram') {
  console.log('[drawioExport] exportAsSvg called for:', title);
  const graph = parseMxGraphXml(xml);
  const rawSvg = generateStandaloneSvg(graph, title);
  const inlinedSvg = await inlineSvgImages(rawSvg);
  const blob = new Blob([inlinedSvg], { type: 'image/svg+xml;charset=utf-8' });
  triggerDownload(blob, sanitizeFilename(title, 'svg'));
}

/**
 * 4. Export as high-resolution PNG (Ultra-Crisp 3.0x Scale with Inlined Assets)
 */
export async function exportAsPng(xml: string, title = 'diagram', scale = 3.0): Promise<void> {
  console.log('[drawioExport] exportAsPng START for:', title, 'scale:', scale);
  const graph = parseMxGraphXml(xml);
  console.log('[drawioExport] Parsed graph bounds:', graph.bounds);
  
  const rawSvg = generateStandaloneSvg(graph, title);
  const inlinedSvg = await inlineSvgImages(rawSvg);
  console.log('[drawioExport] Inlined all external images into SVG payload');

  return new Promise((resolve, reject) => {
    try {
      const svgBlob = new Blob([inlinedSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          console.log('[drawioExport] SVG loaded into Image element, starting canvas rasterization');
          const canvas = document.createElement('canvas');
          const width = graph.bounds.width;
          const height = graph.bounds.height;

          canvas.width = Math.round(width * scale);
          canvas.height = Math.round(height * scale);

          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Impossibile inizializzare il contesto Canvas 2D');

          // Light mode pure white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          URL.revokeObjectURL(url);

          canvas.toBlob((blob) => {
            if (blob) {
              console.log('[drawioExport] Canvas toBlob success, triggering PNG download');
              triggerDownload(blob, sanitizeFilename(title, 'png'));
              resolve();
            } else {
              console.log('[drawioExport] Fallback to dataURL for PNG');
              const dataUrl = canvas.toDataURL('image/png');
              const a = document.createElement('a');
              a.href = dataUrl;
              a.download = sanitizeFilename(title, 'png');
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              resolve();
            }
          }, 'image/png');
        } catch (canvasErr) {
          console.error('[drawioExport] Canvas rasterization failed:', canvasErr);
          URL.revokeObjectURL(url);
          reject(canvasErr);
        }
      };

      img.onerror = (e) => {
        console.warn('[drawioExport] img.onerror fired, falling back to SVG:', e);
        URL.revokeObjectURL(url);
        const fallbackBlob = new Blob([inlinedSvg], { type: 'image/svg+xml;charset=utf-8' });
        triggerDownload(fallbackBlob, sanitizeFilename(title, 'svg'));
        resolve();
      };

      img.src = url;
    } catch (err) {
      console.error('[drawioExport] exportAsPng outer error:', err);
      reject(err);
    }
  });
}

/**
 * 5. Copy PNG image directly to Clipboard
 */
export async function copyPngToClipboard(xml: string, title = 'diagram'): Promise<void> {
  console.log('[drawioExport] copyPngToClipboard START for:', title);
  const graph = parseMxGraphXml(xml);
  const rawSvg = generateStandaloneSvg(graph, title);
  const inlinedSvg = await inlineSvgImages(rawSvg);

  return new Promise((resolve, reject) => {
    try {
      const svgBlob = new Blob([inlinedSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          const scale = 2.5;
          const width = graph.bounds.width;
          const height = graph.bounds.height;

          canvas.width = Math.round(width * scale);
          canvas.height = Math.round(height * scale);

          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Impossibile inizializzare il contesto Canvas');

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          URL.revokeObjectURL(url);

          canvas.toBlob(async (blob) => {
            if (blob && navigator.clipboard && navigator.clipboard.write) {
              try {
                await navigator.clipboard.write([
                  new ClipboardItem({ 'image/png': blob })
                ]);
                console.log('[drawioExport] PNG successfully copied to clipboard');
                resolve();
              } catch (clipErr) {
                console.error('[drawioExport] ClipboardItem write failed:', clipErr);
                reject(clipErr);
              }
            } else {
              reject(new Error('Clipboard API non supportata nel browser'));
            }
          }, 'image/png');
        } catch (err) {
          URL.revokeObjectURL(url);
          reject(err);
        }
      };

      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };

      img.src = url;
    } catch (err) {
      reject(err);
    }
  });
}
