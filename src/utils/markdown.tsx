import React from 'react';
import katex from 'katex';

export const InlineMath = ({ math }: { math: string }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode: false,
      throwOnError: false,
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} className="math-inline" />;
  } catch (error) {
    return <span className="text-red-500 font-mono text-xs">{math}</span>;
  }
};

export const BlockMath = ({ math }: { math: string }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode: true,
      throwOnError: false,
    });
    return <div dangerouslySetInnerHTML={{ __html: html }} className="math-block my-4 overflow-x-auto text-center" />;
  } catch (error) {
    return <div className="text-red-500 font-mono text-xs my-2 text-center">{math}</div>;
  }
};

// A simple but highly custom markdown parser that returns styled JSX nodes.
// Specifically handles:
// - Headers: ### title, ## title
// - Bullets: * bullet, - bullet
// - Alerts: > [!NOTE], > [!IMPORTANT], > [!TIP]
// - Math Block: $$ ... $$
// - Math Inline: $ ... $
// - Bold: **text**
export const renderMarkdown = (markdown: string): React.ReactNode[] => {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentAlert: { type: string; content: string[] } | null = null;
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushAlert = (key: string) => {
    if (currentAlert) {
      const type = currentAlert.type;
      const text = currentAlert.content.join(' ');
      
      let bgClass = 'bg-slate-100 dark:bg-slate-900 border-slate-350 dark:border-slate-800';
      let titleColor = 'text-slate-700 dark:text-slate-300';
      let label = 'Lưu ý';

      if (type === 'NOTE') {
        bgClass = 'bg-blue-50/70 dark:bg-blue-950/25 border-blue-200 dark:border-blue-800/40';
        titleColor = 'text-blue-700 dark:text-blue-400';
        label = 'Thông Tin Thêm';
      } else if (type === 'IMPORTANT') {
        bgClass = 'bg-emerald-50/70 dark:bg-emerald-950/25 border-emerald-200 dark:border-emerald-800/40';
        titleColor = 'text-emerald-700 dark:text-emerald-400';
        label = 'Định Luật / Công Thức Khóa';
      } else if (type === 'TIP') {
        bgClass = 'bg-amber-50/70 dark:bg-amber-950/25 border-amber-200 dark:border-amber-800/40';
        titleColor = 'text-amber-700 dark:text-amber-400';
        label = 'Mẹo Học Tập';
      } else if (type === 'WARNING' || type === 'CAUTION') {
        bgClass = 'bg-rose-50/70 dark:bg-rose-950/25 border-rose-200 dark:border-rose-800/40';
        titleColor = 'text-rose-700 dark:text-rose-400';
        label = 'Cảnh Báo';
      }

      elements.push(
        <div key={key} className={`p-4 my-4 rounded-2xl border-l-4 ${bgClass} leading-relaxed`}>
          <div className={`text-[10px] font-extrabold uppercase tracking-widest ${titleColor} mb-1`}>
            {label}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-355 font-medium">{parseInlineMath(text)}</p>
        </div>
      );
      currentAlert = null;
    }
  };

  const flushList = (key: string) => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={key} className="space-y-1.5 my-3 pl-5 list-disc text-xs text-slate-600 dark:text-slate-300">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const key = `md-${i}`;

    // Handle Alert continuation
    if (currentAlert && line.startsWith('>')) {
      const content = line.substring(1).trim();
      if (!content.startsWith('[!')) {
        currentAlert.content.push(content);
      }
      continue;
    } else if (currentAlert && !line.startsWith('>')) {
      flushAlert(key + '-alert-end');
    }

    // Handle List continuation
    if (inList && !(line.startsWith('*') || line.startsWith('-'))) {
      flushList(key + '-list-end');
    }

    // Empty lines
    if (!line) {
      continue;
    }

    // Headers
    if (line.startsWith('###')) {
      elements.push(
        <h3 key={key} className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 mt-6 mb-2">
          {parseInlineMath(line.substring(3).trim())}
        </h3>
      );
    } else if (line.startsWith('##')) {
      elements.push(
        <h2 key={key} className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-8 mb-3 border-b border-slate-100 dark:border-slate-850 pb-1.5">
          {parseInlineMath(line.substring(2).trim())}
        </h2>
      );
    } else if (line.startsWith('#')) {
      elements.push(
        <h1 key={key} className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-10 mb-4">
          {parseInlineMath(line.substring(1).trim())}
        </h1>
      );
    }
    
    // Alert definition: > [!NOTE]
    else if (line.startsWith('>') && line.includes('[!')) {
      const match = line.match(/\[!(NOTE|IMPORTANT|TIP|WARNING|CAUTION)\]/);
      if (match) {
        currentAlert = { type: match[1], content: [] };
      }
    }

    // Math block: $$ equation $$
    else if (line.startsWith('$$') && line.endsWith('$$')) {
      const eq = line.substring(2, line.length - 2).trim();
      elements.push(<BlockMath key={key} math={eq} />);
    }

    // Lists
    else if (line.startsWith('*') || line.startsWith('-')) {
      inList = true;
      const content = line.substring(1).trim();
      listItems.push(
        <li key={key + '-li'}>
          {parseInlineMath(content)}
        </li>
      );
    }

    // Paragraph
    else {
      elements.push(
        <p key={key} className="text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed my-3 font-medium">
          {parseInlineMath(line)}
        </p>
      );
    }
  }

  // Flush remaining blocks
  flushAlert('final-alert');
  flushList('final-list');

  return elements;
};

// Parse inline math ($...$) and bold formatting (**...**)
const parseInlineMath = (text: string): React.ReactNode => {
  if (!text) return '';

  // Step 1: Split by inline math delimiter ($)
  // Even indexes are text, odd indexes are math formulas
  const mathParts = text.split('$');
  
  if (mathParts.length === 1) {
    return parseBoldText(text);
  }

  return (
    <>
      {mathParts.map((part, idx) => {
        const isMath = idx % 2 !== 0;
        const key = `math-${idx}`;

        if (isMath) {
          const unescapedPart = part.replace(/\\\\/g, '\\');
          return <InlineMath key={key} math={unescapedPart} />;
        } else {
          return <span key={key}>{parseBoldText(part)}</span>;
        }
      })}
    </>
  );
};

// Parse bold formatting: **text**
const parseBoldText = (text: string): React.ReactNode => {
  const boldParts = text.split('**');
  if (boldParts.length === 1) {
    return text;
  }

  return (
    <>
      {boldParts.map((part, idx) => {
        const isBold = idx % 2 !== 0;
        const key = `bold-${idx}`;
        return isBold ? <strong key={key} className="font-extrabold text-slate-900 dark:text-white">{part}</strong> : part;
      })}
    </>
  );
};
export default renderMarkdown;
