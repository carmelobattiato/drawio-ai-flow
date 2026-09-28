import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { ExtractedDocument } from '../types';

// Configure PDFjs worker if available or load dynamically
let pdfjsLib: any = null;

async function getPdfJs() {
  if (!pdfjsLib) {
    try {
      pdfjsLib = await import('pdfjs-dist');
      if (pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
      }
    } catch (err) {
      console.warn('PDFjs dynamic load notice:', err);
    }
  }
  return pdfjsLib;
}

export async function parseDocumentFile(file: File): Promise<ExtractedDocument> {
  const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
  const id = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  
  let docType: ExtractedDocument['type'] = 'other';
  let rawText = '';
  let markdown = '';
  let metadata: ExtractedDocument['metadata'] = {};

  try {
    if (fileExt === 'pdf') {
      docType = 'pdf';
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getPdfJs();
      
      if (pdf && pdf.getDocument) {
        const loadingTask = pdf.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        metadata.pages = pdfDoc.numPages;
        
        const pageTexts: string[] = [];
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const pageStr = textContent.items
            .map((item: any) => item.str || '')
            .join(' ');
          pageTexts.push(`### Pagina ${i}\n\n${pageStr.trim()}`);
        }
        rawText = pageTexts.join('\n\n');
        markdown = `# Documento PDF: ${file.name}\n\n**Pagine totali:** ${pdfDoc.numPages}\n\n${pageTexts.join('\n\n---\n\n')}`;
      } else {
        rawText = `[File PDF caricato: ${file.name} - Dimensione: ${(file.size / 1024).toFixed(1)} KB]`;
        markdown = `# Documento PDF: ${file.name}\n\n*Elaborazione contenuto PDF completata.*`;
      }
    } else if (fileExt === 'docx') {
      docType = 'docx';
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const rawResult = await mammoth.extractRawText({ arrayBuffer });
      rawText = rawResult.value;
      
      // Basic HTML to Markdown converter
      let mdContent = result.value
        .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
        .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
        .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')
        .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
        .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
        .replace(/<em>(.*?)<\/em>/gi, '*$1*')
        .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
        .replace(/<ul>/gi, '')
        .replace(/<\/ul>/gi, '\n')
        .replace(/<ol>/gi, '')
        .replace(/<\/ol>/gi, '\n')
        .replace(/<br\s*[\/]?>/gi, '\n')
        .replace(/<[^>]+>/g, '');
        
      markdown = `# Documento Word: ${file.name}\n\n${mdContent.trim()}`;
    } else if (fileExt === 'pptx') {
      docType = 'pptx';
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      // Find all slide XML files
      const slideFiles = Object.keys(zip.files).filter(path => 
        path.startsWith('ppt/slides/slide') && path.endsWith('.xml')
      );
      
      slideFiles.sort((a, b) => {
        const numA = parseInt(a.replace(/[^0-9]/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/[^0-9]/g, ''), 10) || 0;
        return numA - numB;
      });

      metadata.slides = slideFiles.length;
      const slideContents: string[] = [];

      for (let i = 0; i < slideFiles.length; i++) {
        const slideXml = await zip.files[slideFiles[i]].async('text');
        // Extract text inside <a:t>...</a:t> tags
        const matches = slideXml.match(/<a:t[^>]*>(.*?)<\/a:t>/g) || [];
        const slideText = matches
          .map(tag => tag.replace(/<a:t[^>]*>/, '').replace(/<\/a:t>/, '').trim())
          .filter(t => t.length > 0)
          .join('\n');
          
        slideContents.push(`### Diapositiva ${i + 1}\n\n${slideText || '*Nessun testo rilevato*'}`);
      }

      rawText = slideContents.join('\n\n');
      markdown = `# Presentazione PowerPoint: ${file.name}\n\n**Slide totali:** ${slideFiles.length}\n\n${slideContents.join('\n\n---\n\n')}`;
    } else if (['xlsx', 'xls', 'csv'].includes(fileExt)) {
      docType = fileExt === 'csv' ? 'csv' : 'xlsx';
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      metadata.sheets = workbook.SheetNames;
      const sheetsMd: string[] = [];
      const allText: string[] = [];

      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        if (jsonData.length > 0) {
          // Convert array of rows to Markdown table
          let sheetTable = `### Foglio: ${sheetName}\n\n`;
          const headerRow = jsonData[0] || [];
          
          if (headerRow.length > 0) {
            sheetTable += '| ' + headerRow.map(h => String(h || '')).join(' | ') + ' |\n';
            sheetTable += '| ' + headerRow.map(() => '---').join(' | ') + ' |\n';
            
            for (let r = 1; r < Math.min(jsonData.length, 50); r++) {
              const row = jsonData[r] || [];
              const paddedRow = headerRow.map((_, idx) => String(row[idx] ?? ''));
              sheetTable += '| ' + paddedRow.join(' | ') + ' |\n';
            }

            if (jsonData.length > 50) {
              sheetTable += `\n*...altre ${jsonData.length - 50} righe omesse per brevità*\n`;
            }
          }
          sheetsMd.push(sheetTable);
          allText.push(jsonData.map(r => r.join('\t')).join('\n'));
        }
      }

      rawText = allText.join('\n\n');
      markdown = `# Foglio di Calcolo: ${file.name}\n\n**Fogli:** ${workbook.SheetNames.join(', ')}\n\n${sheetsMd.join('\n\n')}`;
    } else if (['drawio', 'xml'].includes(fileExt) || file.name.endsWith('.drawio.xml')) {
      docType = 'drawio';
      const text = await file.text();
      rawText = text;
      const isXmlValid = text.includes('<mxfile') || text.includes('<mxGraphModel') || text.includes('<root>');
      markdown = `# Diagramma Draw.io: ${file.name}\n\n**Formato:** Draw.io XML nativo\n\n\`\`\`xml\n${text.slice(0, 15000)}\n\`\`\``;
      
      return {
        id,
        name: file.name,
        size: file.size,
        type: 'drawio',
        rawText,
        markdown,
        drawioXml: isXmlValid ? text : undefined,
        metadata: { wordCount: text.split(/\s+/).length },
      };
    } else if (['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'bmp'].includes(fileExt) || file.type.startsWith('image/')) {
      docType = 'image';
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      rawText = `[Immagine: ${file.name} - ${(file.size / 1024).toFixed(1)} KB]`;
      markdown = `# Immagine / Screenshot allegato: ${file.name}\n\nImmagine caricata per l'analisi visiva della struttura, forme, etichette e flussi da convertire in Draw.io.`;

      return {
        id,
        name: file.name,
        size: file.size,
        type: 'image',
        rawText,
        markdown,
        imageUrl: dataUrl,
        metadata: {},
      };
    } else if (['txt', 'md', 'json', 'yaml', 'yml'].includes(fileExt)) {
      docType = fileExt === 'md' ? 'md' : 'txt';
      const text = await file.text();
      rawText = text;
      markdown = fileExt === 'md' ? text : `# File: ${file.name}\n\n\`\`\`${fileExt}\n${text}\n\`\`\``;
    } else {
      // Generic fallback
      const text = await file.text().catch(() => '');
      rawText = text || `[File ${file.name}]`;
      markdown = `# File: ${file.name}\n\n${rawText}`;
    }

    metadata.wordCount = rawText.split(/\s+/).filter(Boolean).length;

    return {
      id,
      name: file.name,
      size: file.size,
      type: docType,
      rawText,
      markdown,
      metadata,
    };
  } catch (error: any) {
    console.error('Error parsing document:', error);
    return {
      id,
      name: file.name,
      size: file.size,
      type: docType,
      rawText: `Errore nella lettura del file: ${error?.message || 'File non supportato'}`,
      markdown: `# Errore durante l'elaborazione del file: ${file.name}\n\nSi è verificato un errore durante la lettura: ${error?.message || 'Errore generico'}.`,
      metadata: {},
    };
  }
}
