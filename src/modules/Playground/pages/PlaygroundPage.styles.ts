import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const PageShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--nav-height));

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

export const LeftPanel = styled.div`
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  @media (min-width: 900px) {
    width: 320px;
    min-width: 320px;
    max-height: calc(100vh - var(--nav-height));
    overflow-y: auto;
    border-bottom: none;
    border-right: 1px solid var(--border);
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  padding: var(--space-5);
  overflow-y: auto;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  @media (min-width: 900px) {
    max-height: calc(100vh - var(--nav-height));
  }
`;

export const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-2);
`;

export const MetaTable = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
`;

export const MetaRow = styled.div`
  display: flex;
  padding: 10px 14px;
  font-size: 13px;
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--border);
  }
`;

export const MetaKey = styled.div`
  width: 100px;
  color: var(--text-dim);
  font-weight: 500;
`;

export const MetaValue = styled.div`
  flex: 1;
  color: var(--text);
  font-family: var(--font-mono);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MethodSelectorRow = styled.div`
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
`;

export const MethodPill = styled.button<{ active: boolean; methodColor: string }>`
  background: ${(p) => (p.active ? p.methodColor : "transparent")};
  color: ${(p) => (p.active ? "#fff" : "var(--text)")};
  border: 1px solid ${(p) => (p.active ? p.methodColor : "var(--border)")};
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(p) => p.methodColor};
  }
`;

export const RequestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

export const InputLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
`;

export const TextInput = styled.input`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-size: 13px;
  color: var(--text);
  flex: 1;
  font-family: var(--font-mono);

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

export const JsonTextarea = styled.textarea`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

export const ActionButton = styled.button`
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  align-self: flex-end;

  &:hover:not(:disabled) {
    background: var(--accent-hover);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SchemaViewer = styled.div`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-3);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text);
  overflow-x: auto;
`;

export const ResponseContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin-top: var(--space-4);
  flex: 1;
`;

export const ResponseHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
`;

export const StatusBadge = styled.div<{ success: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: ${(p) => (p.success ? "var(--success)" : "var(--danger)")};
`;

export const ResponseBody = styled.div`
  padding: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  overflow-x: auto;
  overflow-y: auto;
  flex: 1;
  background: var(--bg);
  
  pre {
    margin: 0 !important;
    padding: var(--space-4) !important;
    background: transparent !important;
  }
`;
