// theme.ts
// Use these in styled components via tokens.property

export const tokens = {
  // Brand
  accent: 'var(--accent)',
  accentDim: 'var(--accent-dim)',
  accentGlow: 'var(--accent-glow)',
  danger: 'var(--danger)',
  warning: 'var(--warning)',
  blue: 'var(--blue)',
  purple: 'var(--purple)',

  // Theme-aware surfaces
  bg: 'var(--bg)',
  bg2: 'var(--bg2)',
  surface: 'var(--surface)',
  surface2: 'var(--surface2)',
  border: 'var(--border)',
  border2: 'var(--border2)',
  text: 'var(--text)',
  textDim: 'var(--text-dim)',
  textMuted: 'var(--text-muted)',
  shadow: 'var(--shadow)',
  navBg: 'var(--nav-bg)',

  // Fonts
  fontSans: 'var(--font-sans)',
  fontMono: 'var(--font-mono)',

  // Radius
  radiusXs: 'var(--radius-xs)',
  radiusSm: 'var(--radius-sm)',
  radius: 'var(--radius)',
  radiusLg: 'var(--radius-lg)',
  radiusFull: 'var(--radius-full)',

  // Spacing
  space1: 'var(--space-1)',
  space2: 'var(--space-2)',
  space3: 'var(--space-3)',
  space4: 'var(--space-4)',
  space5: 'var(--space-5)',
  space6: 'var(--space-6)',
  space7: 'var(--space-7)',
  space8: 'var(--space-8)',

  // Transitions
  transition: 'var(--transition)',

  // Layout
  navHeight: 'var(--nav-height)',
  contentMaxWidth: 'var(--content-max-width)',

  // HTTP methods
  method: {
    get:    { bg: 'var(--method-get-bg)',    color: 'var(--method-get-color)',    border: 'var(--method-get-border)' },
    post:   { bg: 'var(--method-post-bg)',   color: 'var(--method-post-color)',   border: 'var(--method-post-border)' },
    put:    { bg: 'var(--method-put-bg)',    color: 'var(--method-put-color)',    border: 'var(--method-put-border)' },
    delete: { bg: 'var(--method-delete-bg)', color: 'var(--method-delete-color)', border: 'var(--method-delete-border)' },
    patch:  { bg: 'var(--method-patch-bg)',  color: 'var(--method-patch-color)',  border: 'var(--method-patch-border)' },
  },
};

// Theme toggle helper
export function toggleTheme(): void {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  html.classList.toggle('dark', !isDark);
  html.classList.toggle('light', isDark);
  localStorage.setItem('mf_theme', isDark ? 'light' : 'dark');
}

// Init theme on app load
export function initTheme(): void {
  const saved = localStorage.getItem('mf_theme') || 'dark';
  document.documentElement.classList.add(saved);
}
