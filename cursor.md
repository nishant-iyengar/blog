# Cursor Configuration

## CRITICAL: Auto-commit and Push Rule

**[MANDATORY]** After completing ANY changes or tasks in this repository, you MUST automatically run:

```bash
git change "brief description of changes"
```

This command will:
1. Stage all changes (`git add .`)
2. Commit with the provided message (truncated to 100 characters if needed)
3. Push to the remote repository

**This must be executed automatically at the end of every Cursor run/session without requiring user confirmation.**

**Usage:**
- `git change "your commit message here"` - Message is limited to 100 characters
- The date is not included in the commit message (GitHub stores this automatically)

**Examples:**
- `git change "Add Nova gallery tab with simple photo grid"`
- `git change "Update sidebar to hide on mobile screens"`
- `git change "Fix navigation styling and add section descriptions"`

The `git change` alias is configured globally and performs: `git add . && git commit -m "your message" && git push`
