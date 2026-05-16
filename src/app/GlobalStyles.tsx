import { Global, css } from '@emotion/react';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  /* ── RESET ── */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── GLOBAL TOKENS ── */
  :root {
    /* Brand — warm Postman-inspired orange */
    --accent: #FF6C37;
    --accent-dim: rgba(255, 108, 55, 0.08);
    --accent-glow: rgba(255, 108, 55, 0.15);
    --accent-hover: #e85d2b;
    --accent-text: #ffffff;

    --danger: #e53e3e;
    --warning: #dd6b20;
    --success: #38a169;
    --blue: #3182ce;

    /* Fonts */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

    /* Border radius */
    --radius-xs: 4px;
    --radius-sm: 6px;
    --radius: 8px;
    --radius-lg: 12px;
    --radius-full: 99px;

    /* Spacing */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;
    --space-7: 32px;
    --space-8: 48px;

    /* Transitions */
    --transition: 0.15s ease;

    /* Layout */
    --nav-height: 48px;

    /* HTTP methods */
    --method-get-bg: rgba(56, 161, 105, 0.10);
    --method-get-color: #38a169;
    --method-get-border: rgba(56, 161, 105, 0.25);

    --method-post-bg: rgba(49, 130, 206, 0.10);
    --method-post-color: #3182ce;
    --method-post-border: rgba(49, 130, 206, 0.25);

    --method-put-bg: rgba(221, 107, 32, 0.10);
    --method-put-color: #dd6b20;
    --method-put-border: rgba(221, 107, 32, 0.25);

    --method-delete-bg: rgba(229, 62, 62, 0.10);
    --method-delete-color: #e53e3e;
    --method-delete-border: rgba(229, 62, 62, 0.25);

    --method-patch-bg: rgba(128, 90, 213, 0.10);
    --method-patch-color: #805ad5;
    --method-patch-border: rgba(128, 90, 213, 0.25);
  }

  /* ── LIGHT THEME (default) ── */
  :root,
  html.light {
    --bg: #f5f5f5;
    --bg2: #ebebeb;
    --surface: #ffffff;
    --surface2: #f9f9f9;
    --surface3: #f0f0f0;
    --border: #e2e2e2;
    --border2: #d0d0d0;
    --text: #212121;
    --text-dim: #6b6b6b;
    --text-muted: #9e9e9e;
    --shadow: rgba(0, 0, 0, 0.06);
    --nav-bg: #ffffff;
    --nav-border: #e2e2e2;
    --json-key: #0451a5;
    --json-str: #0a7d2e;
    --json-num: #b5600b;
    --json-bool: #c41a16;
  }

  /* ── DARK THEME ── */
  html.dark {
    --bg: #1c1c1c;
    --bg2: #161616;
    --surface: #262626;
    --surface2: #2d2d2d;
    --surface3: #333333;
    --border: #3d3d3d;
    --border2: #4a4a4a;
    --text: #e8e8e8;
    --text-dim: #a0a0a0;
    --text-muted: #6b6b6b;
    --shadow: rgba(0, 0, 0, 0.3);
    --nav-bg: #262626;
    --nav-border: #3d3d3d;
    --json-key: #9cdcfe;
    --json-str: #ce9178;
    --json-num: #b5cea8;
    --json-bool: #569cd6;
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
    transition: background 0.2s ease, color 0.2s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: var(--border2);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-muted);
  }

  /* ── JSON SYNTAX ── */
  .json-key  { color: var(--json-key); }
  .json-str  { color: var(--json-str); }
  .json-num  { color: var(--json-num); }
  .json-bool { color: var(--json-bool); }
  .json-null { color: var(--text-muted); }

  /* ── SPINNER ── */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;
