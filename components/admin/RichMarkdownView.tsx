import React from "react";

interface RichMarkdownViewProps {
  content: string;
  className?: string;
}

export function RichMarkdownView({ content, className = "" }: RichMarkdownViewProps) {
  if (!content) return null;

  const lines = content.split("\n");

  return (
    <div className={`prose max-w-none text-gray-700 leading-relaxed space-y-3 ${className}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Heading 1
        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={idx} className="text-2xl font-black text-gray-900 mt-4 mb-2 tracking-tight">
              {renderInline(trimmed.replace("# ", ""))}
            </h1>
          );
        }

        // Heading 2
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-xl font-black text-gray-900 mt-3 mb-1.5 border-l-4 border-emerald-600 pl-3">
              {renderInline(trimmed.replace("## ", ""))}
            </h2>
          );
        }

        // Heading 3
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-base font-bold text-gray-900 mt-2 mb-1">
              {renderInline(trimmed.replace("### ", ""))}
            </h3>
          );
        }

        // Heading 4
        if (trimmed.startsWith("#### ")) {
          return (
            <h4 key={idx} className="text-sm font-bold text-emerald-800 uppercase tracking-wider mt-2 mb-1">
              {renderInline(trimmed.replace("#### ", ""))}
            </h4>
          );
        }

        // Blockquote
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={idx} className="p-3.5 my-2 bg-emerald-50/70 border-l-4 border-emerald-600 text-emerald-950 rounded-r-2xl italic text-sm">
              {renderInline(trimmed.replace("> ", ""))}
            </blockquote>
          );
        }

        // Image ![alt](url)
        const imgMatch = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
          const alt = imgMatch[1];
          const src = imgMatch[2];
          return (
            <div key={idx} className="my-3 rounded-2xl overflow-hidden border border-gray-200 bg-white p-2 shadow-xs">
              <img src={src} alt={alt || "Product Detail"} className="max-h-96 w-auto mx-auto object-contain rounded-xl" />
              {alt && <p className="text-center text-[11px] text-gray-500 mt-1.5 italic font-medium">{alt}</p>}
            </div>
          );
        }

        // Task checklist items
        if (trimmed.startsWith("- [ ] ") || trimmed.startsWith("- [x] ")) {
          const checked = trimmed.startsWith("- [x] ");
          const text = trimmed.slice(6);
          return (
            <div key={idx} className="flex items-center gap-2.5 pl-2 text-sm text-gray-800">
              <input
                type="checkbox"
                checked={checked}
                readOnly
                className="w-4 h-4 rounded text-emerald-700 accent-[#16341f]"
              />
              <span className={checked ? "line-through text-gray-400" : ""}>{renderInline(text)}</span>
            </div>
          );
        }

        // Numbered list item
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 text-sm">
              <span className="font-bold text-emerald-800 font-mono">{trimmed.match(/^\d+\./)?.[0]}</span>
              <span>{renderInline(trimmed.replace(/^\d+\.\s/, ""))}</span>
            </div>
          );
        }

        // Bullet list item
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 text-sm">
              <span className="text-emerald-600 font-bold text-base leading-none mt-0.5">•</span>
              <span>{renderInline(trimmed.replace(/^[-*•]\s/, ""))}</span>
            </div>
          );
        }

        // Table separator line skip
        if (trimmed.startsWith("|") && trimmed.includes("---")) {
          return null;
        }

        // Table row
        if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
          const cells = trimmed
            .slice(1, -1)
            .split("|")
            .map((c) => c.trim());
          return (
            <div key={idx} className="overflow-x-auto my-2">
              <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
                <tbody>
                  <tr className="bg-gray-50 divide-x divide-gray-200">
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 text-gray-800 font-medium">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={idx} className="text-sm text-gray-700 leading-relaxed">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  // Regex to match markdown links [text](url), bold **text**, italic *text*, strike ~~text~~, code `code`
  const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|__.*?__|\*.*?\*|_.*?_|~~.*?~~|`.*?`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    // Markdown link [title](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 font-bold hover:underline"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Bold
    if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("__") && part.endsWith("__"))) {
      return (
        <strong key={i} className="font-extrabold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic
    if ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_"))) {
      return (
        <em key={i} className="italic text-gray-800">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Strikethrough
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return (
        <del key={i} className="line-through text-gray-400">
          {part.slice(2, -2)}
        </del>
      );
    }

    // Inline code
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-xs text-emerald-900">
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

