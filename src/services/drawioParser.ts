import { DiagramData, DiagramType } from '../types';
import { getRichCloudIconUrl } from './cloudIconAssets';

export interface ParsedGraphNode {
  id: string;
  value: string;
  style: Record<string, string>;
  styleString: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isVertex: boolean;
  shape?: string;
  imageUrl?: string;
  fillColor?: string;
  strokeColor?: string;
  fontColor?: string;
  fontSize?: number;
  parentId?: string;
}

export interface ParsedGraphEdge {
  id: string;
  value?: string;
  source: string;
  target: string;
  style: Record<string, string>;
  styleString: string;
  strokeColor?: string;
  strokeWidth?: number;
  dashed?: boolean;
  points?: { x: number; y: number }[];
  exitX?: number;
  exitY?: number;
  entryX?: number;
  entryY?: number;
}

export interface ParsedGraph {
  nodes: ParsedGraphNode[];
  edges: ParsedGraphEdge[];
  bounds: { minX: number; minY: number; maxX: number; maxY: number; width: number; height: number };
  background?: string;
}

/**
 * Extracts XML block from AI chat text response
 */
export function extractDrawioXml(text: string): string | null {
  if (!text) return null;

  // 1. Look for ```xml ... ```
  const xmlBlockMatch = text.match(/```xml\s*([\s\S]*?)```/i);
  if (xmlBlockMatch && (xmlBlockMatch[1].includes('<mxfile') || xmlBlockMatch[1].includes('<mxGraphModel') || xmlBlockMatch[1].includes('<root>'))) {
    return wrapInMxFileIfNeeded(xmlBlockMatch[1].trim());
  }

  // 2. Look for ```drawio ... ```
  const drawioBlockMatch = text.match(/```(?:drawio)?\s*([\s\S]*?)```/i);
  if (drawioBlockMatch && (drawioBlockMatch[1].includes('<mxfile') || drawioBlockMatch[1].includes('<mxGraphModel'))) {
    return wrapInMxFileIfNeeded(drawioBlockMatch[1].trim());
  }

  // 3. Look for direct <mxfile> ... </mxfile>
  const directMxfile = text.match(/<mxfile[\s\S]*?<\/mxfile>/i);
  if (directMxfile) {
    return directMxfile[0].trim();
  }

  // 4. Look for <mxGraphModel> ... </mxGraphModel>
  const directGraphModel = text.match(/<mxGraphModel[\s\S]*?<\/mxGraphModel>/i);
  if (directGraphModel) {
    return wrapInMxFileIfNeeded(directGraphModel[0].trim());
  }

  return null;
}

