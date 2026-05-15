import { Global, css } from '@emotion/react';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Cabinet+Grotesk:wght@400;500;700;800;900&display=swap');

  /* ── RESET ── */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── GLOBAL TOKENS ── */
  :root {
    /* Brand */
    --accent: #00e5a0;
    --accent-dim: rgba(0, 229, 160, 0.12);
    --accent-glow: rgba(0, 229, 160, 0.25);
    --danger: #ff4d6d;
    --warning: #ffb547;
    --blue: #4d9fff;
    --purple: #a78bfa;

    /* Fonts */
    --font-sans: 'Cabinet Grotesk', sans-serif;
    --font-mono: 'DM Mono', monospace;

    /* Border radius */
    --radius-xs: 5px;
    --radius-sm: 8px;
    --radius: 12px;
    --radius-lg: 20px;
    --radius-full: 99px;

    /* Spacing */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;
    --space-7: 28px;
    --space-8: 40px;

    /* Transitions */
    --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    /* Layout */
    --nav-height: 56px;
    --content-max-width: 680px;

    /* HTTP method colors */
    --method-get-bg: rgba(0, 229, 160, 0.12);
    --method-get-color: #00e5a0;
    --method-get-border: rgba(0, 229, 160, 0.3);

    --method-post-bg: rgba(77, 159, 255, 0.12);
    --method-post-color: #4d9fff;
    --method-post-border: rgba(77, 159, 255, 0.3);

    --method-put-bg: rgba(255, 181, 71, 0.12);
    --method-put-color: #ffb547;
    --method-put-border: rgba(255, 181, 71, 0.3);

    --method-delete-bg: rgba(255, 77, 109, 0.12);
    --method-delete-color: #ff4d6d;
    --method-delete-border: rgba(255, 77, 109, 0.3);

    --method-patch-bg: rgba(167, 139, 250, 0.12);
    --method-patch-color: #a78bfa;
    --method-patch-border: rgba(167, 139, 250, 0.3);
  }

  /* ── DARK THEME (default) ── */
  :root,
  html.dark {
    --bg: #080b10;
    --bg2: #0d1117;
    --surface: #111820;
    --surface2: #161e2a;
    --border: #1e2d3d;
    --border2: #243448;
    --text: #e2eaf4;
    --text-dim: #7a91a8;
    --text-muted: #3d5166;
    --shadow: rgba(0, 0, 0, 0.4);
    --nav-bg: rgba(8, 11, 16, 0.85);
    --json-key: #7ec8ff;
    --json-str: #a8e6a3;
    --json-num: #ffb347;
    --json-bool: #ff8fa3;
  }

  /* ── LIGHT THEME ── */
  html.light {
    --bg: #f0f4f8;
    --bg2: #e8edf3;
    --surface: #ffffff;
    --surface2: #f5f8fb;
    --border: #d0dae6;
    --border2: #c0cdd9;
    --text: #0f1923;
    --text-dim: #4a6077;
    --text-muted: #a0b4c5;
    --shadow: rgba(0, 0, 0, 0.08);
    --nav-bg: rgba(240, 244, 248, 0.85);
    --json-key: #1a6fbd;
    --json-str: #2a7a3a;
    --json-num: #b06000;
    --json-bool: #cc2244;
  }

  /* ── BASE ── */
  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    min-height: 100vh;
    overflow-x: hidden;
    transition: background var(--transition), color var(--transition);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Noise texture overlay */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: var(--border2);
    border-radius: var(--radius-full);
  }

  /* ── JSON SYNTAX ── */
  .json-key  { color: var(--json-key); }
  .json-str  { color: var(--json-str); }
  .json-num  { color: var(--json-num); }
  .json-bool { color: var(--json-bool); }
  .json-null { color: var(--text-muted); }

  /* ── SPINNER ANIMATION ── */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── SHEET ANIMATIONS ── */
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }
`;

const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;
