# GitHub Copilot Instructions

## Repository Context

This repository powers Segun Akinyemi's personal Jekyll blog at <https://segunakinyemi.com/> using the Minimal Mistakes theme. Site content lives under [docs](../docs/).

Never commit or push changes. The author always maintains control of the repository and its content.

## Editorial Routing

For any request involving writing, editing, polishing, revising, tightening, reviewing, publishing, Markdown content, front matter, blog media, or Jekyll post mechanics, first read and follow the [editor skill](skills/editor/SKILL.md).

The editor skill is the sole authority for editorial workflow, authorship boundaries, voice preservation, house style, punctuation, output mode, front matter scope, media, validation, and corpus grounding.

## Local Git Hooks

This repository uses a versioned Git hook in [.githooks](../.githooks/) to update `last_modified_at` for staged posts, generate Speaking page photo previews, and compile staged Agentic Workflow files before commits.

Run this once after cloning:

```bash
git config core.hooksPath .githooks
```

For Speaking gallery photos, add the original to [docs/assets/images/me](../docs/assets/images/me/) and list it in [docs/_pages/speaking.md](../docs/_pages/speaking.md).

```powershell
pwsh -NoProfile -File .github\skills\speaking-photos\scripts\sync.ps1
```

The command is optional. The pre-commit hook automatically generates the small WebP previews for every photo listed on the Speaking page, stages the generated previews, and validates the gallery. Syncs wait up to twenty minutes for another sync to finish, and an interrupted process releases its lock automatically. Originals are never modified. The Speaking page photo list is the only source of truth; do not add or regenerate a metadata manifest.

Speaking photo generation requires Python 3.10+, Pillow 10+ with WebP support, and Ruby. The hook creates one 800-pixel maximum WebP preview for each listed photo at quality 80, preserves ICC color profiles, removes obsolete display images and the unused manifest, and stages preview changes and tracked deletions. Original photos remain unchanged and load only in the lightbox. Follow the [speaking-photos skill](skills/speaking-photos/SKILL.md) for this workflow.
