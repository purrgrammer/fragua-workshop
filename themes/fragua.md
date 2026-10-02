---
name: Fragua
description: Paper-light, monospace-voiced, hairline-bordered. The palette of the fragua workflow diagrams.
mode: light
---

# Fragua

## Palette

| Role     | Value                   | Notes                                                        |
| -------- | ----------------------- | ------------------------------------------------------------ |
| bg       | `#f8f8f8`               | page background, near-paper                                  |
| surface  | `#ffffff`               | node boxes, cards                                            |
| text     | `#121212`               | primary copy, node borders                                   |
| muted    | `#696969`               | labels, edges, captions, secondary copy                      |
| accent   | `#a27e58`               | warm brown: goal gates, the first irreversible action, keys  |
| accent2  | `#4c829c`               | slate blue: links, cross-references, the odd second series   |
| soft     | `rgba(162,126,88,0.10)` | accent wash behind highlighted nodes                         |
| hairline | `rgba(18,18,18,0.12)`   | dividers, legend rules, inactive borders                     |
| wash     | `rgba(18,18,18,0.05)`   | tool-step fill, inactive layer bands                         |

State colors only when a slide shows run state, taken from the fragua web theme: success `oklch(0.55 0.07 148)`, error `oklch(0.55 0.10 25)`, thinking `oklch(0.62 0.07 68)`, idle `#9a9a9a`. Never decorative.

## Typography

- Display font: `'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace` — weight 600 for titles. Monospace is the voice.
- Body font: `'Geist', system-ui, -apple-system, sans-serif` — weight 400–500.
- Webfont import: `https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap` — load per `references/webfonts.md` in `slide-authoring`.
- Weights 400 / 500 / 600 only. No 700+. No italics except inline code.
- Eyebrows and labels: UPPERCASE, `letterSpacing: '0.14em'`, muted. Sentence case everywhere else. Never Title Case.
- Type-scale overrides:
  - Hero title: 120 px (restraint; the diagrams never shout)
  - Section heading: 88 px
  - Page heading: 64 px
  - Body text: 36 px
  - Caption / label: 24 px
  - Code blocks: 28 px Geist Mono, line-height 1.5, on `surface` with a hairline border

## Layout

- Content padding: 120 px from canvas edges (1920 × 1080).
- Alignment: left-aligned, single column. Two-column only for YAML-beside-why pages (60 / 40).
- Bento rhythm: boxes on `surface` with a 1 px `text` border and 4 px radius; groups with a dashed `hairline` border. No shadows, no gradients.
- Edges and arrows in `muted`, 1.2 px; the accent edge (goal-gate retarget, irreversible action) in `accent`, 1.4 px.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme.

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: 120,
      fontWeight: 600,
      lineHeight: 1.05,
      letterSpacing: '-0.01em',
      margin: 0,
      color: '#121212',
      textWrap: 'balance',
    }}
  >
    {children}
  </h1>
);
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode `pageNum` / `total` props.

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        fontSize: 22,
        letterSpacing: '0.14em',
        color: '#696969',
        borderTop: '1px solid rgba(18,18,18,0.12)',
        paddingTop: 20,
      }}
    >
      <span>FRAGUA · AGENTIC WORKFLOWS</span>
      <span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow / accents (optional)

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: "'Geist Mono', ui-monospace, monospace",
      fontSize: 24,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#696969',
      marginBottom: 28,
    }}
  >
    {children}
  </div>
);
```

### Node (diagram box, optional)

```tsx
const Node = ({ kind, name, note, hot }: { kind: 'LLM' | 'TOOL' | 'JUDGE' | 'HUMAN'; name: string; note?: string; hot?: boolean }) => (
  <div
    style={{
      position: 'relative',
      width: 320,
      padding: '28px 24px 24px',
      background: hot ? 'rgba(162,126,88,0.10)' : kind === 'TOOL' ? 'rgba(18,18,18,0.05)' : '#ffffff',
      border: `1px solid ${hot ? '#a27e58' : kind === 'TOOL' ? '#696969' : '#121212'}`,
      borderRadius: 4,
      fontFamily: "'Geist Mono', ui-monospace, monospace",
    }}
  >
    <span style={{ position: 'absolute', top: 10, left: 12, fontSize: 14, letterSpacing: '0.08em', color: '#121212', opacity: 0.85, border: '0.8px solid rgba(18,18,18,0.4)', borderRadius: 2, padding: '1px 6px' }}>{kind}</span>
    <div style={{ fontSize: 28, fontWeight: 600, color: '#121212', marginTop: 12 }}>{name}</div>
    {note && <div style={{ fontSize: 20, color: '#696969', marginTop: 6 }}>{note}</div>}
  </div>
);
```

## Motion

- Philosophy: **static**. Motion only indicates state (a reveal of the next step, an edge appearing). No entrances for decoration, no easing flourishes. When a step must reveal, use `<Steps>` with opacity only.

## Aesthetic

Clarity through restraint. Paper background, ink text, one warm accent reserved for the decision that matters on the page. Monospace carries the voice; sans serves body copy. Diagrams are the decoration: hairline boxes, dashed group borders, labelled edges, a LEGEND rule at the bottom. No shadows, no gradients, no rounded pills except the start/exit terminals, no emoji, no Title Case. Semantic color appears only when a slide shows run state.

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: '#f8f8f8', color: '#121212', padding: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: "'Geist', system-ui, sans-serif" }}>
    <Eyebrow>Workshop · 45 min</Eyebrow>
    <Title>Why steps beat prompts</Title>
    <p style={{ fontSize: 36, color: '#696969', maxWidth: 1200, marginTop: 40, lineHeight: 1.5 }}>
      A workflow is where you put every "why" a prompt cannot hold.
    </p>
    <Footer />
  </div>
);
```
