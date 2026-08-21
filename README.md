# Read Me

Personal website hosted at <https://segunakinyemi.com>.

## How This Works

This repo is named `segunak.github.io`, which makes it a [GitHub Pages user site](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites). User sites must be named `<username>.github.io`.

The [docs/CNAME](docs/CNAME) file contains `segunakinyemi.com`, which tells GitHub Pages to serve this site at my custom domain. DNS records in [Squarespace](https://www.squarespace.com/) (where I bought and host the domain) point `segunakinyemi.com` to GitHub's servers.

Because this user site has a custom domain, [all my other GitHub Pages project sites automatically inherit it](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages#using-a-custom-domain-across-multiple-repositories). Any repo with GitHub Pages enabled appears at `segunakinyemi.com/<repo-name>` without additional configuration.

For example:

- <https://segunakinyemi.com/stem-education>
- <https://segunakinyemi.com/ai-interview-workshop>

No CNAME files or custom domain settings needed in those repos.

## Local Git Hooks

This repository uses a versioned Git hook in [.githooks](.githooks/) to update `last_modified_at` for staged posts, generate Speaking page photo derivatives and data, and compile staged Agentic Workflow files before commits.

Run this once after cloning:

```bash
git config core.hooksPath .githooks
```
