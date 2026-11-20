import React, { useState } from 'react';
import { Check, Copy, Download, FolderGit2, Terminal } from 'lucide-react';
import {
  LabScreenshot,
  REPO_FILES,
  RepoConfig,
  generateGitPushCommands,
  generateRenameScript,
} from '../data/labData';

interface RepoFilesAndPushProps {
  config: RepoConfig;
  screenshots: LabScreenshot[];
  onDownloadReadme: () => void;
}

type RepoFileKey = keyof typeof REPO_FILES;

export function RepoFilesAndPush({
  config,
  screenshots,
  onDownloadReadme,
}: RepoFilesAndPushProps) {
  const [selectedFile, setSelectedFile] = useState<RepoFileKey>('index.js');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const renameScript = generateRenameScript(screenshots, config);
  const gitCommands = generateGitPushCommands(config);

  const handleCopy = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const includedCount = screenshots.filter((s) => s.included).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-semibold text-slate-900">
                1. Organize &amp; Rename Screenshots
              </h2>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('rename', renameScript)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              {copiedId === 'rename' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Script</span>
                </>
              )}
            </button>
          </div>
          <div className="p-5">
            <p className="text-xs leading-relaxed text-slate-600">
              {config.useCleanFilenames
                ? `Run this inside the folder containing your ${includedCount} selected screenshots to move and rename them into "${config.screenshotFolder}/" so every link in README.md resolves cleanly.`
                : `You opted to keep original screenshot filenames. Create "${config.screenshotFolder}/" and move your selected screenshots into it before committing.`}
            </p>
            <pre className="mt-3 max-h-72 overflow-auto rounded-lg border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100">
              <code>
                {config.useCleanFilenames
                  ? renameScript
                  : `mkdir -p ${config.screenshotFolder}\nmv Screenshot_From_2026-11-20_*.png ${config.screenshotFolder}/`}
              </code>
            </pre>
          </div>
        </section>

        <section className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-semibold text-slate-900">
                2. Create Repo &amp; Push to GitHub
              </h2>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('git', gitCommands)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              {copiedId === 'git' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Commands</span>
                </>
              )}
            </button>
          </div>
          <div className="p-5">
            <p className="text-xs leading-relaxed text-slate-600">
              Place your <code className="font-mono">README.md</code>, lab
              source files, and{' '}
              <code className="font-mono">{config.screenshotFolder}/</code>{' '}
              directory in your repo folder, then push using either GitHub CLI
              or standard <code className="font-mono">git</code> remote.
            </p>
            <pre className="mt-3 max-h-72 overflow-auto rounded-lg border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100">
              <code>{gitCommands}</code>
            </pre>
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-3.5">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              3. Lab Application Files to Include in Repo
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Copy or download the exact Node.js and Docker files created during
              the lab alongside README.md.
            </p>
          </div>

          <button
            type="button"
            onClick={onDownloadReadme}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download README.md</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-2.5">
          <div className="flex items-center gap-1 rounded-lg bg-slate-200/70 p-1">
            {(Object.keys(REPO_FILES) as RepoFileKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedFile(key)}
                className={`rounded-md px-3 py-1 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedFile === key
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopy(selectedFile, REPO_FILES[selectedFile])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
            >
              {copiedId === selectedFile ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy {selectedFile}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() =>
                handleDownloadFile(selectedFile, REPO_FILES[selectedFile])
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download {selectedFile}</span>
            </button>
          </div>
        </div>

        <pre className="overflow-x-auto bg-slate-950 p-5 font-mono text-[13px] leading-relaxed text-slate-100">
          <code>{REPO_FILES[selectedFile]}</code>
        </pre>
      </section>
    </div>
  );
}
