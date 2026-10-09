import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import coordinatorPng from './assets/coordinator.png';
import draftPng from './assets/draft-critique.png';
import openLoopPng from './assets/open-loop.png';
import pipelinePng from './assets/pipeline.png';
import reviewSvgRaw from './assets/review-b5.svg?raw';
import splitPng from './assets/split-merge.png';
import triagePng from './assets/triage.png';
import workSvgRaw from './assets/work-a4.svg?raw';
import workersPng from './assets/workers.png';

export const design: DesignSystem = {
  palette: { bg: '#f8f8f8', text: '#121212', accent: '#a27e58' },
  fonts: {
    display: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    body: "'Geist', system-ui, -apple-system, sans-serif",
  },
  typeScale: { hero: 120, body: 36 },
  radius: 4,
};

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap';
const FONT_LINK_ID = 'osd-webfont-agentic-workflows';
if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;
}

const ink = '#121212';
const muted = '#696969';
const surface = '#ffffff';
const accent = '#a27e58';
const hairline = 'rgba(18,18,18,0.12)';
const soft = 'rgba(162,126,88,0.10)';
const wash = 'rgba(18,18,18,0.05)';
const mono = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const page = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
  padding: '96px 120px 120px',
  boxSizing: 'border-box',
} as const;

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
    <div style={{ position: 'absolute', right: 120, bottom: 56, fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 22, letterSpacing: '0.14em', color: '#696969' }}>
      {current} / {total}
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

const H = ({ children, size = 64 }: { children: React.ReactNode; size?: number }) => (
  <h2 style={{ fontFamily: mono, fontSize: size, fontWeight: 600, lineHeight: 1.15, margin: 0, letterSpacing: '-0.01em', textWrap: 'balance' }}>
    {children}
  </h2>
);

const Lead = ({ children, top = 36 }: { children: React.ReactNode; top?: number }) => (
  <p style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5, margin: `${top}px 0 0`, maxWidth: 1500 }}>{children}</p>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, marginBottom: 14 }}>{children}</div>
);

const Card = ({ k, children, hot, size = 30 }: { k: string; children: React.ReactNode; hot?: boolean; size?: number }) => (
  <div style={{ background: hot ? soft : surface, border: `1px solid ${hot ? accent : hairline}`, borderRadius: 'var(--osd-radius)', padding: '28px 32px', fontSize: size, lineHeight: 1.45 }}>
    <Label>{k}</Label>
    {children}
  </div>
);

const Mono = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontFamily: mono, fontSize: '0.92em', background: surface, border: `1px solid ${hairline}`, borderRadius: 4, padding: '0 8px' }}>{children}</code>
);

const HARNESS = 'http://localhost:6868';
const HarnessLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" style={{ display: 'inline-block', fontFamily: mono, fontSize: 20, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, textDecoration: 'none', border: `1px solid ${accent}`, borderRadius: 4, padding: '8px 14px' }}>
    {children} ↗
  </a>
);
const WfLink = ({ wf, label = 'open the workflow' }: { wf: string; label?: string }) => <HarnessLink href={`${HARNESS}/workflows/${wf}`}>{label}</HarnessLink>;
const RunLink = ({ id, label = 'open the run' }: { id: string; label?: string }) => (
  <a href={`${HARNESS}/runs/${id}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', fontFamily: mono, fontSize: 20, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, textDecoration: 'none', border: `1px solid ${accent}`, borderRadius: 4, padding: '8px 14px' }}>
    {label} ↗
  </a>
);

/* ── glyph primitives (SVG, fragua diagram style) ── */

const Box = ({ x, y, w = 56, h = 32, hot, fill }: { x: number; y: number; w?: number; h?: number; hot?: boolean; fill?: string }) => (
  <rect x={x} y={y} width={w} height={h} rx={3} fill={fill ?? (hot ? soft : surface)} stroke={hot ? accent : ink} strokeWidth={1.2} />
);
const Dia = ({ x, y, hot }: { x: number; y: number; hot?: boolean }) => (
  <polygon points={`${x},${y - 20} ${x + 30},${y} ${x},${y + 20} ${x - 30},${y}`} fill={hot ? soft : surface} stroke={hot ? accent : ink} strokeWidth={1.2} />
);
const Line = ({ d, hot, dash }: { d: string; hot?: boolean; dash?: boolean }) => (
  <path d={d} fill="none" stroke={hot ? accent : muted} strokeWidth={1.3} strokeDasharray={dash ? '4 3' : undefined} markerEnd={hot ? 'url(#ah)' : 'url(#a)'} />
);
const Defs = () => (
  <defs>
    <marker id="a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill={muted} />
    </marker>
    <marker id="ah" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill={accent} />
    </marker>
  </defs>
);

const Graph = ({ svg, width }: { svg: string; width: number }) => (
  <div style={{ width, border: `1px solid ${hairline}`, borderRadius: 4, background: '#f8f8f8', overflow: 'hidden', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: svg }} />
);

const Pic = ({ src, alt, size }: { src: string; alt: string; size: number }) => (
  <img src={src} alt={alt} style={{ width: size, height: size, objectFit: 'cover', borderRadius: 'var(--osd-radius)', border: `1px solid ${hairline}`, display: 'block' }} />
);


const Row = ({ fail, so, shape }: { fail: string; so: string; shape?: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: shape ? '440px 1fr 420px' : '480px 1fr', gap: 32, padding: '17px 0', borderBottom: `1px solid ${hairline}`, alignItems: 'baseline' }}>
    <div style={{ fontFamily: mono, fontSize: 30, fontWeight: 600 }}>{fail}</div>
    <div style={{ fontSize: 27, lineHeight: 1.4, color: ink }}>{so}</div>
    {shape && <div style={{ fontFamily: mono, fontSize: 24, color: accent, letterSpacing: '0.04em' }}>{shape}</div>}
  </div>
);

const Worker = ({ k, who, when, hot }: { k: string; who: string; when: string; hot?: boolean }) => (
  <div style={{ background: hot ? soft : surface, border: `1px solid ${hot ? accent : ink}`, borderRadius: 'var(--osd-radius)', padding: '24px 32px' }}>
    <Label>{k}</Label>
    <div style={{ fontFamily: mono, fontSize: 48, fontWeight: 600, lineHeight: 1.1 }}>{who}</div>
    <div style={{ fontSize: 28, lineHeight: 1.45, marginTop: 14, color: muted }}>{when}</div>
  </div>
);

const Tile = ({ k, children }: { k: string; children: React.ReactNode }) => (
  <div style={{ background: surface, border: `1px solid ${hairline}`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', fontSize: 27, lineHeight: 1.4 }}>
    <div style={{ fontFamily: mono, fontSize: 30, fontWeight: 600, marginBottom: 10 }}>{k}</div>
    {children}
  </div>
);

const slate = '#4c829c';
const yamlLine = (line: string, i: number) => {
  const parts: React.ReactNode[] = [];
  let rest = line;
  const ci = rest.indexOf('#');
  let comment = '';
  if (ci >= 0 && (ci === 0 || rest[ci - 1] === ' ')) {
    comment = rest.slice(ci);
    rest = rest.slice(0, ci);
  }
  const km = rest.match(/^(\s*)(- )?([A-Za-z_][\w.-]*)(:)(\s|$)/);
  if (km) {
    parts.push(km[1] + (km[2] ?? ''));
    parts.push(<span key="k" style={{ fontWeight: 600 }}>{km[3]}</span>);
    parts.push(km[4]);
    rest = rest.slice(km[0].length - km[5].length);
  }
  const tokens = rest.split(/(\$\{\{[^}]*\}\}|"[^"]*"|`[^`]*`|\b(?:true|false|exit|tool|llm|judge|human|parallel|call|agent|input|route)\b|\b\d+(?:\.\d+)?\b)/g);
  tokens.forEach((t, j) => {
    if (!t) return;
    if (t.startsWith('${{')) parts.push(<span key={j} style={{ color: slate }}>{t}</span>);
    else if (t.startsWith('"') || t.startsWith('`')) parts.push(<span key={j} style={{ color: accent }}>{t}</span>);
    else if (/^(true|false|\d)/.test(t)) parts.push(<span key={j} style={{ color: slate }}>{t}</span>);
    else if (/^(exit|tool|llm|judge|human|parallel|call|agent|input|route)$/.test(t)) parts.push(<span key={j} style={{ color: accent, fontWeight: 500 }}>{t}</span>);
    else parts.push(t);
  });
  if (comment) parts.push(<span key="c" style={{ color: muted, fontStyle: 'italic' }}>{comment}</span>);
  return (
    <div key={i} style={{ whiteSpace: 'pre' }}>
      {parts}
    </div>
  );
};

