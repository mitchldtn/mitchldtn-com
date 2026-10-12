---
title: I don't want a smarter coding agent. I want one that consistently follows how I work.
description: "Consistency goes further than cleverness: how session context in Markdown turned into a workflow my agents follow."
date: 2026-10-12
type: post
topics: [workflows, building-nemonik]
draft: false
---

What I needed was for my agent to do the same steps the same way every session. This is how I got there, starting with a folder of Markdown files.

## Context in Markdown

I started saving session context in `.md` files. I kept a context template in CLAUDE.md. At the end of each session I'd tell the agent to write the summary `.md` file and it saved it to a summaries folder. Every file had the same sections, so they were easy to compare later. A trimmed version:

```markdown
## Task
One or two sentences: the goal of the work, not the implementation.

## Changes Made
The concrete changes, one bullet each.

## Files Modified
Every file: path, the lines changed and a one-line description.

## Tests Run
Every command you ran with its result. Never claim a pass you didn't run.

## Downstream Effects
Callers, services, jobs or data this change affects.

## Potential Issues
Risks worth recording, even if acceptable now.

## Follow-Up Recommendations
Next steps this change surfaced but didn't do.
```

In a later session I'd tell the agent to look over the summaries for whatever I needed and it would grep the folder for past decisions and context. It worked well. When I was debugging, or picking up work I'd left a week earlier or needed to readdress, the agent could find why we took a path and I didn't have to write up the context for it myself.

## More context, worse answers

It worked until there were a lot of context files. The more files there were, the more keywords matched. A search for one decision pulled in context from three unrelated ones. The agent read all of it and what it got was less relevant, not more.

## The agent stopped listening

The other problem was the agent itself. My workflow was in the system prompt/CLAUDE.md and in skills. I even added a hook that attached the whole workflow to every message I sent. It started with "This is your workflow. Follow it in order." and listed every step: orient, plan, build, verify, push and debrief. Some sessions it skipped writing the context. Some sessions it skipped steps. When I caught it, it told me "You're absolutely right!", said it had made a judgement call and did it again the next session.

## What I tried

I went through what most people do. I started over in a new session and let the agent work it out again. I patched it: a bigger instruction file, more context files, summaries pasted into the next session. Each fix added more for the agent to read, so it followed less of it.

What worked was building it into the workflow: give each step its own setup and carry what was learned into the next session.

## Launching the workflow, not just the agent

So I built a CLI that launches the agent with the workflow already in place. A kit holds one step: a system prompt, skills, MCP servers and hooks, tied together by a workflow. The workflow goes into the system prompt and/or the first message, so the agent starts every session with the steps in front of it. I use both. That's what I found works best.

```bash
nk run mitchldtn/sdd:plan --new "lets start work on ticket-123"
```

## Plan, build, review

Then I split my workflow into kits. Planning gets what planning needs. Building gets what building needs. Review runs in its own session, so it reads the change cold. I run the plan kit myself. Once I approve the plan, the build kit opens in a new session on its own. When it's done it runs the review kit.

## Moving context to the MCP server

The workflow fixed the agent skipping steps. It didn't fix the search. The context still lived in a folder on my laptop and every new file gave grep more words to match. Ask about one decision and the agent pulled in three that had nothing to do with it.

So I moved the context to an MCP server and put text embeddings behind the search. The agent now finds context by what it means, not by which words happen to overlap. The running memory, journal and status for each project live there too.

Two things came with it that I didn't plan for. The context isn't tied to my laptop anymore: I use the MCP from Claude/GPT on my phone to research and write up tickets when I'm on a walk and an idea comes to mind. For a team, everyone reads the same context the moment it's written, with no commit, push and pull in between.

The rest of my setup moved there too. Kits, prompts, skills, MCP servers and hooks all live on the MCP server. A prompt can be a kit's system prompt or a template, like my PR and context templates. The workflow pulls the templates at the end of every task, so the PR and the context get written the same way every time, without me asking.

Having it all in one place also changed how often I touch it. In `.md` files my setup was out of sight, so it rarely changed. The web app shows a kit's whole setup at once, which makes it easy to see and tweak a prompt or a workflow.

## Their skills, my workflow

Along the way I kept finding workflows that were better than mine at one thing. The first came from a friend: when I talked through all this with them, they pointed me to [michi](https://github.com/csepulv/michi). It does a lot right: planning that surfaces assumptions and designs verification scenarios before any code, a rigid session that tests after every change and logs each decision, no "done" without full verification, a second look from a separate session and a debrief that keeps a running memory for the next one.

Someone at work brought up [OpenSpec](https://github.com/Fission-AI/OpenSpec) recently. It gave me ideas for what I could borrow from it: living specs that say how the system behaves now and one folder per change.

Adopting either one meant working their way from start to finish. I wanted their best parts in the order I already work. That's what my sdd kits are: michi's discipline and OpenSpec's structure, inside my workflow. I didn't change how I work to fit their tools. Their skills fit into mine.

## Try it without nemonik

You don't need my tools to start. Most of this works with what's already out there:

1. Pick a workflow whose skills already know where context lives. michi keeps plans, a journal and memory under `docs/`. OpenSpec keeps specs and one folder per change under `openspec/`.
2. Run each step in its own session: plan, then build, then review.
3. Start each session by pasting that step's workflow as your first message, so it's in front of the agent from the first turn.
4. End each task by having the agent write what it did and why to that same place, so the next session finds it.

That gets you the steps. It doesn't give each step its own setup. By hand, every session loads the same CLAUDE.md, the same skills and every MCP server you have switched on, so planning carries everything building needs and review carries all of it too. It's the same problem I started with: one setup for everything, always growing. The bigger it got, the less consistently the agent followed it.

A kit is what changes that. One command starts Claude Code or Codex with that step's own system prompt, skills, MCP servers, hooks and workflow. When the step is done, the next kit starts with its own. I haven't found another tool that switches the whole setup like that.

## Limits

A workflow only covers what's in it. Inside a step, the agent follows it. Outside one, it still makes its own calls.

A few other things worth knowing:

- Codex doesn't get everything a kit can do yet: hooks aren't applied and a kit can't switch off Codex's other MCP servers.
- More kits means more setup to keep up. Having it all in the web app makes that easier.

## Where it is now

That CLI and MCP server are nemonik. The CLI launches Claude Code or Codex with a kit in place. The MCP server holds the context, memory and templates. I use it every day.
