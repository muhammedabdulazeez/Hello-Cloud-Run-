import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  X,
} from 'lucide-react';
import {
  DEFAULT_CONFIG,
  INITIAL_SCREENSHOTS,
  LabScreenshot,
  RepoConfig,
  generateReadmeMarkdown,
  getScreenshotPath,
} from './data/labData';
import { ReadmePreview } from './components/ReadmePreview';
import { ScreenshotManager } from './components/ScreenshotManager';
import { MarkdownSourceView } from './components/MarkdownSourceView';
import { RepoFilesAndPush } from './components/RepoFilesAndPush';

type ActiveTab = 'preview' | 'screenshots' | 'source' | 'push';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');
  const [config, setConfig] = useState<RepoConfig>(DEFAULT_CONFIG);
  const [screenshots, setScreenshots] =
    useState<LabScreenshot[]>(INITIAL_SCREENSHOTS);
  const [inspectedId, setInspectedId] = useState<string | null>(null);

  const markdown = useMemo(
    () => generateReadmeMarkdown(config, screenshots),
    [config, screenshots]
  );

  const includedCount = useMemo(
    () => screenshots.filter((s) => s.included).length,
    [screenshots]
  );

  const inspectedIndex = useMemo(
    () => screenshots.findIndex((s) => s.id === inspectedId),
    [screenshots, inspectedId]
  );
  const inspectedShot =
    inspectedIndex >= 0 ? screenshots[inspectedIndex] : null;

  useEffect(() => {
    if (!inspectedShot) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspectedId(null);
      } else if (e.key === 'ArrowRight' && inspectedIndex < screenshots.length - 1) {
        setInspectedId(screenshots[inspectedIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && inspectedIndex > 0) {
        setInspectedId(screenshots[inspectedIndex - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectedShot, inspectedIndex, screenshots]);

  const handleToggleInclude = (id: string) => {
    setScreenshots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, included: !s.included } : s))
    );
  };

  const handleUpdateCaption = (id: string, caption: string) => {
    setScreenshots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, caption } : s))
    );
  };

  const handleResetScreenshots = () => {
    setScreenshots(INITIAL_SCREENSHOTS);
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-3.5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('preview');
            }}
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Hello Cloud Run Docs
          </a>

          <nav
            aria-label="Workspace Views"
            className="flex items-center gap-6 overflow-x-auto text-sm font-medium"
          >
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`border-b-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'preview'
                  ? 'border-blue-600 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              README Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('screenshots')}
              className={`border-b-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'screenshots'
                  ? 'border-blue-600 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Screenshots ({screenshots.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('source')}
              className={`border-b-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'source'
                  ? 'border-blue-600 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Markdown Source
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('push')}
              className={`border-b-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'push'
                  ? 'border-blue-600 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Push to GitHub
            </button>
          </nav>

          <button
            type="button"
            onClick={handleDownloadReadme}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download README.md</span>
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-6 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-72">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Repository Settings
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Customize repo metadata and embedded screenshot options.
              </p>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="github-username"
                  className="block text-xs font-medium text-slate-700"
                >
                  GitHub Username
                </label>
                <input
                  id="github-username"
                  type="text"
                  value={config.githubUsername}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      githubUsername: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="repo-name"
                  className="block text-xs font-medium text-slate-700"
                >
                  Repository Name
                </label>
                <input
                  id="repo-name"
                  type="text"
                  value={config.repoName}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, repoName: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="screenshot-folder"
                  className="block text-xs font-medium text-slate-700"
                >
                  Screenshots Folder
                </label>
                <input
                  id="screenshot-folder"
                  type="text"
                  value={config.screenshotFolder}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      screenshotFolder: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="service-url"
                  className="block text-xs font-medium text-slate-700"
                >
                  Cloud Run Service URL
                </label>
                <input
                  id="service-url"
                  type="text"
                  value={config.serviceUrl}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      serviceUrl: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-2.5 border-t border-slate-200 pt-4">
                <label className="flex cursor-pointer items-start gap-2.5 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={config.useCleanFilenames}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        useCleanFilenames: e.target.checked,
                      }))
                    }
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    Use clean numbered filenames (e.g.{' '}
                    <code className="font-mono text-[11px]">
                      01-cloud-shell-auth-project.png
                    </code>
                    )
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-2.5 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={config.includeCleanupSection}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        includeCleanupSection: e.target.checked,
                      }))
                    }
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Include Task 6 cleanup section</span>
                </label>

                <label className="flex cursor-pointer items-start gap-2.5 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={config.includeTroubleshootingNote}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        includeTroubleshootingNote: e.target.checked,
                      }))
                    }
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Include troubleshooting notes</span>
                </label>
              </div>

              <div className="border-t border-slate-200 pt-4 text-xs text-slate-600">
                <div className="flex items-center justify-between py-1">
                  <span>Selected screenshots</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {includedCount} / {screenshots.length}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Region</span>
                  <span className="font-mono text-slate-900">
                    {config.region}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Lab Project</span>
                  <span className="truncate pl-3 font-mono text-[11px] text-slate-900">
                    {config.projectId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {activeTab === 'preview' && (
            <ReadmePreview
              config={config}
              screenshots={screenshots}
              onInspectScreenshot={(shot) => setInspectedId(shot.id)}
            />
          )}

          {activeTab === 'screenshots' && (
            <ScreenshotManager
              screenshots={screenshots}
              config={config}
              onToggleInclude={handleToggleInclude}
              onUpdateCaption={handleUpdateCaption}
              onResetAll={handleResetScreenshots}
              onInspectScreenshot={(shot) => setInspectedId(shot.id)}
            />
          )}

          {activeTab === 'source' && (
            <MarkdownSourceView
              markdown={markdown}
              onDownload={handleDownloadReadme}
            />
          )}

          {activeTab === 'push' && (
            <RepoFilesAndPush
              config={config}
              screenshots={screenshots}
              onDownloadReadme={handleDownloadReadme}
            />
          )}
        </main>
      </div>

      {inspectedShot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={inspectedShot.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4"
          onClick={() => setInspectedId(null)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono tabular-nums">
                    {inspectedShot.timestamp}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{inspectedShot.taskLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate font-mono">
                    {getScreenshotPath(inspectedShot, config)}
                  </span>
                </div>
                <h3 className="mt-0.5 truncate text-sm font-semibold text-white">
                  {inspectedShot.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={inspectedIndex <= 0}
                  onClick={() =>
                    setInspectedId(screenshots[inspectedIndex - 1].id)
                  }
                  className="rounded-lg border border-slate-700 p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-1 font-mono text-xs text-slate-400 tabular-nums">
                  {inspectedIndex + 1} / {screenshots.length}
                </span>
                <button
                  type="button"
                  disabled={inspectedIndex >= screenshots.length - 1}
                  onClick={() =>
                    setInspectedId(screenshots[inspectedIndex + 1].id)
                  }
                  className="rounded-lg border border-slate-700 p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setInspectedId(null)}
                  className="ml-2 rounded-lg border border-slate-700 p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white"
                  aria-label="Close preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-black p-2">
              <img
                src={inspectedShot.publicSrc}
                alt={inspectedShot.title}
                referrerPolicy="no-referrer"
                className="mx-auto max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="border-t border-slate-800 px-5 py-3 text-xs text-slate-300">
              {inspectedShot.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