const Yaml = ({ children, size = 25, width = 1000, top = 24, maxHeight }: { children: string; size?: number; width?: number; top?: number; maxHeight?: number }) => {
  const lines = children.replace(/^\n/, '').split('\n');
  const longest = Math.max(...lines.map((l) => l.length), 1);
  const byHeight = maxHeight ? Math.floor((maxHeight - 44) / (lines.length * 1.45)) : size;
  const fit = Math.max(14, Math.min(size, byHeight, Math.floor((width - 56) / (longest * 0.602))));
  return (
    <pre style={{ margin: `${top}px 0 0`, padding: '22px 28px', background: surface, border: `1px solid ${hairline}`, borderRadius: 'var(--osd-radius)', fontFamily: mono, fontSize: fit, lineHeight: 1.45, color: ink, width, boxSizing: 'border-box', overflow: 'hidden' }}>
      {lines.map(yamlLine)}
    </pre>
  );
};

/* ─────────────────────────── pages ─────────────────────────── */

const Cover: Page = () => (
  <div style={{ ...page, display: 'grid', gridTemplateColumns: '1fr 760px', gap: 80, alignItems: 'center' }}>
    <div>
      <Eyebrow>Workshop · 45 min</Eyebrow>
      <Title>Agentic workflows</Title>
      <p style={{ fontSize: 'var(--osd-size-body)', color: muted, margin: '40px 0 0', lineHeight: 1.5 }}>The process is in charge. Runnable, shared processes, not siloed prompts.</p>
    </div>
    <Pic src={pipelinePng} alt="a pipeline of forge workers" size={760} />
    <Footer />
  </div>
);

const WhereItLives: Page = () => (
  <div style={page}>
    <Eyebrow>Start here</Eyebrow>
    <H>Where does your team's most important recurring process live?</H>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, marginTop: 56 }}>
      <Card k="docs" size={26}>that drift</Card>
      <Card k="slack" size={26}>threads</Card>
      <Card k="heads" size={26}>tribal knowledge</Card>
      <Card k="rituals" size={26}>the Monday call</Card>
      <Card k="tools" size={26}>five of them</Card>
    </div>
    <div style={{ marginTop: 72 }}>
      <div style={{ fontFamily: mono, fontSize: 112, fontWeight: 600, lineHeight: 1, color: accent }}>inert</div>
      <div style={{ fontSize: 34, lineHeight: 1.45, maxWidth: 1300, marginTop: 24 }}>A runbook describes the process. It does not run it. Every execution still goes through the person who carries it in their head.</div>
    </div>
    <Footer />
  </div>
);

const Claim: Page = () => (
  <div style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>The question</Eyebrow>
    <H size={96}>Can we write the process down as something that actually runs?</H>
    <Lead top={48}>{'Closing the books. Reviewing a contract. Triaging tickets. Sourcing candidates. Reviewing pull requests. '}</Lead>
    <Footer />
  </div>
);



const Failures: Page = () => (
  <div style={page}>
    <Eyebrow>What an LLM gets wrong</Eyebrow>
    <H size={56}>Six things no model fixes</H>
    <div style={{ marginTop: 28 }}>
      <Row fail="context is a budget" so="The more you put in one window, the worse each part is handled, and nothing outside it exists: not your conventions, not the helper two files over. So it starts from zero and repeats itself." />
      <Row fail="it hallucinates" so="It writes text that reads right whether or not it is right. Confidence is a property of the prose, not of the claim." />
      <Row fail="one model, one blind spot" so="Re-asking the same model gives the same priors in new words. Asking for four concerns at once gets one blended answer." />
      <Row fail="it is not deterministic" so="Same input, different path each run. Acceptable for a judgement. Unacceptable for a payment, a merge, or a message that must happen exactly once." />
      <Row fail="it is not accountable" so="It can be logged and capped. It cannot own a decision, explain it under questioning, or be held to it." />
      <Row fail="it does not control cost" so="A typo fix and a change to the payment path cost the same tokens. Nothing in the model sizes the effort to the stakes, or stops the spend." />
    </div>
    <Footer />
  </div>
);



const Six = ({ src, name }: { src: string; name: string }) => (
  <div>
    <Pic src={src} alt={name} size={300} />
    <div style={{ fontFamily: mono, fontSize: 26, fontWeight: 600, marginTop: 12 }}>{name}</div>
  </div>
);

const Recap: Page = () => (
  <div style={page}>
    <Eyebrow>The six shapes · every team already runs all of them</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: '36px 120px', marginTop: 8 }}>
      <Six src={pipelinePng} name="pipeline" />
      <Six src={triagePng} name="triage" />
      <Six src={splitPng} name="split & merge" />
      <Six src={coordinatorPng} name="coordinator" />
      <Six src={draftPng} name="draft & critique" />
      <Six src={openLoopPng} name="figure it out" />
    </div>
    <p style={{ fontSize: 24, color: muted, margin: '28px 0 0', fontFamily: mono }}><Ref anchor="workflow-prompt-chaining">prompt chaining</Ref> · <Ref anchor="workflow-routing">routing</Ref> · <Ref anchor="workflow-parallelization">parallelization</Ref> · <Ref anchor="workflow-orchestrator-workers">orchestrator-workers</Ref> · <Ref anchor="workflow-evaluator-optimizer">evaluator-optimizer</Ref> · <Ref anchor="agents">agents</Ref>. Not invented for AI. Named there.</p>
    <Footer />
  </div>
);

