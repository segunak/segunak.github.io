---
title: "How To Stop GitHub Copilot in VS Code From Asking You To Approve Every URL It Visits"
excerpt: "Add chat.tools.urls.autoApprove to your VS Code settings.json to stop GitHub Copilot from prompting you to approve every URL it visits."
last_modified_at: 2026-08-03T16:11:26
toc: true
toc_sticky: true
toc_label: "On This Page"
header:
  teaser: /assets/images/github-copilot.png
categories:
  - blog
tags:
  - tech
---


## The Fix

[GitHub Copilot](https://docs.github.com/en/copilot/get-started/what-is-github-copilot) in [VS Code](https://code.visualstudio.com/) has a built-in tool called `web` (or `fetch` in some contexts) that pulls stuff from websites. The agent uses it on its own whenever it decides to research something online, and you can also trigger it explicitly by typing `#fetch <URL>` in a prompt.

Either way, by default VS Code prompts you to approve every single URL. Add this to your [`settings.json`](https://code.visualstudio.com/docs/getstarted/settings) to auto-approve all of them:

```json
"chat.tools.urls.autoApprove": {
    "https://*": true,
    "http://*": true
}
```

The `https://*` pattern wildcards every HTTPS domain, and `http://*` does the same for HTTP. Setting the value to `true` auto-approves both the request and the response. No more confirmation dialogs. No more interruptions.

## Some Background

The official VS Code documentation covers URL approval in detail, including how the two-step approval process works and how to configure per-domain rules. You can read all about it in the [Use tools with agents](https://code.visualstudio.com/docs/copilot/agents/agent-tools#_url-approval) docs, and the setting itself is listed in the [GitHub Copilot settings reference](https://code.visualstudio.com/docs/copilot/reference/copilot-settings#_agent-settings). What I'm showing you above is how to skip all of that and approve everything.

To be clear, this is not the same as [auto-approving all tools](https://code.visualstudio.com/docs/copilot/agents/agent-tools#_enable-or-disable-tool-auto-approval-experimental). VS Code has a separate setting called `chat.tools.global.autoApprove` that disables approval prompts for every tool, including ones that write files, run terminal commands, and modify your environment.

That's the [YOLO](https://www.google.com/search?q=what+does+yolo+mean) nuclear option. What I'm recommending here is much more targeted. `chat.tools.urls.autoApprove` only affects URL requests made by the `web` (a.k.a. `fetch`) tool. It lets GitHub Copilot read web pages without asking, while still requiring your approval for everything else.

If you'd rather be more selective about which domains get auto-approved, you can specify them individually:

```json
"chat.tools.urls.autoApprove": {
    "https://learn.microsoft.com": true,
    "https://*.github.com": true,
    "https://stackoverflow.com": true
}
```

Here's the full description of the setting from VS Code's hover tooltip:

> Controls which URLs are automatically approved when requested by chat tools. Keys are URL patterns and values can be `true` to approve both requests and responses, `false` to deny, or an object with `approveRequest` and `approveResponse` properties for granular control.
>
> - `"https://example.com": true` — Approve all requests to example.com
> - `"https://*.example.com": true` — Approve all requests to any subdomain of example.com
> - `"https://example.com/api/*": { "approveRequest": true, "approveResponse": false }` — Approve requests but not responses for example.com/api paths

## How To Open settings.json

If you're not sure how to get to `settings.json`, open the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) with `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac), then type `Preferences: Open User Settings (JSON)` and select it. That opens the raw JSON file where your VS Code settings live. For more on how VS Code settings work, check the [official docs](https://code.visualstudio.com/docs/getstarted/settings).

## Final Thoughts

I have a [custom agent](https://code.visualstudio.com/docs/copilot/customization/custom-agents) that does research for [Charlotte Third Places](https://www.charlottethirdplaces.com/), a project where [I catalog spots you can hang out and chill around Charlotte, NC](https://segunakinyemi.com/blog/charlotte-third-places-observer-article/).

The agent's entire job is to visit URLs and gather information about places. You can check it out [on GitHub](https://github.com/segunak/charlotte-third-places/blob/master/.github/agents/places-researcher.md) if you're curious. When I run it as a [background agent](https://code.visualstudio.com/docs/copilot/agents/background-agents) or [cloud agent](https://code.visualstudio.com/docs/copilot/agents/cloud-agents), it visits whatever URLs it deems necessary without issue. But when running it locally in chat, it stops to ask me about every single one. This agent needs to hit a lot of URLs. That's its whole purpose. Stopping to approve each one defeats the point.

I appreciate VS Code erring on the side of caution though. Secure by default is the right call, and the fact that they expose a setting to control this is excellent design. Locked down out of the box, but configurable for people who want to loosen the reins. If something goes wrong, that's on you. That's how it should work.

That said, I do value being able to let it browse freely, loosen the parental controls a bit. I also use [GitHub Copilot in Plan mode](https://code.visualstudio.com/docs/copilot/agents/planning) a lot, where I ask it to research things online and cite its sources. It's not changing my code, it's reading web pages. If you're already trusting GitHub Copilot to help you write code, letting it read public web pages without a permission slip feels pretty reasonable.
