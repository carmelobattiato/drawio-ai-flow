/**
 * Applies a compact XmlPatchOp[] (update/add/delete on individual mxCell nodes)
 * onto an existing draw.io XML document, without resending/regenerating the full XML.
 * All-or-nothing: any invalid operation (unknown id, malformed fragment, dangling
 * edge reference) aborts the whole patch and returns null, so the caller can fall
 * back to a full regeneration instead of applying a partially-broken diagram.
 */
import { XmlPatchOp } from '../types';

function escapeId(id: string): string {
  return typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(id) : id.replace(/([^\w-])/g, '\\$1');
}

const SIBLING_MARGIN = 20;

interface Box { x: number; y: number; width: number; height: number }

function readGeometry(cell: Element): Box | null {
  const geom = cell.querySelector('mxGeometry');
  if (!geom) return null;
  const x = parseFloat(geom.getAttribute('x') || '0');
  const y = parseFloat(geom.getAttribute('y') || '0');
  const width = parseFloat(geom.getAttribute('width') || '0');
  const height = parseFloat(geom.getAttribute('height') || '0');
  if ([x, y, width, height].some(n => Number.isNaN(n))) return null;
  return { x, y, width, height };
}

function boxesOverlap(a: Box, b: Box, margin: number): boolean {
  return (
    a.x < b.x + b.width + margin &&
    a.x + a.width + margin > b.x &&
    a.y < b.y + b.height + margin &&
    a.y + a.height + margin > b.y
  );
}

/**
 * When a newly-added vertex overlaps a sibling already in the same container,
 * the model's guessed x/y is discarded in favor of a deterministic slot right
 * next to the rightmost sibling, growing the parent container if needed.
 * This is a backstop: the prompt already asks the model to check free space
 * itself, but LLMs regularly get this wrong when a container is already full.
 */
function resolveOverlapWithSiblings(doc: Document, imported: Element): void {
  if (imported.getAttribute('vertex') !== '1') return;
  const parentId = imported.getAttribute('parent');
  if (!parentId) return;

  const newGeom = imported.querySelector('mxGeometry');
  const proposedBox = newGeom ? readGeometry(imported) : null;
  if (!newGeom || !proposedBox) return;

  const siblings = Array.from(doc.querySelectorAll(`mxCell[vertex="1"][parent="${escapeId(parentId)}"]`))
    .filter(sibling => sibling !== imported)
    .map(readGeometry)
    .filter((box): box is Box => box !== null);

  if (siblings.length === 0 || !siblings.some(s => boxesOverlap(proposedBox, s, SIBLING_MARGIN))) return;

  const rightmost = siblings.reduce((a, b) => (a.x + a.width > b.x + b.width ? a : b));
  const newX = rightmost.x + rightmost.width + SIBLING_MARGIN;
  const newY = rightmost.y;
  newGeom.setAttribute('x', String(newX));
  newGeom.setAttribute('y', String(newY));

  const parentCell = doc.querySelector(`mxCell[id="${escapeId(parentId)}"]`);
  const parentGeom = parentCell?.querySelector('mxGeometry');
  if (parentGeom) {
    const parentWidth = parseFloat(parentGeom.getAttribute('width') || '0');
    const neededWidth = newX + proposedBox.width + SIBLING_MARGIN;
    if (!Number.isNaN(parentWidth) && neededWidth > parentWidth) {
      parentGeom.setAttribute('width', String(Math.ceil(neededWidth)));
    }
  }
}

export function applyXmlPatch(baseXml: string, ops: XmlPatchOp[]): string | null {
  if (!baseXml || !ops || ops.length === 0 || typeof window === 'undefined') return null;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(baseXml, 'text/xml');
    if (doc.getElementsByTagName('parsererror').length > 0) return null;

    const root = doc.querySelector('root');
    if (!root) return null;

    for (const op of ops) {
      if (op.op === 'update') {
        const cell = doc.querySelector(`mxCell[id="${escapeId(op.id)}"]`);
        if (!cell) return null;

        if (op.value !== undefined) cell.setAttribute('value', op.value);
        if (op.style !== undefined) cell.setAttribute('style', op.style);
        if (op.geometry) {
          let geom = cell.querySelector('mxGeometry');
          if (!geom) {
            if (cell.getAttribute('vertex') !== '1') return null;
            geom = doc.createElement('mxGeometry');
            geom.setAttribute('as', 'geometry');
            cell.appendChild(geom);
          }
          const { x, y, width, height } = op.geometry;
          if (x !== undefined) geom.setAttribute('x', String(x));
          if (y !== undefined) geom.setAttribute('y', String(y));
          if (width !== undefined) geom.setAttribute('width', String(width));
          if (height !== undefined) geom.setAttribute('height', String(height));
        }
      } else if (op.op === 'delete') {
        const cell = doc.querySelector(`mxCell[id="${escapeId(op.id)}"]`);
        if (!cell || !cell.parentNode) return null;
        cell.parentNode.removeChild(cell);
      } else if (op.op === 'add') {
        const fragmentDoc = parser.parseFromString(`<root>${op.xml}</root>`, 'text/xml');
        if (fragmentDoc.getElementsByTagName('parsererror').length > 0) return null;

        const newCellEl = fragmentDoc.querySelector('root > mxCell');
        if (!newCellEl) return null;

        const newId = newCellEl.getAttribute('id');
        if (!newId || doc.querySelector(`mxCell[id="${escapeId(newId)}"]`)) return null;

        if (newCellEl.getAttribute('edge') === '1') {
          if (!newCellEl.getAttribute('source') || !newCellEl.getAttribute('target')) return null;
        }

        const imported = doc.importNode(newCellEl, true);
        root.appendChild(imported);
        resolveOverlapWithSiblings(doc, imported);
      } else {
        return null;
      }
    }

    // Final referential-integrity pass: every edge must point to ids that exist
    // after ALL ops were applied (covers an added edge referencing an added node
    // listed earlier/later in the same patch).
    const allIds = new Set(Array.from(doc.querySelectorAll('mxCell')).map(c => c.getAttribute('id')));
    const edges = doc.querySelectorAll('mxCell[edge="1"]');
    for (const edge of Array.from(edges)) {
      const source = edge.getAttribute('source');
      const target = edge.getAttribute('target');
      if (!source || !target || !allIds.has(source) || !allIds.has(target)) return null;
    }

    return new XMLSerializer().serializeToString(doc);
  } catch {
    return null;
  }
}