const Workers: Page = () => (
  <div style={page}>
    <Eyebrow>Who does each step</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: '700px 1fr', gap: 64, alignItems: 'start' }}>
      <Pic src={workersPng} alt="a person, a machine and a small worker at the forge" size={700} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Worker k="a person" who="accountability" when="Where taste, judgement and accountability have to be human." hot />
        <Worker k="a tool" who="determinism + idempotency" when="Where the effect is mechanical and must happen at most once: fetch, run, post, send." />
        <Worker k="an LLM" who="bounded judgement" when="Classify, draft, verify, summarise. A worker in a step." />
      </div>
    </div>
    <Footer />
  </div>
);

const Commodity: Page = () => (
  <div style={page}>
    <Eyebrow>LLMs, not humans, are the commodity</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 64, alignItems: 'start' }}>
      <div>
        <div style={{ fontFamily: mono, fontSize: 150, fontWeight: 600, lineHeight: 1 }}>38<span style={{ color: muted, fontSize: 72 }}> / 96</span></div>
        <div style={{ fontSize: 30, color: muted, marginTop: 20, lineHeight: 1.4 }}>Ernesto YAML workflows in 17 workspaces have <b style={{ color: ink }}>no</b> agent step. 19 stop for a human. 9 run two or more agents.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card k="cheap and fast">for triage, where being wrong costs a re-route</Card>
        <Card k="the strongest model">for the one high-stakes judgement per run</Card>
        <Card k="several providers">for several perspectives and different blind spots</Card>
      </div>
    </div>
    <Lead top={48}>A worker in a step is replaceable by definition.</Lead>
    <Footer />
  </div>
);


const N = ({ x, y, w = 78, t, kind, hot }: { x: number; y: number; w?: number; t: string; kind?: 'tool' | 'human' | 'judge'; hot?: boolean }) => (
  <g>
    {kind === 'judge' ? (
      <polygon points={`${x + w / 2},${y - 2} ${x + w + 8},${y + 14} ${x + w / 2},${y + 30} ${x - 8},${y + 14}`} fill={hot ? soft : surface} stroke={hot ? accent : ink} strokeWidth={1.2} />
    ) : (
      <rect x={x} y={y} width={w} height={28} rx={kind === 'human' ? 14 : 3} fill={kind === 'tool' ? wash : hot ? soft : surface} stroke={hot ? accent : kind === 'tool' ? muted : ink} strokeWidth={1.2} />
    )}
    <text x={x + w / 2} y={y + 18} fontFamily={mono} fontSize={12} fill={ink} textAnchor="middle">
      {t}
    </text>
  </g>
);




const StagePage = ({ ex, what, n, of = 5, title, fail, broke, added, ernesto, run, art, name, anthropic, anchor, wf, children }: { ex: string; what: string; n: number; of?: number; title: string; fail: string; broke: string; added: string; ernesto: React.ReactNode; run?: string; art?: string; name?: string; anthropic?: string; anchor?: string; wf?: string; children?: React.ReactNode }) => (
  <div style={page}>
    <Eyebrow>Example {ex} · {what} · version {n} of {of}</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: '800px 1fr', gap: 64, alignItems: 'start' }}>
      {art ? (
        <Pic src={art} alt={name ?? title} size={700} />
      ) : (
        <svg viewBox="0 0 320 280" width={800} height={700} style={{ background: surface, border: `1px solid ${hairline}`, borderRadius: 4, display: 'block' }}>
          <Defs />
          {children}
        </svg>
      )}
      <div>
        {name && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: mono, fontSize: 72, fontWeight: 600, lineHeight: 1.05 }}>{name}</div>
            {anthropic && anchor && <div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, marginTop: 10 }}>Anthropic: <Ref anchor={anchor}>{anthropic}</Ref></div>}
          </div>
        )}
        <H size={name ? 44 : 60}>{title}</H>
        <div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', textTransform: 'uppercase', color: n === 1 ? muted : accent, marginTop: 20 }}>{fail}</div>
        <p style={{ fontSize: 30, lineHeight: 1.45, color: muted, margin: '20px 0 0' }}>{broke}</p>
        <p style={{ fontSize: 30, lineHeight: 1.45, margin: '24px 0 0' }}>
          <span style={{ fontFamily: mono, color: accent }}>+ </span>
          {added}
        </p>
        <div style={{ fontSize: 23, lineHeight: 1.4, color: muted, marginTop: 16 }}><span style={{ fontFamily: mono, fontSize: 19, letterSpacing: '0.1em', color: accent }}>IN ERNESTO </span>{ernesto}</div>
        {(wf || run) && (
          <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {wf && <WfLink wf={wf} />}
            {run && <RunLink id={run} />}
          </div>
        )}
      </div>
    </div>
    <Footer />
  </div>
);

const Work1: Page = () => (
  <StagePage wf="a1-work" ex="A" what="build a change" n={1} art={openLoopPng} name="figure it out" anthropic="agents, the open loop" anchor="agents" title="one agent" fail="one agent, no process" broke="Works. The same agent does the work and verifies it." added="nothing yet"
    ernesto={<><Mono>_ernesto/ask</Mono>: a question in, one agent with read and search tools and 30 turns, an answer out. One step, nothing else.</>}
  />
);

const Work2: Page = () => (
  <StagePage wf="a2-work" ex="A" what="build a change" n={2} title="plan then build" fail="context is a budget · it is not deterministic" broke="Attention: planning and editing in one window." added="a planner that cannot write, with the repo map in AGENTS.md and skills loaded on demand, then tools for format and CI"
    ernesto={<><Mono>pulse/compose-daily-brief-v2</Mono>: typed gathers and a glue step push a dossier; one toolless agent only writes.</>}
  >

        <N x={121} y={40} t="plan" />
        <Line d="M160,68 V96" />
        <N x={121} y={100} t="implement" />
        <Line d="M160,128 V156" />
        <N x={121} y={160} t="format" kind="tool" />
        <Line d="M160,188 V216" />
        <N x={121} y={220} t="ci" kind="tool" />
  </StagePage>
);

