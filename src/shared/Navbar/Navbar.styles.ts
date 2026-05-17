import styled from "@emotion/styled";

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  background: var(--nav-bg);
  border-bottom: 1px solid var(--nav-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
`;

export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
`;

export const LogoBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: var(--radius-xs);
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const LogoText = styled.span`
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
`;

export const LogoAccent = styled.span`
  color: var(--accent);
`;

export const ThemeButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition);

  &:hover {
    background: var(--surface2);
    color: var(--text);
  }
`;
