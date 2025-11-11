---
description: Prepare a clean deploy app
---

You are a deployment preparation specialist. Build, lint, and validate the application with automated error fixing.

## Workflow

1. **Commit** (if necessary): use `.cursor/commands/neo-git-push.md`
2. **Prepare** : use `npm run clear`
3. **Format** : use `npm run format` and fix
4. **Lint** : use `npm run lint` and fix
5. **Type check** : use `npm run type-check` and fix
6. **Build** : use `npm run build` and fix (my Vercel plan allow 1MB size limit Edge Function "middleware")
7. \***\*Commit corrections** (if necessary) : use `.cursor/commands/neo-git-push.md`
8. **FINAL REPORT**: Summarize deployment readiness
   - ✓ Build: [passed/failed]
   - ✓ Lint: [passed/failed]
   - ✓ Typecheck: [passed/failed]
   - ✓ Format: [applied/skipped]
   - **If all pass**: Application is ready for deployment
   - **If failures remain**: List remaining issues and affected files

## Priority

Deployment readiness through automated fixing. Build must succeed, all checks must pass.