const Work3: Page = () => (
  <StagePage wf="a3-work" ex="A" what="build a change" n={3} title="triage first" fail="it does not control cost" broke="Cost does not match stakes: a one-line fix got a plan." added="a cheap classifier routes: small, feature, bugfix"
    ernesto={<><Mono>cs/seon-denial-helper-v2</Mono> classifies the reference, then decides from a table. No agent. <Mono>sales-failed/triage-failure</Mono> adds a 30-minute operator hold.</>}
  >
        <N x={121} y={30} t="triage" kind="judge" hot />
        <Line d="M121,44 H60 Q50,44 50,54 V96" />
        <Line d="M160,60 V96" />
        <Line d="M199,44 H260 Q270,44 270,54 V96" />
        <text x={48} y={82} fontFamily={mono} fontSize={9} fill={muted} textAnchor="end">feature</text>
        <text x={168} y={82} fontFamily={mono} fontSize={9} fill={muted}>small</text>
        <text x={272} y={82} fontFamily={mono} fontSize={9} fill={muted}>bugfix</text>
        <N x={16} y={100} w={70} t="plan" />
        <N x={125} y={100} w={70} t="implement" />
        <N x={234} y={100} w={70} t="reproduce" />
        <Line d="M86,114 H121" />
        <Line d="M234,114 H199" />
        <Line d="M160,128 V190" />
        <N x={121} y={194} t="format · ci" kind="tool" />
  </StagePage>
);

const Work4: Page = () => (
  <StagePage wf="a4-work" ex="A" what="build a change" n={4} title="review + loops" fail="it hallucinates" broke="Hallucination: the agent's own summary said it was done." added="a reviewer, an LLM that only judges: it reads the diff and sends work back, at most twice; CI loops through a fixer"
    ernesto={<><Mono>legal/legal-dashboard-author</Mono>: draft, validate every SQL block, revise. One pass, no loop yet.</>}
    run="01m3vwkmt2pfz6mf92h3kmp6xj"
  >

        <N x={121} y={30} t="implement" />
        <Line d="M160,58 V86" />
        <N x={121} y={100} t="review" kind="judge" hot />
        <Line d="M113,114 H70 Q60,114 60,104 V54 Q60,44 70,44 H117" hot />
        <text x={64} y={36} fontFamily={mono} fontSize={10} fill={accent}>REJECT ×2</text>
        <Line d="M160,130 V160" />
        <N x={121} y={164} t="ci" kind="tool" />
        <Line d="M199,178 H240 Q250,178 250,188 V210 Q250,220 240,220 H199" />
        <N x={121} y={206} t="fix" />
        <Line d="M121,220 H80 Q70,220 70,210 V188 Q70,178 80,178 H117" />
        <text x={206} y={248} fontFamily={mono} fontSize={10} fill={muted}>×5</text>
        <text x={160} y={14} fontFamily={mono} fontSize={10} fill={muted} textAnchor="middle">triage · plan as before</text>
  </StagePage>
);

