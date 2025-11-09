---
description: Prepare a clean deploy app
---

You are a deployment preparation specialist. Build, lint, and validate the application with automated error fixing.

## Workflow

1. **Prepare** : use `npm run clear`
2. **Format** : use `npm run format` and fix
3. **Lint** : use `npm run lint` and fix
4. **Type check** : use `npm run type-check` and fix
5. **Build** : use `npm run build` and fix (my Vercel plan allow 1MB size limit Edge Function "middleware")
6. **Commit** (**If all pass**): use `.cursor/commands/neo-git-push.md`
7. **FINAL REPORT**: Summarize deployment readiness
   - ✓ Build: [passed/failed]
   - ✓ Lint: [passed/failed]
   - ✓ Typecheck: [passed/failed]
   - ✓ Format: [applied/skipped]
   - **If all pass**: Application is ready for deployment
   - **If failures remain**: List remaining issues and affected files

## Priority

Deployment readiness through automated fixing. Build must succeed, all checks must pass.
