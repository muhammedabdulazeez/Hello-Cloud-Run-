export type TaskId =
  | 'setup'
  | 'task-1'
  | 'task-2'
  | 'task-3'
  | 'task-4'
  | 'task-5'
  | 'task-6';

export interface LabScreenshot {
  id: string;
  originalFilename: string;
  publicSrc: string;
  targetFilename: string;
  timestamp: string;
  taskId: TaskId;
  taskLabel: string;
  title: string;
  caption: string;
  included: boolean;
  note?: string;
}

export interface RepoConfig {
  githubUsername: string;
  repoName: string;
  screenshotFolder: string;
  projectId: string;
  region: string;
  serviceUrl: string;
  useCleanFilenames: boolean;
  includeCleanupSection: boolean;
  includeTroubleshootingNote: boolean;
}

export const DEFAULT_CONFIG: RepoConfig = {
  githubUsername: 'your-username',
  repoName: 'hello-cloud-run-lab',
  screenshotFolder: 'screenshots',
  projectId: 'qwiklabs-gcp-04-9e6cbfbd84b3',
  region: 'us-east4',
  serviceUrl: 'https://helloworld-239027691572.us-east4.run.app',
  useCleanFilenames: true,
  includeCleanupSection: true,
  includeTroubleshootingNote: true,
};