function wrapInMxFileIfNeeded(xml: string): string {
  if (xml.startsWith('<mxfile')) {
    return xml;
  }
  if (xml.startsWith('<diagram')) {
    return `<mxfile host="app.diagrams.net" agent="DrawIO-AI-Studio" version="24.0.0" type="device">\n${xml}\n</mxfile>`;
  }
  if (xml.startsWith('<mxGraphModel')) {
    return `<mxfile host="app.diagrams.net" agent="DrawIO-AI-Studio" version="24.0.0" type="device">\n  <diagram id="diagram_1" name="Diagram">\n    ${xml}\n  </diagram>\n</mxfile>`;
  }
  if (xml.startsWith('<root>') || xml.startsWith('<mxCell')) {
    return `<mxfile host="app.diagrams.net" agent="DrawIO-AI-Studio" version="24.0.0" type="device">
  <diagram id="diagram_1" name="Diagram">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200" background="#ffffff">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${xml}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  }
  return xml;
}

/**
 * Parse style string (e.g. "rounded=1;fillColor=#1e293b;strokeColor=#38bdf8;")
 */
export function parseStyleString(styleStr: string): Record<string, string> {
  const styles: Record<string, string> = {};
  if (!styleStr) return styles;

  const parts = styleStr.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.includes('=')) {
      const [key, ...vals] = trimmed.split('=');
      styles[key.trim()] = vals.join('=').trim();
    } else {
      // Shape indicator like "rhombus", "swimlane", "ellipse"
      styles['shape'] = trimmed;
    }
  }
  return styles;
}

/**
 * Parses Draw.io XML into a renderable graph model
 */
export function parseMxGraphXml(xml: string): ParsedGraph {
  const nodes: ParsedGraphNode[] = [];
  const edges: ParsedGraphEdge[] = [];

  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    
    // Check background color on mxGraphModel
    const graphModel = xmlDoc.querySelector('mxGraphModel');
    const background = graphModel?.getAttribute('background') || '#ffffff';

    const cellElements = xmlDoc.querySelectorAll('mxCell');
    
    cellElements.forEach(cell => {
      const id = cell.getAttribute('id');
      if (!id || id === '0' || id === '1') return;

      const isVertex = cell.getAttribute('vertex') === '1';
      const isEdge = cell.getAttribute('edge') === '1';
      const value = cell.getAttribute('value') || '';
      const styleStr = cell.getAttribute('style') || '';
      const style = parseStyleString(styleStr);
      const parentId = cell.getAttribute('parent') || undefined;

      const geom = cell.querySelector('mxGeometry');

      if (isVertex && geom) {
        const x = parseFloat(geom.getAttribute('x') || '0');
        const y = parseFloat(geom.getAttribute('y') || '0');
        const width = parseFloat(geom.getAttribute('width') || '120');
        const height = parseFloat(geom.getAttribute('height') || '60');

        const cleanedValue = cleanHtmlLabel(value);
        const isCloudShape = styleStr.includes('shape=mxgraph.') || styleStr.includes('shape=image') || style.shape === 'image' || (Boolean(style.image) && width <= 120 && height <= 120);
        const isContainerBox = styleStr.includes('swimlane') || style.shape === 'swimlane' || (width > 160 && height > 140 && !isCloudShape);

        let shape = style.shape || 'rectangle';
        let imageUrl: string | undefined = undefined;

        if (isContainerBox) {
          shape = 'swimlane';
        } else if (isCloudShape) {
          shape = 'image';
          imageUrl = style.image || getRichCloudIconUrl(cleanedValue || id || 'AI');
        } else if (styleStr.includes('umlActor') || style.shape === 'umlActor' || styleStr.includes('actor')) {
          shape = 'actor';
        } else if (styleStr.includes('component') || style.shape === 'component') {
          shape = 'component';
        } else if (styleStr.includes('rhombus')) {
          shape = 'rhombus';
        } else if (styleStr.includes('ellipse') || style.shape === 'ellipse') {
          shape = 'ellipse';
        } else if (styleStr.includes('cylinder') || style.shape === 'cylinder3') {
          shape = 'cylinder';
        } else if (styleStr.includes('document') || style.shape === 'document') {
          shape = 'document';
        } else if (styleStr.includes('cloud') || style.shape === 'cloud') {
          shape = 'cloud';
        } else if (style.rounded === '1' || styleStr.includes('rounded=1')) {
          shape = 'rounded';
        }

        nodes.push({
          id,
          value: cleanedValue,
          style,
          styleString: styleStr,
          x,
          y,
          width,
          height,
          isVertex: true,
          shape,
          imageUrl,
          fillColor: style.fillColor || (shape === 'swimlane' ? '#f8fafc' : '#ffffff'),
          strokeColor: style.strokeColor || '#475569',
          fontColor: style.fontColor || '#0f172a',
          fontSize: parseInt(style.fontSize || '12', 10),
          parentId
        });
      } else if (isEdge) {
        const source = cell.getAttribute('source') || '';
        const target = cell.getAttribute('target') || '';

        edges.push({
          id,
          value: cleanHtmlLabel(value),
          source,
          target,
          style,
          styleString: styleStr,
          strokeColor: style.strokeColor || '#475569',
          strokeWidth: parseFloat(style.strokeWidth || '2'),
          dashed: style.dashed === '1',
          exitX: style.exitX !== undefined ? parseFloat(style.exitX) : undefined,
          exitY: style.exitY !== undefined ? parseFloat(style.exitY) : undefined,
          entryX: style.entryX !== undefined ? parseFloat(style.entryX) : undefined,
          entryY: style.entryY !== undefined ? parseFloat(style.entryY) : undefined,
        });
      }
    });
  } catch (err) {
    console.error('Failed to parse mxGraph XML:', err);
  }

  // 1. Resolve parent hierarchy to compute exact absolute world coordinates for all nested nodes
  const rawNodeMap = new Map<string, ParsedGraphNode>();
  nodes.forEach(n => rawNodeMap.set(n.id, { ...n }));

  nodes.forEach(node => {
    let absX = node.x;
    let absY = node.y;
    let parentId = node.parentId;
    let depth = 0;

    while (parentId && parentId !== '1' && parentId !== '0' && depth < 10) {
      const parent = rawNodeMap.get(parentId);
      if (parent) {
        absX += parent.x;
        absY += parent.y;
        parentId = parent.parentId;
        depth++;
      } else {
        break;
      }
    }

    node.x = absX;
    node.y = absY;
  });

  // 2. Calculate accurate diagram bounding box with all absolute coordinates
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  if (nodes.length === 0) {
    minX = 0;
    minY = 0;
    maxX = 800;
    maxY = 600;
  } else {
    nodes.forEach(node => {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x + node.width);
      maxY = Math.max(maxY, node.y + node.height);
    });
  }

  const padding = 60;
  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX += padding;
  maxY += padding;

  return {
    nodes,
    edges,
    bounds: {
      minX,
      minY,
      maxX,
      maxY,
      width: Math.max(800, maxX - minX),
      height: Math.max(500, maxY - minY)
    }
  };
}

function cleanHtmlLabel(str: string): string {
  if (!str) return '';
  return str
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<b>(.*?)<\/b>/gi, '$1')
    .replace(/<strong>(.*?)<\/strong>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * Prepares Draw.io XML for optimal responsive auto-fit viewing:
 * - Disables huge fixed page sheet (page="0") so diagrams.net auto-crops and zooms onto the content
 * - Replaces blocked raw GitHub CDN URLs with open jsDelivr CDN URLs
 */
export function prepareOptimalDrawioXml(xml: string): string {
  if (!xml) return xml;
  let optimized = xml;

  // 1. Replace raw.githubusercontent with fast open CDN
  optimized = optimized.replace(
    /https:\/\/raw\.githubusercontent\.com\/lobehub\/lobe-icons\/main\/packages\/static-svg\/icons\//g,
    'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/'
  );

  // 2. Convert page="1" to page="0" to remove huge blank A4/Letter margins and force auto-zoom to bounds
  optimized = optimized.replace(/page="1"/g, 'page="0"');
  optimized = optimized.replace(/pageWidth="\d+"/g, '');
  optimized = optimized.replace(/pageHeight="\d+"/g, '');

  return optimized;
}

/**
 * Downloads string as .drawio file
 */
export function downloadDrawioFile(xml: string, filename = 'diagram.drawio') {
  const cleanXml = prepareOptimalDrawioXml(xml);
  const blob = new Blob([cleanXml], { type: 'application/vnd.jgraph.mxfile;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.drawio') ? filename : `${filename}.drawio`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates official diagrams.net URL with embedded XML
 */
export function getDiagramsNetEmbedUrl(xml: string): string {
  const cleanXml = prepareOptimalDrawioXml(xml);
  return `https://app.diagrams.net/#R${encodeURIComponent(cleanXml)}`;
}

/**
 * Generates viewer.diagrams.net live iframe URL with auto-fit, padding and clean view (no hover overlay buttons)
 */
export function getViewerIframeUrl(xml: string, title = 'Diagram'): string {
  const cleanXml = prepareOptimalDrawioXml(xml);
  return `https://viewer.diagrams.net/?nav=0&toolbar=0&layers=0&fit=1&border=20&title=${encodeURIComponent(title)}#R${encodeURIComponent(cleanXml)}`;
}
