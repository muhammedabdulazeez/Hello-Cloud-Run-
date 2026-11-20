import React, { useState } from 'react';
import { Eye, EyeOff, Maximize2, RotateCcw, Search } from 'lucide-react';
import {
  LabScreenshot,
  RepoConfig,
  getScreenshotPath,
} from '../data/labData';

interface ScreenshotManagerProps {
  screenshots: LabScreenshot[];
  config: RepoConfig;
  onToggleInclude: (id: string) => void;
  onUpdateCaption: (id: string, caption: string) => void;
  onResetAll: () => void;
  onInspectScreenshot: (shot: LabScreenshot) => void;
}

type FilterMode = 'all' | 'included' | 'excluded';

export function ScreenshotManager({
  screenshots,
  config,
  onToggleInclude,
  onUpdateCaption,
  onResetAll,
  onInspectScreenshot,
}: ScreenshotManagerProps) {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [query, setQuery] = useState('');

  const includedCount = screenshots.filter((s) => s.included).length;
  const excludedCount = screenshots.length - includedCount;

  const filtered = screenshots.filter((shot) => {
    if (filter === 'included' && !shot.included) return false;
    if (filter === 'excluded' && shot.included) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        shot.title.toLowerCase().includes(q) ||
        shot.caption.toLowerCase().includes(q) ||
        shot.taskLabel.toLowerCase().includes(q) ||
        shot.targetFilename.toLowerCase().includes(q) ||
        shot.originalFilename.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Captures ({screenshots.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('included')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                filter === 'included'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              In README ({includedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('excluded')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                filter === 'excluded'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Extra / Excluded ({excludedCount})
            </button>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by task, filename, or caption..."
              className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onResetAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Curated Selection</span>
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-900">
            No screenshots match your current filter
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Clear your search query or switch back to All Captures.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter('all');
              setQuery('');
            }}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
          >
            Show All Captures
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filtered.map((shot) => (
            <div
              key={shot.id}
              className={`flex flex-col overflow-hidden rounded-xl border bg-white transition-colors ${
                shot.included ? 'border-slate-200' : 'border-slate-200/70 opacity-85'
              }`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono tabular-nums">{shot.timestamp}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate font-medium text-slate-700">
                      {shot.taskLabel}
                    </span>
                  </div>
                  <h3 className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                    {shot.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleInclude(shot.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    shot.included
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      : 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {shot.included ? (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      <span>Included</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Excluded</span>
                    </>
                  )}
                </button>
              </div>

              <div className="group relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={shot.publicSrc}
                  alt={shot.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top"
                />
                <button
                  type="button"
                  onClick={() => onInspectScreenshot(shot)}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Full Size</span>
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                <div>
                  <label
                    htmlFor={`caption-${shot.id}`}
                    className="block text-xs font-medium text-slate-600"
                  >
                    README Caption
                  </label>
                  <input
                    id={`caption-${shot.id}`}
                    type="text"
                    value={shot.caption}
                    onChange={(e) => onUpdateCaption(shot.id, e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                  {shot.note && (
                    <p className="mt-2 text-xs text-amber-700">
                      Note: {shot.note}
                    </p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-2.5 font-mono text-[11px] text-slate-500">
                  <div className="truncate">
                    <span className="text-slate-400">Repo path: </span>
                    <span className="text-slate-700">
                      {getScreenshotPath(shot, config)}
                    </span>
                  </div>
                  <div className="mt-0.5 truncate">
                    <span className="text-slate-400">Original: </span>
                    <span>{shot.originalFilename}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
