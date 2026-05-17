// theme.ts

export const tokens = {
  accent: 'var(--accent)',
  accentDim: 'var(--accent-dim)',
  accentGlow: 'var(--accent-glow)',
  accentHover: 'var(--accent-hover)',
  danger: 'var(--danger)',
  warning: 'var(--warning)',
  success: 'var(--success)',
  blue: 'var(--blue)',

  bg: 'var(--bg)',
  bg2: 'var(--bg2)',
  surface: 'var(--surface)',
  surface2: 'var(--surface2)',
  surface3: 'var(--surface3)',
  border: 'var(--border)',
  border2: 'var(--border2)',
  text: 'var(--text)',
  textDim: 'var(--text-dim)',
  textMuted: 'var(--text-muted)',
  shadow: 'var(--shadow)',

  fontSans: 'var(--font-sans)',
  fontMono: 'var(--font-mono)',

  radiusXs: 'var(--radius-xs)',
  radiusSm: 'var(--radius-sm)',
  radius: 'var(--radius)',
  radiusLg: 'var(--radius-lg)',
  radiusFull: 'var(--radius-full)',

  space1: 'var(--space-1)',
  space2: 'var(--space-2)',
  space3: 'var(--space-3)',
  space4: 'var(--space-4)',
  space5: 'var(--space-5)',
  space6: 'var(--space-6)',
  space7: 'var(--space-7)',
  space8: 'var(--space-8)',

  transition: 'var(--transition)',
  navHeight: 'var(--nav-height)',

  method: {
    get:    { bg: 'var(--method-get-bg)',    color: 'var(--method-get-color)',    border: 'var(--method-get-border)' },
    post:   { bg: 'var(--method-post-bg)',   color: 'var(--method-post-color)',   border: 'var(--method-post-border)' },
    put:    { bg: 'var(--method-put-bg)',    color: 'var(--method-put-color)',    border: 'var(--method-put-border)' },
    delete: { bg: 'var(--method-delete-bg)', color: 'var(--method-delete-color)', border: 'var(--method-delete-border)' },
    patch:  { bg: 'var(--method-patch-bg)',  color: 'var(--method-patch-color)',  border: 'var(--method-patch-border)' },
  },
};

export function toggleTheme(): void {
  const html = document.documentElement;
  const isLight = !html.classList.contains('dark');
  html.classList.toggle('dark', isLight);
  html.classList.toggle('light', !isLight);
  localStorage.setItem('mf_theme', isLight ? 'dark' : 'light');
  window.dispatchEvent(new Event('theme-change'));
}

export function initTheme(): void {
  const saved = localStorage.getItem('mf_theme') || 'light';
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(saved);
}