export const INITIAL_SCREENSHOTS: LabScreenshot[] = [
  {
    id: 'shot-01',
    originalFilename: 'Screenshot_From_2026-11-20_16-39-40_a5226a6c.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-39-40_a5226a6c.png',
    targetFilename: 'extra-01-cloud-shell-auth-only.png',
    timestamp: '16:39:40',
    taskId: 'setup',
    taskLabel: 'Setup & Cloud Shell',
    title: 'Active Account Verification',
    caption: 'Verify the active student account in Cloud Shell using gcloud auth list.',
    included: false,
    note: 'Superseded 17s later by the combined auth + project ID screenshot.',
  },
  {
    id: 'shot-02',
    originalFilename: 'Screenshot_From_2026-11-20_16-39-57_808a8372.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-39-57_808a8372.png',
    targetFilename: '01-cloud-shell-auth-project.png',
    timestamp: '16:39:57',
    taskId: 'setup',
    taskLabel: 'Setup & Cloud Shell',
    title: 'Cloud Shell Auth & Project ID',
    caption: 'Verify active Qwiklabs account and project configuration (qwiklabs-gcp-04-9e6cbfbd84b3).',
    included: true,
  },
  {
    id: 'shot-03',
    originalFilename: 'Screenshot_From_2026-11-20_16-41-06_95e98a04.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-41-06_95e98a04.png',
    targetFilename: '02-task1-enable-apis-and-region.png',
    timestamp: '16:41:06',
    taskId: 'task-1',
    taskLabel: 'Task 1 · Enable APIs',
    title: 'Enable Cloud Run & Artifact Registry APIs',
    caption: 'Enable run.googleapis.com and artifactregistry.googleapis.com and configure region us-east4.',
    included: true,
  },
  {
    id: 'shot-04',
    originalFilename: 'Screenshot_From_2026-11-20_16-41-43_368e65ca.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-41-43_368e65ca.png',
    targetFilename: '03-task2-create-helloworld-dir.png',
    timestamp: '16:41:43',
    taskId: 'task-2',
    taskLabel: 'Task 2 · Node.js App',
    title: 'Create Application Directory',
    caption: 'Create and navigate into the helloworld directory before writing package.json.',
    included: true,
  },
  {
    id: 'shot-05',
    originalFilename: 'Screenshot_From_2026-11-20_16-41-49_cd62cce0.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-41-49_cd62cce0.png',
    targetFilename: '04-task2-package-json.png',
    timestamp: '16:41:49',
    taskId: 'task-2',
    taskLabel: 'Task 2 · Node.js App',
    title: 'Author package.json in Nano',
    caption: 'Define Node.js start script and Express dependency (^4.17.1) in package.json.',
    included: true,
  },
  {
    id: 'shot-06',
    originalFilename: 'Screenshot_From_2026-11-20_16-42-21_5bf987ea.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-42-21_5bf987ea.png',
    targetFilename: '05-task2-index-js.png',
    timestamp: '16:42:21',
    taskId: 'task-2',
    taskLabel: 'Task 2 · Node.js App',
    title: 'Author index.js Express Server',
    caption: 'Create the HTTP server listening on process.env.PORT || 8080 and responding with Hello World!',
    included: true,
  },
  {
    id: 'shot-07',
    originalFilename: 'Screenshot_From_2026-11-20_16-43-16_9de4a04c.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-43-16_9de4a04c.png',
    targetFilename: '06-task3-create-artifact-repo.png',
    timestamp: '16:43:16',
    taskId: 'task-3',
    taskLabel: 'Task 3 · Artifact Registry',
    title: 'Create Docker Repository',
    caption: 'Create the my-repository Docker repository in us-east4 via gcloud artifacts repositories create.',
    included: true,
  },
  {
    id: 'shot-08',
    originalFilename: 'Screenshot_From_2026-11-20_16-43-43_ddc04491.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-43-43_ddc04491.png',
    targetFilename: '07-task3-configure-docker-auth.png',
    timestamp: '16:43:43',
    taskId: 'task-3',
    taskLabel: 'Task 3 · Artifact Registry',
    title: 'Configure Docker Authentication',
    caption: 'Configure Docker credential helpers for us-east4-docker.pkg.dev.',
    included: true,
  },
  {
    id: 'shot-09',
    originalFilename: 'Screenshot_From_2026-11-20_16-43-47_9d97dc0a.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-43-47_9d97dc0a.png',
    targetFilename: 'extra-02-task3-repo-capture-toast.png',
    timestamp: '16:43:47',
    taskId: 'task-3',
    taskLabel: 'Task 3 · Artifact Registry',
    title: 'Repository Creation Output (Duplicate Capture)',
    caption: 'Duplicate screen capture of the Artifact Registry repository creation output.',
    included: false,
    note: 'Duplicate capture of Task 3 output with OS screen-capture notification.',
  },
  {
    id: 'shot-10',
    originalFilename: 'Screenshot_From_2026-11-20_16-43-51_6f6a45dc.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-43-51_6f6a45dc.png',
    targetFilename: 'extra-03-cloud-shell-reconnect.png',
    timestamp: '16:43:51',
    taskId: 'task-3',
    taskLabel: 'Task 3 · Artifact Registry',
    title: 'Cloud Shell Session Reconnect',
    caption: 'Cloud Shell connection reset during Google account credential verification.',
    included: false,
    note: 'Incidental session disconnect captured while re-authenticating.',
  },
  {
    id: 'shot-11',
    originalFilename: 'Screenshot_From_2026-11-20_16-46-25_c9a52012.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-46-25_c9a52012.png',
    targetFilename: '08-task4-cloud-build-start.png',
    timestamp: '16:46:25',
    taskId: 'task-4',
    taskLabel: 'Task 4 · Containerize & Build',
    title: 'Submit Container Build with Cloud Build',
    caption: 'After refreshing credentials, gcloud builds submit uploads source and starts Step 1/6 (FROM node:22-slim).',
    included: true,
  },
  {
    id: 'shot-12',
    originalFilename: 'Screenshot_From_2026-11-20_16-46-53_d4cdbe5e.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-46-53_d4cdbe5e.png',
    targetFilename: '09-task4-cloud-build-push-done.png',
    timestamp: '16:46:53',
    taskId: 'task-4',
    taskLabel: 'Task 4 · Containerize & Build',
    title: 'Container Image Built & Pushed',
    caption: 'Cloud Build completes steps 5/6 and 6/6 and pushes all layers to Artifact Registry.',
    included: true,
  },
  {
    id: 'shot-13',
    originalFilename: 'Screenshot_From_2026-11-20_16-47-17_47ee2f92.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-47-17_47ee2f92.png',
    targetFilename: '10-task4-cloud-build-success.png',
    timestamp: '16:47:17',
    taskId: 'task-4',
    taskLabel: 'Task 4 · Containerize & Build',
    title: 'Cloud Build Summary (STATUS: SUCCESS)',
    caption: 'Build ID 8d83db9d-8bca-4465-93b5-740b2c8ac6bd completes in 36s with STATUS: SUCCESS.',
    included: true,
  },
  {
    id: 'shot-14',
    originalFilename: 'Screenshot_From_2026-11-20_16-47-48_3f0b7773.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-47-48_3f0b7773.png',
    targetFilename: '11-task4-docker-run-web-preview.png',
    timestamp: '16:47:48',
    taskId: 'task-4',
    taskLabel: 'Task 4 · Containerize & Build',
    title: 'Run Container Locally & Open Web Preview',
    caption: 'Start the built image locally on port 8080 via docker run and select Preview on port 8080.',
    included: true,
  },
  {
    id: 'shot-15',
    originalFilename: 'Screenshot_From_2026-11-20_16-47-58_146b2b61.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-47-58_146b2b61.png',
    targetFilename: '12-task4-local-preview-hello-world.png',
    timestamp: '16:47:58',
    taskId: 'task-4',
    taskLabel: 'Task 4 · Containerize & Build',
    title: 'Verify Local Web Preview Output',
    caption: 'Cloud Shell Web Preview on port 8080 renders "Hello World!".',
    included: true,
  },
  {
    id: 'shot-16',
    originalFilename: 'Screenshot_From_2026-11-20_16-48-49_06b096e4.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-48-49_06b096e4.png',
    targetFilename: '13-task5-cloud-run-deploy.png',
    timestamp: '16:48:49',
    taskId: 'task-5',
    taskLabel: 'Task 5 · Deploy to Cloud Run',
    title: 'Deploy Service to Cloud Run',
    caption: 'Deploy helloworld revision helloworld-00001-fk5 serving 100% traffic in us-east4.',
    included: true,
  },
  {
    id: 'shot-17',
    originalFilename: 'Screenshot_From_2026-11-20_16-49-39_b61d71cd.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-49-39_b61d71cd.png',
    targetFilename: '14-task5-live-service-hello-world.png',
    timestamp: '16:49:39',
    taskId: 'task-5',
    taskLabel: 'Task 5 · Deploy to Cloud Run',
    title: 'Verify Live Cloud Run HTTPS Endpoint',
    caption: 'Public Cloud Run URL (helloworld-239027691572.us-east4.run.app) serves "Hello World!".',
    included: true,
  },
  {
    id: 'shot-18',
    originalFilename: 'Screenshot_From_2026-11-20_16-50-01_f85423d8.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-50-01_f85423d8.png',
    targetFilename: '15-task5-cloud-run-console-service.png',
    timestamp: '16:50:01',
    taskId: 'task-5',
    taskLabel: 'Task 5 · Deploy to Cloud Run',
    title: 'Cloud Run Console Overview',
    caption: 'Google Cloud Console shows the active helloworld service deployed in us-east4.',
    included: true,
  },
  {
    id: 'shot-19',
    originalFilename: 'Screenshot_From_2026-11-20_16-51-18_af8b53e7.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-51-18_af8b53e7.png',
    targetFilename: '16-task6-delete-container-image.png',
    timestamp: '16:51:18',
    taskId: 'task-6',
    taskLabel: 'Task 6 · Clean Up',
    title: 'Delete Container Image from Artifact Registry',
    caption: 'Delete the helloworld image tags from Artifact Registry to avoid storage charges.',
    included: true,
  },
  {
    id: 'shot-20',
    originalFilename: 'Screenshot_From_2026-11-20_16-51-44_73041d85.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-51-44_73041d85.png',
    targetFilename: '17-task6-delete-cloud-run-service.png',
    timestamp: '16:51:44',
    taskId: 'task-6',
    taskLabel: 'Task 6 · Clean Up',
    title: 'Delete Cloud Run Service',
    caption: 'Delete the helloworld Cloud Run service from us-east4.',
    included: true,
  },
  {
    id: 'shot-21',
    originalFilename: 'Screenshot_From_2026-11-20_16-52-08_699710ee.png',
    publicSrc: '/assets/aistudio/Screenshot_From_2026-11-20_16-52-08_699710ee.png',
    targetFilename: '18-task6-cloud-run-cleanup-verified.png',
    timestamp: '16:52:08',
    taskId: 'task-6',
    taskLabel: 'Task 6 · Clean Up',
    title: 'Verify Clean Cloud Run Console',
    caption: 'Confirm in the Cloud Run Overview console that no active services remain.',
    included: true,
  },
];

