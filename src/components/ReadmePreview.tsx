import React, { useState } from 'react';
import { Check, Copy, Maximize2 } from 'lucide-react';
import {
  LabScreenshot,
  RepoConfig,
  TaskId,
  getScreenshotPath,
} from '../data/labData';

interface ReadmePreviewProps {
  config: RepoConfig;
  screenshots: LabScreenshot[];
  onInspectScreenshot: (shot: LabScreenshot) => void;
}

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
        <span className="font-mono text-xs text-slate-400">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ReadmePreview({
  config,
  screenshots,
  onInspectScreenshot,
}: ReadmePreviewProps) {
  const folder =
    config.screenshotFolder.trim().replace(/^\/+|\/+$/g, '') || 'screenshots';

  const shotsForTask = (taskId: TaskId) =>
    screenshots.filter((s) => s.included && s.taskId === taskId);

  const renderScreenshots = (taskId: TaskId) => {
    const items = shotsForTask(taskId);
    if (items.length === 0) {
      return (
        <p className="my-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          No screenshots selected for this section. Enable captures in the
          Screenshots tab to embed them here.
        </p>
      );
    }

    return (
      <div className="my-5 space-y-6">
        {items.map((shot) => (
          <figure
            key={shot.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white"
          >
            <div className="group relative bg-slate-900">
              <img
                src={shot.publicSrc}
                alt={shot.title}
                referrerPolicy="no-referrer"
                className="block w-full object-contain"
              />
              <button
                type="button"
                onClick={() => onInspectScreenshot(shot)}
                className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-blue-500"
                aria-label={`Inspect ${shot.title}`}
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Inspect</span>
              </button>
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-600">
              <span className="font-medium text-slate-800">{shot.caption}</span>
              <span className="font-mono text-slate-500">
                {getScreenshotPath(shot, config)}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    );
  };

  const includedCount = screenshots.filter((s) => s.included).length;

  return (
    <article className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white px-8 py-10">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="font-mono font-medium text-slate-700">README.md</span>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">{includedCount} embedded screenshots</span>
        <span aria-hidden="true">·</span>
        <span className="font-mono">
          {config.githubUsername}/{config.repoName}
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
        Hello Cloud Run — Containerized Node.js Deployment on Google Cloud
      </h1>

      <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
        Lab walkthrough and reference implementation for building a stateless
        Express.js application, containerizing it with Docker and Cloud Build,
        storing the image in Artifact Registry, and deploying it to{' '}
        <strong className="font-semibold text-slate-900">
          Google Cloud Run
        </strong>
        .
      </p>

      <h2 className="mt-8 border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">
        Lab Summary
      </h2>

      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
            <tr>
              <th className="px-4 py-2.5">Item</th>
              <th className="px-4 py-2.5">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">
                Platform
              </td>
              <td className="px-4 py-2.5">
                Google Cloud Run &amp; Artifact Registry
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">
                Runtime
              </td>
              <td className="px-4 py-2.5">
                Node.js (<code className="text-xs">node:22-slim</code>) +
                Express <code className="text-xs">^4.17.1</code>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">Region</td>
              <td className="px-4 py-2.5 font-mono text-xs">{config.region}</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">
                Project ID (Lab)
              </td>
              <td className="px-4 py-2.5 font-mono text-xs">
                {config.projectId}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">
                Artifact Registry Repo
              </td>
              <td className="px-4 py-2.5 font-mono text-xs">my-repository</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">
                Deployed Service URL
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-blue-700">
                {config.serviceUrl}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">
        Objectives
      </h2>
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] text-slate-700">
        <li>Enable the Cloud Run and Artifact Registry APIs.</li>
        <li>Create a stateless Node.js HTTP service using Express.</li>
        <li>
          Create a Docker repository in Artifact Registry and configure Docker
          auth.
        </li>
        <li>
          Containerize the app with a <code className="text-xs">Dockerfile</code>{' '}
          and build/push it with Cloud Build.
        </li>
        <li>
          Verify the container locally via Cloud Shell Web Preview and deploy to
          Cloud Run.
        </li>
        <li>
          Clean up container images and Cloud Run services after verification.
        </li>
      </ol>

      <h2 className="mt-8 border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">
        Repository Structure
      </h2>
      <CodeBlock
        language="text"
        code={`.
├── Dockerfile
├── index.js
├── package.json
├── .gitignore
├── README.md
└── ${folder}/
    └── ... (${includedCount} screenshots)`}
      />

      <hr className="my-8 border-slate-200" />

      <section>
        <h2 className="text-xl font-semibold text-slate-900">
          Setup: Verify Cloud Shell Authentication &amp; Project
        </h2>
        <p className="mt-2 text-[15px] text-slate-700">
          Confirm the active account and target Google Cloud project inside
          Cloud Shell:
        </p>
        <CodeBlock
          language="bash"
          code={`gcloud auth list\ngcloud config list project`}
        />
        {renderScreenshots('setup')}
      </section>

      <hr className="my-8 border-slate-200" />

      <section>
        <h2 className="text-xl font-semibold text-slate-900">
          Task 1: Enable APIs &amp; Configure Region
        </h2>
        <p className="mt-2 text-[15px] text-slate-700">
          Enable the Cloud Run and Artifact Registry APIs and set the compute
          region:
        </p>
        <CodeBlock
          language="bash"
          code={`gcloud services enable run.googleapis.com artifactregistry.googleapis.com
gcloud config set compute/region "${config.region}"
LOCATION="${config.region}"`}
        />
        {renderScreenshots('task-1')}
      </section>

      <hr className="my-8 border-slate-200" />

      <section>
        <h2 className="text-xl font-semibold text-slate-900">
          Task 2: Write the Sample Node.js Application
        </h2>
        <p className="mt-2 text-[15px] text-slate-700">
          Create the <code className="text-xs">helloworld</code> directory along
          with <code className="text-xs">package.json</code> and{' '}
          <code className="text-xs">index.js</code>:
        </p>
        <CodeBlock language="bash" code={`mkdir helloworld && cd helloworld`} />
        <CodeBlock
          language="json"
          code={`{
  "name": "helloworld",
  "description": "Simple hello world sample in Node",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Google LLC",
  "license": "Apache-2.0",
  "dependencies": {
    "express": "^4.17.1"
  }
}`}
        />
        <CodeBlock
          language="javascript"
          code={`const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(\`Hello \${name}!\`);
});

app.listen(port, () => {
  console.log(\`helloworld: listening on port \${port}\`);
});`}
        />
        {renderScreenshots('task-2')}
      </section>

      <hr className="my-8 border-slate-200" />

      <section>
        <h2 className="text-xl font-semibold text-slate-900">
          Task 3: Create an Artifact Registry Repository
        </h2>
        <p className="mt-2 text-[15px] text-slate-700">
          Create the Docker repository <code className="text-xs">my-repository</code>{' '}
          in <code className="text-xs">$LOCATION</code> and configure Docker
          authentication:
        </p>
        <CodeBlock
          language="bash"
          code={`gcloud artifacts repositories create my-repository \\
  --repository-format=docker \\
  --location=$LOCATION \\
  --description="Docker repository"

gcloud auth configure-docker $LOCATION-docker.pkg.dev`}
        />
        {renderScreenshots('task-3')}
      </section>

      <hr className="my-8 border-slate-200" />

      <section>
        <h2 className="text-xl font-semibold text-slate-900">
          Task 4: Containerize the App &amp; Build with Cloud Build
        </h2>
        <p className="mt-2 text-[15px] text-slate-700">
          Create the <code className="text-xs">Dockerfile</code> using{' '}
          <code className="text-xs">node:22-slim</code>, build and push the
          image to Artifact Registry, then verify locally on port{' '}
          <code className="text-xs">8080</code>:
        </p>
        <CodeBlock
          language="dockerfile"
          code={`FROM node:22-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . ./
CMD [ "npm", "start" ]`}
        />
        <CodeBlock
          language="bash"
          code={`gcloud builds submit --tag $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld

docker run -d -p 8080:8080 $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld`}
        />
        {renderScreenshots('task-4')}
      </section>

      <hr className="my-8 border-slate-200" />

      <section>
        <h2 className="text-xl font-semibold text-slate-900">
          Task 5: Deploy to Cloud Run
        </h2>
        <p className="mt-2 text-[15px] text-slate-700">
          Deploy the container image from Artifact Registry as a publicly
          accessible Cloud Run service. Verified endpoint:{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">
            {config.serviceUrl}
          </code>
        </p>
        <CodeBlock
          language="bash"
          code={`gcloud run deploy helloworld \\
  --image $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld \\
  --allow-unauthenticated \\
  --region=$LOCATION`}
        />
        {renderScreenshots('task-5')}
      </section>

      {config.includeCleanupSection && (
        <>
          <hr className="my-8 border-slate-200" />
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Task 6: Clean Up Resources
            </h2>
            <p className="mt-2 text-[15px] text-slate-700">
              To avoid incurring ongoing Artifact Registry storage charges after
              finishing the lab, remove the container image and Cloud Run
              service:
            </p>
            <CodeBlock
              language="bash"
              code={`# Delete the container image from Artifact Registry
gcloud artifacts docker images delete $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld

# Delete the Cloud Run service
gcloud run services delete helloworld --region=$LOCATION`}
            />
            {renderScreenshots('task-6')}
          </section>
        </>
      )}

      {config.includeTroubleshootingNote && (
        <>
          <hr className="my-8 border-slate-200" />
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Troubleshooting Notes
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-slate-700">
              <li>
                <strong className="font-semibold text-slate-900">
                  401 Invalid Credentials during{' '}
                  <code className="text-xs">gcloud builds submit</code>
                </strong>
                : If Cloud Shell loses connection or temporary lab credentials
                expire mid-session, refresh the browser or re-run{' '}
                <code className="text-xs">gcloud auth list</code> before
                retrying <code className="text-xs">gcloud builds submit</code>.
              </li>
              <li>
                <strong className="font-semibold text-slate-900">
                  Docker Base Image
                </strong>
                : <code className="text-xs">node:22-slim</code> was used in the{' '}
                <code className="text-xs">Dockerfile</code> for a compact
                Node.js production image.
              </li>
            </ul>
          </section>
        </>
      )}
    </article>
  );
}
