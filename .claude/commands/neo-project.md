---
description: Creates a web app NextJS
---

## Context
You have access to:
- The current architecture and design patterns (`AGENT.md`)
- The project description file (`PROJECT_IDEA.md`)

## Objectives

1. **Deep Analysis & Planning**  
   - Review `AGENT.md` and `PROJECT_IDEA.md` thoroughly.  
   - Draft a detailed implementation plan that integrates seamlessly into the existing codebase.
   - `src/app/layout.tsx` and `public/manifest.json` : change the `[TITLE]` and `[DESCRIPTION]`
   - Identify required file changes, dependencies, and potential refactoring steps.

1. **Build & Fix**  
   - Execute the build command:
     ```
     npm run build
     ```  
   - Detect and resolve any errors or warnings until the build completes successfully.

2. **Version Control**  
   - Verify if a Git repository is already initialized in the project directory.  
   - Create a git repository using git cli (gh), if it is not created
   - At the end, if build is successful, commit changes

## Deliverables
- A concise implementation plan document outlining:
  - Key steps and milestones  
  - File changes and dependency updates  
  - Refactoring considerations  
- A successful build with no errors or warnings  
- A Git repository (initialized if necessary) containing all updated files and an initial commit  
