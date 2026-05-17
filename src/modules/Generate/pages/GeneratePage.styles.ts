import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* ═══════════ PAGE SHELL ═══════════ */
export const PageShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--nav-height));

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

/* ── Left: Input Panel ── */
export const LeftPanel = styled.div`
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  @media (min-width: 900px) {
    width: 400px;
    min-width: 400px;
    max-height: calc(100vh - var(--nav-height));
    overflow-y: auto;
    border-bottom: none;
    border-right: 1px solid var(--border);
    padding: var(--space-5) var(--space-5);
  }
`;

/* ── Right: Output Panel ── */
export const RightPanel = styled.div`
  flex: 1;
  padding: var(--space-5);
  overflow-y: auto;
  background: var(--bg);
  display: flex;
  flex-direction: column;

  @media (min-width: 900px) {
    max-height: calc(100vh - var(--nav-height));
  }
`;

/* ═══════════ LEFT PANEL ═══════════ */

export const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-1);
`;

/* ═══════════ RIGHT PANEL ═══════════ */

export const ResultsWrapper = styled.div`
  animation: ${fadeIn} 0.2s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

/* ── Tabs-like section headers ── */
export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  font-weight: 600;
  color: var(--success);
`;

export const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
`;

export const NewApiBtn = styled.button`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-dim);
  cursor: pointer;
  transition: all var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: var(--surface2);
    color: var(--text);
  }
`;

/* ── URL Bar (Postman-style) ── */
export const UrlBar = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  padding: 0;
  margin-bottom: var(--space-4);
  overflow: hidden;
`;

export const MethodBadge = styled.span`
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  padding: 10px 0;
  width: 70px;
  text-align: center;
  background: var(--method-get-bg);
  color: var(--method-get-color);
  border-right: 1px solid var(--border);
  flex-shrink: 0;
  user-select: none;
`;

export const UrlText = styled.span`
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text);
  padding: 10px 12px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UrlActions = styled.div`
  display: flex;
  border-left: 1px solid var(--border);
`;

export const UrlBtn = styled.button<{ primary?: boolean }>`
  background: ${(p) => (p.primary ? "var(--accent)" : "transparent")};
  color: ${(p) => (p.primary ? "#fff" : "var(--text-dim)")};
  border: none;
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-left: ${(p) => (p.primary ? "none" : "0")};

  &:hover {
    background: ${(p) =>
      p.primary ? "var(--accent-hover)" : "var(--surface2)"};
    color: ${(p) => (p.primary ? "#fff" : "var(--text)")};
  }
`;

/* ── Tabbed Sections ── */
export const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0;
  gap: 0;
`;

export const Tab = styled.button<{ active?: boolean }>`
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${(p) => (p.active ? "var(--accent)" : "transparent")};
  padding: 8px 16px;
  font-size: 12px;
  font-weight: ${(p) => (p.active ? 600 : 500)};
  color: ${(p) => (p.active ? "var(--accent)" : "var(--text-dim)")};
  cursor: pointer;
  transition: all var(--transition);

  &:hover {
    color: ${(p) => (p.active ? "var(--accent)" : "var(--text)")};
  }
`;

/* ── Code Block (Postman response style) ── */
export const ResponseBlock = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: none;
  border-radius: 0 0 var(--radius) var(--radius);
  margin-bottom: var(--space-4);
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

export const ResponseBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px var(--space-3);
  border-bottom: 1px solid var(--border);
  background: var(--surface2);
`;

export const ResponseLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
`;

export const CopyBtn = styled.button`
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 2px 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  border-radius: var(--radius-xs);
  transition: all var(--transition);

  &:hover {
    color: var(--text);
    background: var(--surface3);
  }
`;

export const CodeBody = styled.div`
  padding: var(--space-3) var(--space-4);
  overflow-x: auto;
  overflow-y: auto;
  flex: 1;

  pre {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    font-family: var(--font-mono) !important;
    font-size: 12px !important;
    line-height: 1.7 !important;
  }

  code {
    font-family: var(--font-mono) !important;
  }
`;

/* ── Meta Table (Postman-style key-value) ── */
export const MetaTable = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: var(--space-4);
`;

export const MetaRow = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border);
  font-size: 12px;

  &:last-child {
    border-bottom: none;
  }
`;

export const MetaKey = styled.div`
  width: 120px;
  flex-shrink: 0;
  padding: 8px 12px;
  font-weight: 600;
  color: var(--text-dim);
  background: var(--surface2);
  border-right: 1px solid var(--border);
`;

export const MetaValue = styled.div`
  flex: 1;
  padding: 8px 12px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 11px;
  word-break: break-all;
`;

/* ── Empty / Loading ── */
export const EmptyPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 260px;
  text-align: center;
  gap: var(--space-2);

  @media (min-width: 900px) {
    min-height: calc(100vh - var(--nav-height) - 60px);
  }
`;

export const EmptyIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  margin-bottom: var(--space-1);
`;

export const EmptyTitle = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dim);
  margin: 0;
`;

export const EmptySub = styled.p`
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
  max-width: 220px;
  line-height: 1.5;
`;

export const LoadingPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 260px;
  gap: var(--space-4);
  color: var(--text-dim);
  font-size: 13px;

  @media (min-width: 900px) {
    min-height: calc(100vh - var(--nav-height) - 60px);
  }
`;

export const LoadingSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  text-align: left;
  border: 1px solid var(--border);
  background: var(--surface);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius);
  width: 280px;
`;

export const LoadingStep = styled.div<{
  status: "pending" | "loading" | "done";
}>`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: ${(p) =>
    p.status === "done"
      ? "var(--success)"
      : p.status === "loading"
        ? "var(--text)"
        : "var(--text-muted)"};
  font-size: 13px;
  font-weight: ${(p) => (p.status === "loading" ? 500 : 400)};
  transition: all var(--transition);
`;

/* ═══════════ GENERATE FORM ═══════════ */
export const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  flex: 1;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dim);
`;

export const Textarea = styled.textarea`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text);
  min-height: 90px;
  resize: vertical;
  line-height: 1.5;
  transition: border-color var(--transition);

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const NumberInput = styled.input`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 7px 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  width: 80px;
  transition: border-color var(--transition);

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

export const ErrorText = styled.span`
  color: var(--danger);
  font-size: 11px;
`;

/* ── Chips ── */
export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Chip = styled.button`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  font-size: 11px;
  color: var(--text-dim);
  cursor: pointer;
  transition: all var(--transition);
  text-align: left;
  line-height: 1.4;
  white-space: pre-wrap;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-dim);
  }
`;

/* ── Footer ── */
export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
`;

export const SubmitBtn = styled.button`
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 8px 16px;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover:not(:disabled) {
    background: var(--accent-hover);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
