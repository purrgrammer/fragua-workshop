# Agentic workflows

A 45-minute internal workshop on agentic workflows, and the fragua workflows it is built around.

**Slides:** https://purrgrammer.github.io/fragua-workshop/s/agentic-workflows

The thesis: recurring processes live scattered and inert, in docs, threads and heads. Write them down as something that runs: shared, versioned workflows where tools do the deterministic parts, LLMs do bounded judgement, and people own the decisions that matter. The deck builds that intuition with two examples that evolve one step at a time, building a change and reviewing a change, and names the pattern as each one appears.

## What is in here

| Path | What |
|---|---|
| `slides/agentic-workflows/` | The deck, as [open-slide](https://github.com/open-slide/open-slide) pages. Speaker notes live in the `notes` export. |
| `slides/agentic-workflows/assets/` | The illustrations and the two final workflow graphs. |
| `themes/fragua.md` | The theme: fragua's diagram palette, Geist / Geist Mono. |
| `.fragua/workflows/` | Every version of both examples, plus fragua's production `work` and `review`. |
| `.fragua/scripts/review/` | Shell helpers the production `review` workflow calls. |

## Run the slides

```sh
bun install
bun dev          # http://localhost:5173/s/agentic-workflows
```

`P` opens the presenter view with notes, `F` goes fullscreen. Pushing to `main` redeploys the site through GitHub Pages.

## Run the workflows

You need [fragua](https://github.com/purrgrammer/fragua) installed, a provider credentialed, and the harness running. Judge steps also need the `typesafe` provider.

```sh
curl -fsSL https://raw.githubusercontent.com/purrgrammer/fragua/main/install.sh | sh
fragua providers add             # the model provider
fragua providers add typesafe    # judges
fragua harness                   # daemon + web UI on :6767
```

Workflows resolve by name from `.fragua/workflows/` in the directory you run from, so clone this repo next to the code you want to act on, or copy the YAML into that repo's `.fragua/workflows/`. The review workflows shell out to `gh pr diff`, so run them inside a checkout of the repo that owns the PR.

Example A, build a change. Five versions, each adding one step to the one before:

| Workflow | Adds | Run |
|---|---|---|
| `a1-work` | one agent | `fragua run a1-work --input task="…"` |
| `a2-work` | plan, then build, then format and CI as tools | `fragua run a2-work --input task="…"` |
| `a3-work` | a judge triages: small, feature, bugfix | `fragua run a3-work --input task="…"` |
| `a4-work` | a reviewer that sends work back, a CI fix loop, both bounded | `fragua run a4-work --input task="…"` |
| `a5-work` | implement fans out one worker per package through the `agent` tool | `fragua run a5-work --input task="…"` |

Example B, review a change:

| Workflow | Adds | Run |
|---|---|---|
| `b1-review` | one agent | `fragua run b1-review --input pr=123` |
| `b2-review` | a tool packs the diff; the model only reads | `fragua run b2-review --input pr=123` |
| `b3-review` | a judge sizes the change: skip, quick, full | `fragua run b3-review --input pr=123` |
| `b4-review` | two parallel lenses, a verifying judge per finding, one synthesis | `fragua run b4-review --input pr=123` |
| `b5-review` | a human signs off before anything is posted | `fragua run b5-review --input pr=123` |

`b5-review` pauses at `signoff`. Answer it from the web UI, or with `fragua runs respond <run-id>`.

`work` and `review` are fragua's own production workflows, included as the reference the examples grow towards. `hello-world` is the smoke test.

Each file starts with a comment that explains the version's one idea. Read them in order.