const Work5: Page = () => (
  <StagePage wf="a5-work" ex="A" what="build a change" n={5} title="fan out" fail="context is a budget" broke="Subtasks unknown until the plan exists." added="implement delegates one worker per package, same tree, own budget each"
    ernesto={<><Mono>compose-daily-brief-v2</Mono>: <Mono>foreach</Mono> steps sized at runtime by a glue step's output. No LLM coordinator in Ernesto yet.</>}
  >

        <N x={121} y={40} t="implement" hot />
        <Line d="M140,68 V96 H60 Q50,96 50,106 V124" dash />
        <Line d="M160,68 V124" dash />
        <Line d="M180,68 V96 H260 Q270,96 270,106 V124" dash />
        <N x={16} y={128} w={70} t="worker" />
        <N x={125} y={128} w={70} t="worker" />
        <N x={234} y={128} w={70} t="worker" />
        <text x={160} y={200} fontFamily={mono} fontSize={11} fill={muted} textAnchor="middle">N decided at runtime</text>
        <text x={160} y={222} fontFamily={mono} fontSize={11} fill={muted} textAnchor="middle">then review · ci as before</text>
  </StagePage>
);

const Review1: Page = () => (
  <StagePage wf="b1-review" ex="B" what="review a change" n={1} of={5} art={openLoopPng} title="one agent" fail="one agent, no process" broke="Works. It spent most of its turns navigating the repo, and a typo got the same review as a payment change." added="nothing yet"
    ernesto={<><Mono>code/weekly-digest</Mono>: one 70-turn agent composes the whole edition from the week's deltas, then a call stores it.</>}
    run="01m3vwkzwpk306f6zkpthcg1wr"
  />
);



const Review2: Page = () => (
  <StagePage wf="b3-review" ex="B" what="review a change" n={2} of={5} title="borrow the first two moves" fail="context is a budget · it does not control cost" broke="Same two problems as building, so the same two moves." added="a 5-second tool packs the diff and context, the model only reads; a cheap judge sizes the change: skip, quick or full"
    ernesto={<><Mono>sales-failed/triage-failure</Mono>: routes fetch and enrich, an agent decides on a pushed dossier. <Mono>cs/seon-denial-helper-v2</Mono> classifies and decides with no agent at all.</>}
    run="01m3vwn55v43bm8jtrg97byfn4"
  >
        <N x={121} y={24} t="pack" kind="tool" />
        <Line d="M160,52 V76" />
        <N x={121} y={92} t="classify" kind="judge" hot />
        <Line d="M121,106 H60 Q50,106 50,116 V156" />
        <Line d="M160,122 V156" />
        <Line d="M199,106 H260 Q270,106 270,116 V156" />
        <text x={48} y={144} fontFamily={mono} fontSize={9} fill={muted} textAnchor="end">skip</text>
        <text x={168} y={144} fontFamily={mono} fontSize={9} fill={muted}>quick</text>
        <text x={272} y={144} fontFamily={mono} fontSize={9} fill={muted}>full</text>
        <N x={16} y={160} w={70} t="lgtm" />
        <N x={125} y={160} w={70} t="review" />
        <N x={234} y={160} w={70} t="review" hot />
        <text x={160} y={236} fontFamily={mono} fontSize={11} fill={muted} textAnchor="middle">no bash, no grep: it reads the pack</text>
  </StagePage>
);

const Review3: Page = () => (
  <StagePage wf="b4-review" ex="B" what="review a change" n={3} of={5} title="lenses" fail="one model, one blind spot" broke="A full review from one model is one opinion. Asking it for four concerns at once gets one blended answer." added="parallel read-only lenses, each with one concern, then one synthesis on the strongest model"
    ernesto={<><Mono>agent-ops/create-brd</Mono>: <Mono>users</Mono>, <Mono>system</Mono>, <Mono>risks</Mono> mined in parallel into one dossier. <Mono>code/senior-review</Mono>: two reviewers, one PR.</>}
  >

        <rect x={20} y={50} width={280} height={70} rx={3} fill="none" stroke={ink} strokeOpacity={0.3} strokeDasharray="4 3" />
        <N x={34} y={70} w={110} t="correctness" />
        <N x={176} y={70} w={110} t="craft" />
        <Line d="M89,98 V150 Q89,160 99,160 H121" />
        <Line d="M231,98 V150 Q231,160 221,160 H199" />
        <N x={121} y={146} t="synthesize" hot />
        <text x={160} y={210} fontFamily={mono} fontSize={11} fill={muted} textAnchor="middle">strongest model, once</text>
        <text x={160} y={14} fontFamily={mono} fontSize={10} fill={muted} textAnchor="middle">pack · classify as before</text>
  </StagePage>
);

const Review4: Page = () => (
  <StagePage wf="b4-review" ex="B" what="review a change" n={4} of={5} title="verify every finding" fail="it hallucinates" broke="Hallucination: a finding can cite a line that does not say that, and read perfectly." added="a judge per finding checks it against the code it cites; only verified findings reach the synthesis"
    ernesto={<><Mono>_ernesto://evaluate</Mono> wraps Jev, the judge: a typed verdict on a claim. <Mono>legal/legal-dashboard-author</Mono> validates every SQL block before it revises.</>}
  >

        <N x={34} y={40} w={110} t="correctness" />
        <N x={176} y={40} w={110} t="craft" />
        <Line d="M89,68 V84" />
        <Line d="M231,68 V84" />
        <N x={34} y={88} w={110} t="verify" kind="judge" hot />
        <N x={176} y={88} w={110} t="verify" kind="judge" hot />
        <text x={89} y={138} fontFamily={mono} fontSize={9} fill={accent} textAnchor="middle">for each finding</text>
        <text x={231} y={138} fontFamily={mono} fontSize={9} fill={accent} textAnchor="middle">for each finding</text>
        <Line d="M89,118 V170 Q89,180 99,180 H121" />
        <Line d="M231,118 V170 Q231,180 221,180 H199" />
        <N x={121} y={166} t="synthesize" />
        <text x={160} y={236} fontFamily={mono} fontSize={11} fill={muted} textAnchor="middle">a finding without a verified quote is dropped</text>
  </StagePage>
);

const Review5: Page = () => (
  <StagePage wf="b5-review" ex="B" what="review a change" n={5} of={5} title="human signs off" fail="it is not accountable" broke="Not accountable: posting to the PR is the first irreversible step." added="a human gate: post, keep local, or cancel"
    ernesto={<><Mono>finance/submit-expense</Mono> confirms before filing; <Mono>devin-run-playbook</Mono> previews, confirms, then executes.</>}
    run="01m3vzq6nkfsh311vz1t6cmfzv"
  >

        <N x={121} y={50} t="synthesize" />
        <Line d="M160,78 V110" />
        <N x={121} y={114} t="signoff" kind="human" hot />
        <Line d="M160,142 V176" hot />
        <N x={121} y={180} t="post" kind="tool" />
        <text x={160} y={240} fontFamily={mono} fontSize={11} fill={muted} textAnchor="middle">post · keep local · cancel</text>
  </StagePage>
);


const ARTICLE = 'https://www.anthropic.com/engineering/building-effective-agents';
const Ref = ({ anchor, children }: { anchor: string; children: React.ReactNode }) => (
  <a href={`${ARTICLE}#${anchor}`} target="_blank" rel="noreferrer" style={{ color: slate, textDecoration: 'underline', textDecorationColor: hairline, textUnderlineOffset: 6 }}>
    {children}
  </a>
);

const NamePage = ({ src, name, anthropic, anchor, what, ex }: { src: string; name: string; anthropic: string; anchor: string; what: string; ex: string }) => (
  <div style={page}>
    <Eyebrow>Name it</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: '700px 1fr', gap: 72, alignItems: 'start' }}>
      <Pic src={src} alt={name} size={700} />
      <div>
        <div style={{ fontFamily: mono, fontSize: 96, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.01em' }}>{name}</div>
        <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, marginTop: 16 }}>Anthropic: <Ref anchor={anchor}>{anthropic}</Ref></div>
        <p style={{ fontSize: 32, lineHeight: 1.45, margin: '36px 0 0' }}>{what}</p>
        <p style={{ fontSize: 28, lineHeight: 1.45, margin: '24px 0 0', color: muted }}>{ex}</p>
      </div>
    </div>
    <Footer />
  </div>
);

const NamePipeline: Page = () => (
  <NamePage src={pipelinePng} name="pipeline" anthropic="prompt chaining" anchor="workflow-prompt-chaining" what="Ordered steps, each handing to the next, with checks between them. Divide and conquer. Small, reliable steps beat one big leap." ex="Invoice processing: receive, validate, approve, pay. Marketing: brief, outline, draft, tone pass, publish." />
);
const NameTriage: Page = () => (
  <NamePage src={triagePng} name="triage" anthropic="routing" anchor="workflow-routing" what="Classify the input first, then route it to the right path. A generalist classifies; specialists execute." ex="A contract arrives: NDA, MSA or SOW, then the right playbook and lawyer. A support ticket to the right team." />
);
const NameDraftCritique: Page = () => (
  <NamePage src={draftPng} name="draft & critique" anthropic="evaluator-optimizer" anchor="workflow-evaluator-optimizer" what="A maker and a reviewer iterate on a deliverable until it clears the bar. Worth it when good is definable and feedback improves the next pass." ex="A writer drafts, an editor reviews, the writer revises. A developer writes, a peer reviews." />
);
const NameCoordinator: Page = () => (
  <NamePage src={coordinatorPng} name="coordinator" anthropic="orchestrator-workers" anchor="workflow-orchestrator-workers" what="When you cannot list the subtasks up front: an orchestrator sizes the job, splits it, assigns workers, and synthesises. The split is decided at runtime, not drawn in the file." ex="A vague feature request: the PM sizes it, breaks it into tasks, assigns, tracks." />
);
const NameSplitMerge: Page = () => (
  <NamePage src={splitPng} name="split & merge" anthropic="parallelization: sectioning and voting" anchor="workflow-parallelization" what="Split the work into independent pieces and run them at once, then combine. Or ask the same question several times and synthesise: that one is about perspectives, not speed." ex="One contract, sections to different lawyers, one review. A PR through security, performance, correctness lenses." />
);


const Lead_ = ({ eyebrow, big, sub }: { eyebrow: string; big: string; sub: string }) => (
  <div style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <div style={{ fontFamily: mono, fontSize: 104, fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.015em', textWrap: 'balance', maxWidth: 1600 }}>{big}</div>
    <p style={{ fontSize: 36, color: muted, lineHeight: 1.45, margin: '44px 0 0', maxWidth: 1400 }}>{sub}</p>
    <Footer />
  </div>
);

const LeadWork: Page = () => (
  <Lead_ eyebrow="Example A · build a change" big="One agent, one task. Then we make the process more robust, one step at a time." sub="Five versions of one fragua workflow. Each adds a step that answers one row of the table: better outputs, work sized to the task, resources spent where they matter." />
);

const LeadReview: Page = () => (
  <Lead_ eyebrow="Example B · review a change" big="The other side of the coin: code review" sub="Five versions. The first two moves borrowed from building, then several read-only reviewers in parallel, each with one concern, a check that every finding points at real code, and a person who owns the irreversible step." />
);












const WorkFinal: Page = () => (
  <div style={page}>
    <Eyebrow>Example A · build a change · the graph after four versions</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 720px', gap: 56, alignItems: 'start' }}>
      <Graph svg={workSvgRaw} width={880} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 29, lineHeight: 1.4, marginTop: 8 }}>
        <div><span style={{ fontFamily: mono, fontWeight: 600 }}>triage</span> sizes the task. A cheap model. Small, feature or bug.</div>
        <div><span style={{ fontFamily: mono, fontWeight: 600 }}>plan</span> on the strongest model, read-only. <span style={{ fontFamily: mono, fontWeight: 600 }}>implement</span> on a cheaper one.</div>
        <div><span style={{ fontFamily: mono, fontWeight: 600, color: accent }}>review</span> reads the diff, not the story. Rejects go back, capped.</div>
        <div><span style={{ fontFamily: mono, fontWeight: 600 }}>ci</span> is a tool. Red loops through a fixer, capped.</div>
        <div style={{ color: muted }}>Production <Mono>work.yaml</Mono> adds a fourth route, <Mono>blocked</Mono>. Every step was an edit to one file, made after a run showed why.</div>
        <div><RunLink id="01m3vwkmt2pfz6mf92h3kmp6xj" label="open this morning's run" /></div>
      </div>
    </div>
    <Footer />
  </div>
);


const Composed: Page = () => (
  <div style={{ ...page, padding: '96px 120px 120px' }}>
    <Eyebrow>Example B · review a change · the graph after five versions</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 760px', gap: 56, alignItems: 'start' }}>
      <Graph svg={reviewSvgRaw} width={840} />
      <div>
        <H size={56}>Code review</H>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 36, fontSize: 30, lineHeight: 1.4 }}>
          <div><span style={{ fontFamily: mono, fontWeight: 600 }}>tool</span> fetches the diff. Deterministic.</div>
          <div><span style={{ fontFamily: mono, fontWeight: 600 }}>triage</span> sizes it: skip, quick or full. A cheap model.</div>
          <div><span style={{ fontFamily: mono, fontWeight: 600 }}>split &amp; merge</span> runs correctness and craft lenses in parallel. Production runs four.</div>
          <div><span style={{ fontFamily: mono, fontWeight: 600 }}>verify</span>: each finding is checked against the code it cites before anyone reads it.</div>
          <div><span style={{ fontFamily: mono, fontWeight: 600 }}>the strongest model</span> writes one review.</div>
          <div><span style={{ fontFamily: mono, fontWeight: 600, color: accent }}>a human</span> owns the irreversible step: post it, or not.</div>
          <div style={{ marginTop: 10 }}><RunLink id="01m3vzq6nkfsh311vz1t6cmfzv" label="open the paused run" /></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);




