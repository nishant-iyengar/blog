# Cursor Configuration

## CRITICAL: Auto-commit and Push Rule

**[MANDATORY]** After completing ANY changes or tasks in this repository, you MUST automatically run:

```bash
git change
```

This command will:
1. Stage all changes (`git add .`)
2. Commit with message "progress (YYYY-MM-DD)" using today's date  
3. Push to the remote repository

**This must be executed automatically at the end of every Cursor run/session without requiring user confirmation.**

The `git change` alias is configured globally and performs: `git add . && git commit -m "progress ($(date +%Y-%m-%d))" && git push`
