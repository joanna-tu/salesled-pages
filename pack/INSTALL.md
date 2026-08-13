# Account X-ray - the guide

The easiest way is to send one message to the AI you already use. If your AI can't open links that day, paste the kit instead. If you'll use it every week, five minutes installs it for good. That's the whole setup.

## Way one: send one message

Paste this into ChatGPT, Claude, whatever you use:

`Prep me for a first call: I work at [your company], I'm meeting [person] at [account]. xray.joannatu.com/full`

If your AI can't open the link (Gemini, some days), use way two.

## Way two: paste the kit

Two pastes: the whole kit into a chat with web search on, then this line:

`Prep me for a first call: I work at [your company], I'm meeting [person] at [account].`

## Way three: install it once

Five minutes, in a Claude Project, a ChatGPT project, a custom GPT, or a Gemini Gem. Same three steps everywhere:

1. Paste `files/engine.md` into the instructions box, and fill in your company. If the box says it's too long, paste `files/engine-short.md` instead. Same method, written to fit.
2. Add `files/01` to `files/10` as knowledge. That's ten files, which is exactly what the strictest tool allows.
3. Before each meeting, type: `Prep me for a first call: I'm meeting [person] at [account]`.

## Custom GPT or Gemini Gem

Two things worth knowing before you set one up.

The instructions box is the part your AI always reads. Knowledge files are searched, and only the pieces that look relevant to the question come back. So the engine goes in the box, where every run sees all of it, and the numbered files go in knowledge, where they're pulled in as each section gets built. That's why `files/engine-short.md` exists: a custom GPT and a ChatGPT project both stop at 8,000 characters, and the full engine is nearly twice that.

A Gemini Gem takes ten knowledge files. With the engine in the instructions box, the numbered files are exactly ten, so nothing gets left behind.

If your tool takes fewer than ten files (a ChatGPT project on the free plan stops at five), add `account-xray-v7.9-page.md` as a single knowledge file instead of the ten. The whole method is inside it.

## Before you walk in

Every AI makes things up sometimes. The better your AI, the fewer you'll find. Cross-check every line you'll say out loud.

It can't read anything behind a login or a paywall.

## Found something wrong?

Tell me: xray@joannatu.com. Every reply shapes the next version. Updates land on salesled.substack.com first.

Account X-ray, version 7.9, 13 August 2026. CC BY 4.0. Made by Joanna Turczynska.