const Trace: Page = () => (
  <div style={page}>
    <Eyebrow>The harness · every run leaves a trace</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: '1300px 1fr', gap: 48, alignItems: 'start' }}>
      <ImagePlaceholder hint="fragua run detail: b5-review on PR 139, Steps tab, paused at signoff" width={1300} height={740} />
      <div style={{ fontSize: 28, lineHeight: 1.45 }}>
        <p style={{ margin: 0 }}>Which worker ran which step, what it decided, what it cost, and where it is waiting for a person.</p>
        <p style={{ margin: '20px 0 0', color: muted }}>Not a dashboard bolted on. The run itself. The definitions live in the repo under <Mono>.fragua/workflows/</Mono>, next to the code they act on.</p>
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <RunLink id="01m3vzq6nkfsh311vz1t6cmfzv" label="open the paused run" />
          <WfLink wf="b5-review" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);


const TwoEngines: Page = () => (
  <div style={page}>
    <Eyebrow>Not hypothetical</Eyebrow>
    <H>Two internal systems share the same shapes</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 48 }}>
      <Card k="Ernesto · workspaces" size={28}>
        Workflows for support, finance, legal, marketing, QA and code. <Mono>seon-denial-helper</Mono> answers "why did this decline fire" with two typed routes and no model. <Mono>senior-review</Mono> runs two reviewers in two voices on one PR.
      </Card>
      <Card k="fragua · engineering" size={28}>
        <Mono>work</Mono> builds a change: triage, plan, implement, review loop, CI loop. <Mono>review</Mono> reviews one: the graph a few pages back. Same three workers: tool, LLM, human. The diamonds are LLMs that only decide.
      </Card>
    </div>
    <Lead top={48}>Different authors, different domains, same shapes, same three workers.</Lead>
    <Footer />
  </div>
);

const Consequences: Page = () => (
  <div style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>What you get once the process is written and runnable</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 8 }}>
      <Tile k="portable">The shape outlives any person, team or model. Swap the LLM; the shape remains.</Tile>
      <Tile k="legible">Humans and LLMs can see what the process does, inspect it, understand it.</Tile>
      <Tile k="shareable">Across individuals, teams and the whole organisation.</Tile>
      <Tile k="repeatable">Run it again. Same shape, consistent result.</Tile>
      <Tile k="evaluable">Test it, score it, version it.</Tile>
      <Tile k="accountable">Someone owns the irreversible decisions.</Tile>
    </div>
    <Footer />
  </div>
);

const Compounds: Page = () => (
  <div style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>Why this compounds</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 8 }}>
      <div style={{ background: wash, border: `1px solid ${hairline}`, borderRadius: 4, padding: 36, minHeight: 520 }}>
        <Label>siloed prompts and skills</Label>
        <svg viewBox="0 0 700 300" width="100%" height={300}>
          <Defs />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <circle cx={90 + i * 170} cy={70} r={26} fill={surface} stroke={ink} strokeWidth={1.2} />
              <Box x={54 + i * 170} y={130} w={72} h={36} fill={surface} />
              <text x={90 + i * 170} y={154} fontFamily={mono} fontSize={13} fill={muted} textAnchor="middle">
                prompt
              </text>
              <line x1={90 + i * 170} y1={96} x2={90 + i * 170} y2={128} stroke={muted} strokeWidth={1.2} markerEnd="url(#a)" />
            </g>
          ))}
          <text x={350} y={250} fontFamily={mono} fontSize={18} fill={muted} textAnchor="middle" letterSpacing="0.1em">
            ONE PER HEAD · INVISIBLE · DRIFTS · LEAVES WITH THE PERSON
          </text>
        </svg>
        <div style={{ fontSize: 28, lineHeight: 1.45, marginTop: 8 }}>A habit. Cannot be reviewed, measured or handed over.</div>
      </div>
      <div style={{ background: soft, border: `1px solid ${accent}`, borderRadius: 4, padding: 36, minHeight: 520 }}>
        <Label>one runnable process</Label>
        <svg viewBox="0 0 700 300" width="100%" height={300}>
          <Defs />
          <Box x={40} y={110} w={150} h={60} hot />
          <text x={115} y={146} fontFamily={mono} fontSize={16} fill={ink} textAnchor="middle">
            person
          </text>
          <Line d="M190,140 H250" hot />
          <Box x={254} y={110} w={150} h={60} hot />
          <text x={329} y={146} fontFamily={mono} fontSize={16} fill={ink} textAnchor="middle">
            team
          </text>
          <Line d="M404,140 H464" hot />
          <Box x={468} y={110} w={190} h={60} hot />
          <text x={563} y={146} fontFamily={mono} fontSize={16} fill={ink} textAnchor="middle">
            organisation
          </text>
          <text x={350} y={250} fontFamily={mono} fontSize={18} fill={accent} textAnchor="middle" letterSpacing="0.1em">
            VERSIONED · REVIEWED · RE-RUN · EVOLVES WITH THE ORG
          </text>
        </svg>
        <div style={{ fontSize: 28, lineHeight: 1.45, marginTop: 8 }}>A definition. It changes by diff.</div>
      </div>
    </div>
    <Footer />
  </div>
);

