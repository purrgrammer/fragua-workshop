import { type DesignSystem, type Page, useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#f8f8f8', text: '#121212', accent: '#a27e58' },
  fonts: {
    display: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    body: "'Geist', system-ui, -apple-system, sans-serif",
  },
  typeScale: { hero: 120, body: 36 },
  radius: 4,
};

const muted = '#696969';
const surface = '#ffffff';
const hairline = 'rgba(18,18,18,0.12)';
const soft = 'rgba(162,126,88,0.10)';
const wash = 'rgba(18,18,18,0.05)';
const mono = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const fonts = (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap');`}</style>
);

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
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

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

const page = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
} as const;

const Arrow = () => (
  <div style={{ display: 'flex', alignItems: 'center', color: muted }}>
    <div style={{ width: 48, height: 1.2, background: muted }} />
    <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `9px solid ${muted}` }} />
  </div>
);

const Cover: Page = () => (
  <div style={{ ...page, padding: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    {fonts}
    <Eyebrow>Workshop · 45 min</Eyebrow>
    <Title>Why steps beat prompts</Title>
    <p style={{ fontSize: 'var(--osd-size-body)', color: muted, maxWidth: 1200, marginTop: 40, lineHeight: 1.5, margin: '40px 0 0' }}>
      A workflow is where you put every "why" a prompt cannot hold.
    </p>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div style={{ ...page, padding: 120 }}>
    {fonts}
    <Eyebrow>B5 · the human is a step</Eyebrow>
    <h2 style={{ fontFamily: mono, fontSize: 64, fontWeight: 600, lineHeight: 1.2, margin: 0 }}>
      The first irreversible action gets a gate
    </h2>
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 72 }}>
      <Node kind="LLM" name="synthesize" note="opus · writes review.md" />
      <Arrow />
      <Node kind="HUMAN" name="signoff" note="post · keep local · cancel" hot />
      <Arrow />
      <Node kind="TOOL" name="post_review" note="gh pr review --body-file" />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 72, fontSize: 32, lineHeight: 1.5 }}>
      <div>
        <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.14em', color: muted, marginBottom: 12 }}>WHY</div>
        Nothing before this step has left the worktree. The human reads <code style={{ fontFamily: mono, background: surface, border: `1px solid ${hairline}`, borderRadius: 4, padding: '2px 8px', fontSize: 28 }}>review.md</code>, not the agent's summary of itself.
      </div>
      <div>
        <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.14em', color: muted, marginBottom: 12 }}>MECHANISM</div>
        A pause is one more event in the log. The run waits in the store until a route is chosen; reject is <span style={{ color: 'var(--osd-accent)' }}>cancel</span>, redo is a route.
      </div>
    </div>
    <Footer />
  </div>
);

const Closer: Page = () => (
  <div style={{ ...page, padding: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    {fonts}
    <Eyebrow>Closing line</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
      {[
        ['TOOL', 'this never needed a model'],
        ['JUDGE', 'this needed a number, not a sentence'],
        ['PARALLEL', 'one model is one opinion'],
        ['HUMAN', 'this is the first irreversible action'],
      ].map(([k, v]) => (
        <div key={k} style={{ background: k === 'HUMAN' ? soft : k === 'TOOL' ? wash : surface, border: `1px solid ${k === 'HUMAN' ? 'var(--osd-accent)' : '#121212'}`, borderRadius: 4, padding: 32, minHeight: 300 }}>
          <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.14em', color: muted }}>{k}</div>
          <div style={{ fontSize: 34, lineHeight: 1.35, marginTop: 24 }}>{v}</div>
        </div>
      ))}
    </div>
    <p style={{ fontFamily: mono, fontSize: 28, color: muted, marginTop: 64, maxWidth: 1400 }}>
      Every step type is a place to put a truth about models that a prompt cannot hold.
    </p>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];