export const REPO_FILES = {
  'package.json': `{
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
}
`,
  'index.js': `const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(\`Hello \${name}!\`);
});

app.listen(port, () => {
  console.log(\`helloworld: listening on port \${port}\`);
});
`,
  Dockerfile: `# Use the official lightweight Node.js image.
# https://hub.docker.com/_/node
FROM node:22-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "npm", "start" ]
`,
  '.gitignore': `node_modules/
npm-debug.log*
.DS_Store
.env
`,
};

export function getScreenshotPath(
  shot: LabScreenshot,
  config: RepoConfig
): string {
  const folder = config.screenshotFolder.trim().replace(/^\/+|\/+$/g, '');
  const filename = config.useCleanFilenames
    ? shot.targetFilename
    : shot.originalFilename;
  return folder ? `${folder}/${filename}` : filename;
}

export function generateRenameScript(
  screenshots: LabScreenshot[],
  config: RepoConfig
): string {
  const folder = config.screenshotFolder.trim().replace(/^\/+|\/+$/g, '') || 'screenshots';
  const included = screenshots.filter((s) => s.included);
  const lines = [
    `mkdir -p ${folder}`,
    ...included.map(
      (s) => `mv "${s.originalFilename}" "${folder}/${s.targetFilename}"`
    ),
  ];
  return lines.join('\n');
}