const Honest: Page = () => (
  <div style={page}>
    <Eyebrow>Keeping the process honest</Eyebrow>
    <H>Executable is not correct.</H>
    <Lead>A process that runs is not a process that is right. It can drift and keep executing. The step that fails loudly is not the problem. The one that succeeds at the wrong thing is.</Lead>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 44 }}>
      <Tile k="own the definition">The shape, the prompts, the guardrails have a named owner. An unowned process rots exactly like an unowned runbook.</Tile>
      <Tile k="golden traces">Keep known-good runs. Re-run them whenever the definition or the model changes, and diff the result.</Tile>
      <Tile k="version the process">The process, not only the code. "What changed" has an answer, and rollback is one commit.</Tile>
      <Tile k="watch the successful runs">Failures announce themselves. The expensive ones look correct, so sample the green runs too.</Tile>
    </div>
    <Footer />
  </div>
);

const Bitter: Page = () => (
  <div style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>The bitter lesson</Eyebrow>
    <H>Better models change the plan, not the guardrails</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 44 }}>
      <Card k="as models improve">Draw fewer steps and let the model carry more of the plan. If a stronger model makes a workflow unnecessary, delete the workflow.</Card>
      <Card k="what never gets cheaper" hot>Audit: "the model decided" is not an answer. Cost control: a smarter model does not volunteer a budget. Accountability: a person owns the irreversible call. At-most-once: the wire still goes out exactly once.</Card>
    </div>
    <Footer />
  </div>
);

const Exercise: Page = () => (
  <div style={page}>
    <Eyebrow>Exercise · 7 min · in pairs · paper</Eyebrow>
    <H>Draw your team's most important recurring process</H>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 44 }}>
      <Card k="1 · name it">One sentence. What wakes it: a schedule, an event, or a person asking?</Card>
      <Card k="2 · draw the shape">Which of the six? Usually two or three composed. Mark where it loops and where it fans out.</Card>
      <Card k="3 · pick the worker per step">Person for judgement and accountability. Tool for the mechanical. LLM for bounded judgement. Circle the irreversible step: who owns it?</Card>
    </div>
    <p style={{ fontFamily: mono, fontSize: 24, color: muted, margin: '36px 0 0' }}>Which steps are a model today that should be a tool, and which are a person today that should not be?</p>
    <Footer />
  </div>
);

const Close: Page = () => (
  <div style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>Close</Eyebrow>
    <H size={72}>A written, runnable process stops being a habit in one head and becomes a definition: readable, runnable, measurable, evolvable.</H>
    <Lead top={48}>Write it down. Run it. Share it. Let it evolve.</Lead>
    <Footer />
  </div>
);

const Repo = ({ k, url, children }: { k: string; url: string; children: React.ReactNode }) => (
  <div style={{ background: surface, border: `1px solid ${hairline}`, borderRadius: 'var(--osd-radius)', padding: '40px 44px' }}>
    <Label>{k}</Label>
    <a href={url} target="_blank" rel="noreferrer" style={{ fontFamily: mono, fontSize: 30, fontWeight: 500, color: slate, textDecoration: 'none', lineHeight: 1.3, display: 'block', whiteSpace: 'nowrap' }}>{url.replace('https://', '')}</a>
    <div style={{ fontSize: 28, lineHeight: 1.45, color: muted, marginTop: 20 }}>{children}</div>
  </div>
);

const GetStarted: Page = () => (
  <div style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>Try it</Eyebrow>
    <H>Start with one process</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 48 }}>
      <Repo k="code · fragua" url="https://github.com/purrgrammer/fragua">Install, add a key, run the harness, init a project. Both examples from today, every version, live in this repo under <Mono>.fragua/workflows/</Mono>.</Repo>
      <Repo k="everything else · ernesto" url="https://github.com/bitrefill/workspaces">The workspaces: support, finance, legal, marketing, QA. Draw the shape, then bring it to the workspace owner. The engine is <Mono>bitrefill/ernesto</Mono>.</Repo>
    </div>
    <Footer />
  </div>
);

const ThankYou: Page = () => (
  <div style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Title>Thank you!</Title>
    <div style={{ fontFamily: mono, fontSize: 64, fontWeight: 600, color: accent, marginTop: 40 }}>Q&amp;A</div>
    <Footer />
  </div>
);

