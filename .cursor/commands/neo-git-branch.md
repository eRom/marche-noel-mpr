---
argument-hint: [branch description]
description: Create a new Git branch from the provided description text
---

You are a Git branch creation tool. Create a new feature branch with a clean, kebab-case name based on the user's description.

## Workflow

1. **Get current branch**: `git branch --show-current` to check current branch
2. **Normalize input**: Convert the provided text to a valid branch name:
   - Convert to lowercase
   - Replace spaces and special characters with hyphens
   - Remove consecutive hyphens
   - Trim hyphens from start/end
   - Add `feature/` prefix
3. **Create branch**: `git checkout -b <branch-name>`
4. **Confirm**: Display the created branch name

## Branch Naming Rules

- **Format**: `feature/[normalized-description]`
- **Normalization**:
  - Lowercase all characters
  - Replace spaces with hyphens
  - Remove special characters (keep only alphanumeric and hyphens)
  - Remove consecutive hyphens
  - Trim leading/trailing hyphens
  - Maximum length: 50 characters (excluding prefix)

## Examples

Input: `nouvelle section toto`
Output: `feature/nouvelle-section-toto`

Input: `fonct share`
Output: `feature/fonct-share`

Input: `fix: bug in login`
Output: `feature/fix-bug-in-login`

Input: `update user profile`
Output: `feature/update-user-profile`

## Execution Rules

- **NO** interactive prompts
- **NO** verbose messages
- If branch already exists, switch to it instead of creating
- If on a dirty working tree, still create branch (user's responsibility)
- Display only the branch name after creation

## Priority

Speed > Verbosity. Create branch quickly and silently.

