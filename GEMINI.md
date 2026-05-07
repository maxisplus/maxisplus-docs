# Project Instructions: Maxis Docs

This project is a static proxy architecture used to host documentation and proposals. It deploys static HTML files to a CDN via Surge.

## Architectural Mandates

1.  **Deployment Workflow:**
    -   The deployment command is: `surge . docs.maxis.plus`
    -   If `surge` is not available in the environment, use: `npx surge . docs.maxis.plus`
    -   **Pre-deployment Checklist:** Agents MUST NOT deploy until they have verified the following with the user:
        -   The file name is descriptive and appropriate.
        -   HTML file names MUST use kebab-case only (lowercase letters, numbers, and hyphens) and end in `.html` (e.g., `quarterly-report.html`).
        -   HTML file names MUST NOT contain spaces or uppercase letters.
        -   The file is located in the correct project-specific subdirectory (e.g., `/fleway/`, `/clop/`).
        -   All assets are properly organized (see Asset Management).
    -   **Post-deployment:** After a successful deployment, agents MUST commit and push the changes to the remote repository (`origin`) to ensure the source code is up to date.

2.  **Asset Management:**
    -   **No Base64:** Embedding images or assets as base64 strings is STRICTLY FORBIDDEN.
    -   **Organization:** All assets for a specific document must be stored in a subdirectory named `report-assets` within the project's folder (e.g., `/fleway/report-assets/`).
    -   **References:** Always use relative paths to reference assets from the HTML files.

3.  **Source Control & Safety:**
    -   **CNAME Protection:** Agents are FORBIDDEN from editing the `CNAME` file. This is a critical system file for the Surge deployment.
    -   **Project Folders:** Always ensure new documents are placed in the relevant project directory. Do not clutter the root directory.

## Deployment Command Summary
```bash
npx surge . docs.maxis.plus
```