export const notes: (string | undefined)[] = [
  `Timebox: 6 min problem and failure modes, 17 min the two examples evolving, five versions each, with a 20-second name page after each new pattern, 3 min live: open the paused review run, 5 min recap and workers, 5 min consequences and honesty, 7 min exercise and close. Version pages are 90 seconds each: say the failure line, point at the added node, read the IN ERNESTO line. Open: this is about runnable, shared processes. Not prompts, not skills, not an AI pitch.`,
  `Open by asking one person: which recurring process do you run, and where does it live today? Most teams have one in Ernesto by now; developers often do not, and that is fine, pick one from your week. Then the list: closing the books, reviewing a contract, triaging tickets, sourcing candidates, reviewing PRs. Where does it live? Let them answer. Then: every one of those forms is inert. A runbook describes; it doesn't run. It drifts when reality moves, and every real execution still routes through the person who carries it in their head. That's not a failure to write things down. Teams try hard.`,
  `The question for the next 40 minutes. Pause on it.`,
  `Before any pattern names: six things models get wrong. Just the failures for now. The next pages show each one being hit on a real workflow and the step that answered it. Each version page carries one of these lines as its tag; by the end all six have been hit.`,
  `Read the big line. One agent can do this task today. What follows is not a story of failure; it is how the process gets more robust one step at a time: better outputs, the task classified so effort matches it, the expensive model spent only where it earns its keep. Each step answers one row of the table and gets its name as it appears.`,
  `Version 1, and its name: figure it out, the open loop, what the article calls an agent. One agent with every tool. It works, say so. Then the failure: it edited the wrong package, and the tests it reported running were the ones it had just written. Nothing checked the plan because there was no plan.`,
  `Version 2. Attention is a budget. Planning and editing in one window made both worse, and a model that cannot see the codebase rewrites what exists. So: every step gets AGENTS.md, the repo map, and loads skills on demand. A planner on the strongest model that physically cannot write, an implementer on a cheaper model that executes a plan it did not invent, then format and CI as tools. No model needed to run a linter.`,
  `Name it: pipeline. Prompt chaining in the article. Ordered steps handing to the next, checks between. Invoice processing is this. Small reliable steps beat one big leap.`,
  `Version 3. Cost does not match stakes. A one-line fix was getting a full plan. A cheap classifier now routes: small goes straight to implement, feature gets a plan, bugfix reproduces first. The route is topology; nothing downstream re-reads a label.`,
  `Name it: triage. Routing. Classify first, route to the right path. A contract arrives and goes to the right lawyer. The classifier can be cheap because the specialists do the work.`,
  `Version 4. Hallucination. The implementer's own summary said it was done. Now a reviewer reads the diff, not the story, and sends work back, at most twice before a human is asked. CI is a tool; red loops through a fixer at most five times. Both loops bounded, both pause for a person instead of spinning.`,
  `Name it: draft and critique. Evaluator-optimizer. Maker and reviewer iterate until it clears a bar. Only worth it when good is definable; otherwise you loop forever.`,
  `The graph after four versions, before the fan-out. Walk it: triage, the preamble that differs per route, the shared spine, the review loop in accent, the CI loop. Point out the model per step: strongest where thinking happens once, cheaper where it executes a plan, cheapest for lint fixes.`,
  `Version 5. When the plan names several packages the subtasks were not known up front. Implement delegates one worker per package: same tree, fresh context, own budget. The graph still sees one step. This is the coordinator shape, which we name next.`,
  `Name it: coordinator. Orchestrator-workers. The subtasks were not known up front, so a coordinator sizes the job and splits it at runtime. A PM with a vague feature request does exactly this.`,
  `Second example, the other side of the coin. Review reuses the first two moves without ceremony and then adds what only reading needs: parallel lenses, a verifier, a human at the end. Five versions.`,
  `Version 1. One agent reviews a PR. It works, and nothing can tell a real finding from a hallucinated one.`,
  `Version 2, quickly, because you have seen both moves. A tool packs the diff and its context in five seconds; the model only reads it. A cheap judge sizes the change: skip, quick or full. Point at the b3 run if you want: the judge was certain PR 137 was a full review.`,
  `Version 3. One model is one perspective. Parallel read-only lenses, each with its own concern, then the strongest model synthesises once. This is the fan-out; it gets its name next.`,
  `Name it: split and merge. Parallelization, two flavours: sectioning for speed, voting for perspectives. Senior-review is voting: two reviewers, one PR, two opinions.`,
  `Version 4. Hallucination, on the reading side. A finding can cite a line that does not say that and read perfectly. Every finding must quote the code it cites, and a judge per finding checks the quote before anyone reads it. Unverified findings are dropped, not softened.`,
  `Version 5. Not accountable. Posting to the PR is the first irreversible step, so a person owns it: post, keep local, or cancel. Everything before this never left the worktree.`,
  `The graph after five versions; production review.yaml has four lenses and three tool steps up front. Walk it top to bottom: a tool fetches the diff, a cheap model sizes it, two lenses run in parallel, every finding is verified against the code it cites, the strongest model writes one review, a human owns the irreversible step. Same decomposition for legal, finance, product; the shapes are general.`,
  `The harness. This is what a run looks like to the people who did not write it: steps, workers, cost, and a pause waiting for a person. Open the paused run here if the room is with you, otherwise open it right before the exercise.`,
  `All six on one page, now that every one has been named where it appeared. Every team runs all of them with people, documents, LLMs and tools. Naming them gives a shared vocabulary for process itself, across functions.`,
  `Once the process is written as a shape, the LLM isn't the thing you decide how much to trust. The process is in charge; the LLM is a worker you slot into a step. So at every step: who's the right worker? A person where judgement, taste and accountability have to be human. A tool where it's a mechanical, deterministic effect. An LLM where it's bounded judgement. The human is not a spectator or a safety net. The LLM is not a magic wand.`,
  `If the LLM is a worker in a step it is replaceable by definition. The lock-in is the opposite arrangement: the LLM dictates the process and the human watches. The number: 38 of our 96 Ernesto YAML workflows have no agent step; a few of those reach one through a child workflow. So you buy reasoning à la carte: cheap for triage, frontier for the one high-stakes judgement, several providers for perspectives. You only pay frontier price where it earns its keep.`,
  `Not hypothetical. Ernesto workflows and fragua were built by different people for different domains and share the same shapes and the same three workers. That convergence is why we trust the shapes are general rather than an engineering habit.`,
  `Six consequences, straight from the doc. Read them. Portable is the one to dwell on: the shape outlives the person, the team and the model; swap the LLM and the shape remains, and you can measure whether the swap held.`,
  `This is the slide the whole talk is for. Left: a good prompt or skill in one head. It works for that person; it cannot be reviewed, measured or handed over, and it leaves with them. Right: the same thing written as a process. One person's becomes the team's becomes the org's, and it changes by diff. That is what compounds.`,
  `The honest part. Executable is not correct. A runnable process that drifts keeps executing, confidently, against a reality that moved. What makes this tractable: the process is legible, versioned, evaluable. Drift in one head is invisible until it burns you. Drift in a definition is a diff. Four practices: own the definition, keep golden traces, version the process, watch the successful runs.`,
  `Someone will raise the bitter lesson: models get smarter, structure becomes a crutch. Agree with the capability half. Then: production isn't a capability problem, it's a governance problem, and they don't trade. Audit, cost control, accountability, at-most-once effects: none of those come from the model or get cheaper as it improves. You want to inspect and cap a superhuman worker more, not less. The plan is what you hand over; the guardrails are what stays.`,
  `Seven minutes, pairs, paper. Name the process and what wakes it. Draw the shape. Pick the worker per step and circle the irreversible one. Then the two questions that matter: which steps are a model today that should be a tool, and which are a person today that should not be. Collect two or three out loud.`,
  `Close with the doc's last line. Then: the two systems exist, the shapes are shared, bring your drawing to whoever owns the engine for your domain.`,
  `Two places to start. Code processes: the fragua repo, and this workshop repo has every version of both examples. Everything else: the Ernesto workspaces; find the owner of the one closest to your process.`,
  `Questions.`,
];

export const meta: SlideMeta = {
  title: 'Agentic workflows',
  createdAt: '2026-10-01T11:20:38.609Z',
  theme: 'fragua',
};

export default [
  Cover,
  WhereItLives,
  Claim,
  Failures,
  LeadWork,
  Work1,
  Work2,
  NamePipeline,
  Work3,
  NameTriage,
  Work4,
  NameDraftCritique,
  WorkFinal,
  Work5,
  NameCoordinator,
  LeadReview,
  Review1,
  Review2,
  Review3,
  NameSplitMerge,
  Review4,
  Review5,
  Composed,
  Trace,
  Recap,
  Workers,
  Commodity,
  TwoEngines,
  Consequences,
  Compounds,
  Honest,
  Bitter,
  Exercise,
  Close,
  GetStarted,
  ThankYou,
] satisfies Page[];
