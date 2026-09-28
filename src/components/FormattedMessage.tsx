import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface FormattedMessageProps {
  content: string;
  isUser?: boolean;
}

/**
 * Parses markdown inline styles like **bold**, *italic*, `code`, and [links](url)
 */
function renderInlineMarkdown(text: string, isUser?: boolean): React.ReactNode[] {
  // Regex to match inline tokens:
  // 1. `code`
  // 2. ***bold italic***
  // 3. **bold**
  // 4. *italic*
  // 5. [text](url)
  const regex = /(`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={index}
          className={`px-1.5 py-0.5 rounded font-mono text-[11px] sm:text-xs font-semibold ${
            isUser
              ? 'bg-indigo-800 text-indigo-100 border border-indigo-500/40'
              : 'bg-slate-100 text-indigo-700 border border-slate-200'
          }`}
        >
          {codeContent}
        </code>
      );
    }

    // Bold + Italic: ***text***
    if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
      return (
        <strong key={index} className="font-extrabold italic">
          {part.slice(3, -3)}
        </strong>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={index} className={`font-bold ${isUser ? 'text-white' : 'text-slate-950'}`}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={index} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline font-semibold hover:opacity-80 transition ${
            isUser ? 'text-white' : 'text-indigo-600'
          }`}
        >
          {label}
        </a>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2.5 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-slate-100 shadow-xs">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 text-[11px] text-slate-400 border-b border-slate-800">
        <span className="font-mono uppercase font-semibold text-[10px] text-indigo-400">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition px-1.5 py-0.5 rounded hover:bg-slate-800 cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copiato' : 'Copia'}</span>
        </button>
      </div>
      <pre className="p-3 text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({ content, isUser = false }) => {
  if (!content) return null;

  // Split into lines or code blocks
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check code fence start/end
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        renderedElements.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeBuffer.join('\n')}
            language={codeLanguage}
          />
        );
        inCodeBlock = false;
        codeBuffer = [];
        codeLanguage = '';
      } else {
        // Start code block
        inCodeBlock = true;
        codeLanguage = line.trim().slice(3).trim();
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Empty line / paragraph break
    if (line.trim() === '') {
      renderedElements.push(<div key={`space-${i}`} className="h-2" />);
      continue;
    }

    // Heading 3: ### Heading
    if (line.startsWith('### ')) {
      renderedElements.push(
        <h4
          key={`h3-${i}`}
          className={`font-bold text-sm sm:text-base mt-2.5 mb-1 ${
            isUser ? 'text-white' : 'text-slate-900'
          }`}
        >
          {renderInlineMarkdown(line.replace(/^###\s+/, ''), isUser)}
        </h4>
      );
      continue;
    }

    // Heading 2: ## Heading
    if (line.startsWith('## ')) {
      renderedElements.push(
        <h3
          key={`h2-${i}`}
          className={`font-extrabold text-base mt-3 mb-1.5 ${
            isUser ? 'text-white' : 'text-indigo-950'
          }`}
        >
          {renderInlineMarkdown(line.replace(/^##\s+/, ''), isUser)}
        </h3>
      );
      continue;
    }

    // Heading 1: # Heading
    if (line.startsWith('# ')) {
      renderedElements.push(
        <h2
          key={`h1-${i}`}
          className={`font-extrabold text-base sm:text-lg mt-3 mb-1.5 ${
            isUser ? 'text-white' : 'text-indigo-900'
          }`}
        >
          {renderInlineMarkdown(line.replace(/^#\s+/, ''), isUser)}
        </h2>
      );
      continue;
    }

    // Numbered list item: 1. Item or 2. Item
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      const [, num, itemText] = numberedMatch;
      renderedElements.push(
        <div key={`num-${i}`} className="flex items-start gap-2 my-1 pl-1">
          <span
            className={`font-bold shrink-0 font-mono text-xs ${
              isUser ? 'text-indigo-200' : 'text-indigo-600'
            }`}
          >
            {num}.
          </span>
          <div className="flex-1 leading-relaxed">
            {renderInlineMarkdown(itemText, isUser)}
          </div>
        </div>
      );
      continue;
    }

    // Bullet list item: - Item or * Item
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      const [, itemText] = bulletMatch;
      renderedElements.push(
        <div key={`bullet-${i}`} className="flex items-start gap-2 my-1 pl-1.5">
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
              isUser ? 'bg-indigo-200' : 'bg-indigo-600'
            }`}
          />
          <div className="flex-1 leading-relaxed">
            {renderInlineMarkdown(itemText, isUser)}
          </div>
        </div>
      );
      continue;
    }

    // Blockquote: > Quote
    if (line.startsWith('> ')) {
      renderedElements.push(
        <blockquote
          key={`quote-${i}`}
          className={`my-1.5 pl-3 border-l-2 py-0.5 italic text-xs ${
            isUser
              ? 'border-indigo-300 text-indigo-100'
              : 'border-indigo-400 bg-indigo-50/50 rounded-r-md text-slate-700'
          }`}
        >
          {renderInlineMarkdown(line.replace(/^>\s+/, ''), isUser)}
        </blockquote>
      );
      continue;
    }

    // Standard paragraph line
    renderedElements.push(
      <div key={`line-${i}`} className="leading-relaxed">
        {renderInlineMarkdown(line, isUser)}
      </div>
    );
  }

  // If unclosed code block at the end
  if (inCodeBlock && codeBuffer.length > 0) {
    renderedElements.push(
      <CodeBlock
        key="code-unclosed"
        code={codeBuffer.join('\n')}
        language={codeLanguage}
      />
    );
  }

  return <div className="space-y-0.5 font-sans break-words">{renderedElements}</div>;
};
