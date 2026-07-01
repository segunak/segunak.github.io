---
name: site-tags
description: "Use when listing, discovering, auditing, choosing, or updating current tag values for Segun Akinyemi's Jekyll blog. Scans local docs/_posts front matter and returns a unique sorted list of all tags used on the site. Use before editing tags in post front matter or suggesting tag values."
argument-hint: "[optional posts path]"
---

# Site Tags

Use this skill to get the current set of tag values from the local Jekyll posts corpus. Do not rely on memory, stale examples, or hardcoded tag lists when the task is to choose, audit, or update tags.

## Procedure

1. Run the bundled PowerShell scanner from the repository root.
2. Return the unique sorted tag list to the user or to the calling editing workflow.
3. If a draft needs a tag that is not in the list, say that it would be a new site tag before using it.

PowerShell command:

```powershell
powershell -NoProfile -File .\.github\skills\site-tags\scripts\list-post-tags.ps1 -Markdown
```

If PowerShell blocks local scripts on a new machine, configure script execution once for the current user instead of passing `-ExecutionPolicy Bypass` every time:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

To scan a different posts folder, pass `-PostsPath`:

```powershell
powershell -NoProfile -File .\.github\skills\site-tags\scripts\list-post-tags.ps1 -PostsPath .\docs\_posts -Markdown
```

The scanner is [list-post-tags.ps1](./scripts/list-post-tags.ps1). It reads only local Markdown files under `docs/_posts`, looks only at YAML front matter, and emits one unique tag per line, or a Markdown bullet list when `-Markdown` is used.