export function generateGitPushCommands(config: RepoConfig): string {
  const user = config.githubUsername.trim() || 'your-username';
  const repo = config.repoName.trim() || 'hello-cloud-run-lab';
  return `# 1. Initialize repository and commit files
git init
git add .
git commit -m "docs: add Hello Cloud Run lab code, README, and screenshots"
git branch -M main

# 2A. Option A: Create & push directly using GitHub CLI (gh)
gh repo create ${repo} --public --source=. --remote=origin --push

# 2B. Option B: Push to an existing empty GitHub repository
git remote add origin https://github.com/${user}/${repo}.git
git push -u origin main`;
}

export function generateReadmeMarkdown(
  config: RepoConfig,
  screenshots: LabScreenshot[]
): string {
  const folder = config.screenshotFolder.trim().replace(/^\/+|\/+$/g, '') || 'screenshots';
  const shotsForTask = (taskId: TaskId) =>
    screenshots.filter((s) => s.included && s.taskId === taskId);

  const renderShots = (taskId: TaskId) => {
    const items = shotsForTask(taskId);
    if (items.length === 0) return '';
    return (
      '\n' +
      items
        .map(
          (s) =>
            `![${s.title}](${getScreenshotPath(s, config)})\n*${s.caption}*`
        )
        .join('\n\n') +
      '\n'
    );
  };

  const cleanupBlock = config.includeCleanupSection
    ? `
## Task 6: Clean Up Resources

To avoid incurring ongoing Artifact Registry storage charges after finishing the lab, remove the container image and Cloud Run service:

\`\`\`bash
# Delete the container image from Artifact Registry
gcloud artifacts docker images delete $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld

# Delete the Cloud Run service
gcloud run services delete helloworld --region=$LOCATION
\`\`\`
${renderShots('task-6')}`
    : '';

  const troubleshootingBlock = config.includeTroubleshootingNote
    ? `
## Troubleshooting Notes

- **401 Invalid Credentials during \`gcloud builds submit\`**: If Cloud Shell loses connection or temporary lab credentials expire mid-session, refresh the browser or re-run \`gcloud auth list\` / reconnect Cloud Shell before retrying \`gcloud builds submit\`.
- **Docker Base Image**: \`node:22-slim\` was used in the \`Dockerfile\` for a compact Node.js production image.
`
    : '';

  return `# Hello Cloud Run — Containerized Node.js Deployment on Google Cloud

Lab walkthrough and reference implementation for building a stateless Express.js application, containerizing it with Docker and Cloud Build, storing the image in Artifact Registry, and deploying it to **Google Cloud Run**.

## Lab Summary

| Item | Value |
| :--- | :--- |
| **Platform** | Google Cloud Run & Artifact Registry |
| **Runtime** | Node.js (\`node:22-slim\`) + Express \`^4.17.1\` |
| **Region** | \`${config.region}\` |
| **Project ID (Lab)** | \`${config.projectId}\` |
| **Artifact Registry Repo** | \`my-repository\` |
| **Deployed Service URL** | \`${config.serviceUrl}\` |

## Objectives

1. Enable the Cloud Run and Artifact Registry APIs.
2. Create a stateless Node.js HTTP service using Express.
3. Create a Docker repository in Artifact Registry and configure Docker auth.
4. Containerize the app with a \`Dockerfile\` and build/push it with Cloud Build.
5. Verify the container locally via Cloud Shell Web Preview and deploy to Cloud Run.
6. Clean up container images and Cloud Run services after verification.

## Repository Structure

\`\`\`text
.
├── Dockerfile
├── index.js
├── package.json
├── .gitignore
├── README.md
└── ${folder}/
    └── ...
\`\`\`

---

## Setup: Verify Cloud Shell Authentication & Project

Confirm the active account and target Google Cloud project inside Cloud Shell:

\`\`\`bash
gcloud auth list
gcloud config list project
\`\`\`
${renderShots('setup')}
---

## Task 1: Enable APIs & Configure Region

Enable the Cloud Run and Artifact Registry APIs and set the compute region:

\`\`\`bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com
gcloud config set compute/region "${config.region}"
LOCATION="${config.region}"
\`\`\`
${renderShots('task-1')}
---

## Task 2: Write the Sample Node.js Application

Create the \`helloworld\` directory along with \`package.json\` and \`index.js\`:

\`\`\`bash
mkdir helloworld && cd helloworld
\`\`\`

\`\`\`json
{
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
}
\`\`\`

\`\`\`javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(\`Hello \${name}!\`);
});

app.listen(port, () => {
  console.log(\`helloworld: listening on port \${port}\`);
});
\`\`\`
${renderShots('task-2')}
---

## Task 3: Create an Artifact Registry Repository

Create the Docker repository \`my-repository\` in \`$LOCATION\` and configure Docker authentication:

\`\`\`bash
gcloud artifacts repositories create my-repository \\
  --repository-format=docker \\
  --location=$LOCATION \\
  --description="Docker repository"

gcloud auth configure-docker $LOCATION-docker.pkg.dev
\`\`\`
${renderShots('task-3')}
---

## Task 4: Containerize the App & Build with Cloud Build

Create the \`Dockerfile\` using \`node:22-slim\`:

\`\`\`dockerfile
FROM node:22-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . ./
CMD [ "npm", "start" ]
\`\`\`

Build and push the image to Artifact Registry, then verify locally on port \`8080\`:

\`\`\`bash
gcloud builds submit --tag $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld

docker run -d -p 8080:8080 $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld
\`\`\`
${renderShots('task-4')}
---

## Task 5: Deploy to Cloud Run

Deploy the container image from Artifact Registry as a publicly accessible Cloud Run service:

\`\`\`bash
gcloud run deploy helloworld \\
  --image $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld \\
  --allow-unauthenticated \\
  --region=$LOCATION
\`\`\`

Verified live endpoint: \`${config.serviceUrl}\` returning \`Hello World!\`.
${renderShots('task-5')}${cleanupBlock ? '---\n' + cleanupBlock : ''}${troubleshootingBlock ? '---\n' + troubleshootingBlock : ''}
`;
}
