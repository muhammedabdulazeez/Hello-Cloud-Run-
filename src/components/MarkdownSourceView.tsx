import React, { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';

interface MarkdownSourceViewProps {
  markdown: string;
  onDownload: () => void;
}

export function MarkdownSourceView({
  markdown,
  onDownload,
}: MarkdownSourceViewProps) {
  const [copied, setCopied] = useState(false);
  const lines = markdown.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-mono font-semibold text-slate-900">
            README.md
          </span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{lines.length} lines</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {new Blob([markdown]).size.toLocaleString()} bytes
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copied Markdown</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download README.md</span>
          </button>
        </div>
      </div>

      <div className="max-h-[72vh] overflow-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60">
                <td className="w-12 select-none pr-4 text-right text-slate-600 tabular-nums">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-slate-100">{line || ' '}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
