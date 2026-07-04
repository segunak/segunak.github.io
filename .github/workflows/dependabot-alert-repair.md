---
name: Dependabot Alert Repair
on:
  schedule:
    # Sunday at 2 PM ET during daylight saving time, 18:00 UTC.
    - cron: "0 18 * * 0"
    # Sunday at 2 PM ET during standard time, 19:00 UTC.
    # The America/New_York gate below skips whichever UTC run is not currently 2 PM ET.
    - cron: "0 19 * * 0"
  workflow_dispatch:
    inputs:
      aw_context:
        default: "{}"
        description: "Agent caller context (used internally by Agentic Workflows)."
        required: false
        type: string
permissions:
  contents: read
  pull-requests: read
  security-events: read
  vulnerability-alerts: read
timeout-minutes: 90
engine: copilot
tools:
  github:
    toolsets: [dependabot, repos, pull_requests]
  bash:
    - "bundle:*"
    - "curl:*"
    - "gem:*"
    - "gh:*"
    - "git:*"
    - "go:*"
    - "npm:*"
    - "npx:*"
    - "pip:*"
    - "pip3:*"
    - "pnpm:*"
    - "python:*"
    - "python3:*"
    - "ruby:*"
    - "yarn:*"
network:
  allowed: [defaults, github, go, node, python, ruby]
safe-outputs:
  create-pull-request:
    title-prefix: "[dependabot-alert-repair] "
    labels: [dependencies, security]
    allowed-base-branches: [master]
    max: 1
    max-patch-files: 50
    max-patch-size: 4096
    protected-files: request_review
    preserve-branch-name: true
    recreate-ref: true
  noop:
    max: 1
    report-as-issue: false
---

# Dependabot Alert Repair

You are maintaining `segunak/segunak.github.io`, Segun Akinyemi's Jekyll blog repository.

## Mission

Look at every open Dependabot alert in this repository and try to resolve all of them in one focused pull request.

Do not limit yourself to RubyGems alerts. RubyGems in `docs/Gemfile.lock` are expected to be common and easy here, but the workflow exists so you can reason through any Dependabot ecosystem GitHub reports.

## Schedule Gate

This workflow has two UTC cron entries so it can represent Sunday at 2 PM in New York across daylight saving time and standard time.

If this is a scheduled run, first check the current New York time:

```bash
TZ=America/New_York date +%u-%H
```

Only continue when the output is `7-14`, meaning Sunday at 2 PM in America/New_York. If it is any other value, stop with a no-op summary.

Manual `workflow_dispatch` runs should skip this time gate and continue immediately.

## Alert Inventory

Use the GitHub Dependabot tools or `gh api` to read all open Dependabot alerts for this repository.

If there are no open Dependabot alerts, stop with a no-op summary. Do not edit files and do not open a pull request.

If there are open alerts, inventory all of them before making changes. Record:

- alert number
- severity
- ecosystem
- package name
- manifest path
- vulnerable range
- first patched version
- advisory summary

## Repair Strategy

Fix the root dependency issue for every open alert you can resolve safely.

Use the package manager and manifest that belong to each alert. Examples:

- For Bundler alerts under `docs/Gemfile.lock`, work from `docs` and use targeted `bundle update <package names>`.
- For npm alerts, update the relevant `package.json` or lockfile with npm, pnpm, or yarn according to the files already present.
- For Python alerts, update the relevant requirements or lock file with the package manager already used by the repository.
- For Go alerts, update the relevant module files with `go get` or `go mod tidy` as appropriate.
- For GitHub Actions alerts, update only the affected workflow action reference, preserving the existing workflow style.

Prefer the smallest dependency update set that clears the alerts. Do not do broad upgrades unless the package manager cannot resolve the patched versions otherwise.

## Safety Rules

- Do not push to `master`.
- Do not commit secrets or print token values.
- Do not change blog content unless a dependency repair truly requires it.
- Do not delete tests or validation steps to make the repair pass.
- If an alert cannot be repaired safely, stop without opening a partial or risky PR. Use the safe output `noop` to summarize what blocked the repair.
- If you can repair only some alerts, prefer `noop` over a partial PR unless the unrepaired alerts are clearly unrelated and documented.

## Required Validation

Before requesting a pull request, prove the Jekyll site still works:

```bash
cd docs
bundle check
JEKYLL_ENV=production bundle exec jekyll build
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --no-watch
curl --fail --silent --show-error http://127.0.0.1:4000/
```

Run the serve command in the background, stop it after the curl succeeds or fails, and include the result in your pull request body.

If the dependency ecosystem you changed has its own lockfile or package-manager validation, run that too.

## Pull Request Requirements

Open one pull request against `master` only after validation passes.

Use a branch name like:

```text
automation/dependabot-alert-repair
```

The pull request body must include:

- a table of all Dependabot alerts found
- what packages or action references were changed
- which alerts the change is expected to close
- the exact validation commands and whether each passed
- any risks or manual review notes

Use the safe output `create-pull-request` tool for the PR. Dependency manifests and workflow files are protected files, so the PR may include a protected-files review marker. That is fine because the whole point is for Segun to approve the dependency repair after the checks pass.
