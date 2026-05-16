import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Circle,
  Copy,
  Loader2,
  RefreshCw,
  Send,
  Terminal,
} from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner";
import { usePlaygroundFlow, type HttpMethod } from "../hooks/ui/usePlaygroundFlow";
import {
  PageShell,
  LeftPanel,
  RightPanel,
  SectionTitle,
  MetaTable,
  MetaRow,
  MetaKey,
  MetaValue,
  MethodSelectorRow,
  MethodPill,
  RequestSection,
  FlexRow,
  InputLabel,
  TextInput,
  JsonTextarea,
  ActionButton,
  SchemaViewer,
  ResponseContainer,
  ResponseHeaderRow,
  StatusBadge,
  ResponseBody,
} from "./PlaygroundPage.styles";
import {
  UrlBar,
  MethodBadge,
  UrlText,
  UrlActions,
  UrlBtn,
  EmptyPanel,
  EmptyIcon,
  EmptyTitle,
  EmptySub,
} from "../../Generate/pages/GeneratePage.styles";

SyntaxHighlighter.registerLanguage("json", json);

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "#10b981", // emerald-500
  POST: "#3b82f6", // blue-500
  PUT: "#f59e0b", // amber-500
  PATCH: "#f59e0b", // amber-500
  DELETE: "#ef4444", // red-500
};

export const PlaygroundPage = () => {
  const { state, apiData, actions } = usePlaygroundFlow();
  const { apiId, route, method, recordId, requestBody, lastResponse, isPending } = state;

  const isDark =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const syntaxStyle = isDark ? vs2015 : atomOneLight;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const getFullUrl = () => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    let fullUrl = `${baseUrl}/api/${apiId}${route}`;
    if (["PUT", "PATCH", "DELETE"].includes(method) && recordId) {
      fullUrl += `/${recordId}`;
    }
    return fullUrl;
  };

  const schemaJson = apiData?.schema_json ? JSON.stringify(apiData.schema_json, null, 2) : "";
  const totalRecords = apiData?.data_json?.length ?? 0;
  const createdAt = apiData?.created_at
    ? new Date(apiData.created_at).toLocaleString()
    : "N/A";

  const showRecordIdInput = ["PUT", "PATCH", "DELETE"].includes(method);
  const showRequestBody = ["POST", "PUT", "PATCH"].includes(method);

  if (!apiId || !route) {
    return (
      <PageShell>
        <EmptyPanel style={{ width: "100%", height: "100%" }}>
          <EmptyIcon>
            <Terminal size={32} />
          </EmptyIcon>
          <EmptyTitle>No API Selected</EmptyTitle>
          <EmptySub>Go back to the Generate page to create and test an API.</EmptySub>
          <Link to="/" style={{ marginTop: "16px", color: "var(--accent)", textDecoration: "none" }}>
            <ArrowLeft size={16} style={{ verticalAlign: "middle", marginRight: "4px" }} />
            Back to Generate
          </Link>
        </EmptyPanel>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* ──── LEFT PANEL (Meta & Schema) ──── */}
      <LeftPanel>
        <div style={{ marginBottom: "var(--space-2)" }}>
          <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <ArrowLeft size={14} /> Back to Generate
          </Link>
        </div>

        <div>
          <SectionTitle>API Details</SectionTitle>
          <MetaTable>
            <MetaRow>
              <MetaKey>API ID</MetaKey>
              <MetaValue title={apiId}>{apiId}</MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaKey>Route</MetaKey>
              <MetaValue>{route}</MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaKey>Records</MetaKey>
              <MetaValue>{totalRecords}</MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaKey>Created</MetaKey>
              <MetaValue>{createdAt}</MetaValue>
            </MetaRow>
          </MetaTable>
        </div>

        {schemaJson && (
          <div style={{ marginTop: "var(--space-2)", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
              <SectionTitle style={{ marginBottom: 0 }}>Schema Preview</SectionTitle>
              <button
                type="button"
                onClick={() => handleCopy(schemaJson, "Schema")}
                style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <Copy size={12} /> Copy
              </button>
            </div>
            <SchemaViewer>
              <SyntaxHighlighter language="json" style={syntaxStyle} customStyle={{ background: "transparent", padding: 0, margin: 0 }}>
                {schemaJson}
              </SyntaxHighlighter>
            </SchemaViewer>
          </div>
        )}
      </LeftPanel>

      {/* ──── RIGHT PANEL (Request & Response) ──── */}
      <RightPanel>
        <UrlBar>
          <MethodBadge style={{ background: METHOD_COLORS[method], color: '#fff' }}>{method}</MethodBadge>
          <UrlText>{getFullUrl()}</UrlText>
          <UrlActions>
            <UrlBtn type="button" onClick={() => handleCopy(getFullUrl(), "Endpoint URL")}>
              <Copy size={13} />
            </UrlBtn>
          </UrlActions>
        </UrlBar>

        <RequestSection>
          <SectionTitle>Method</SectionTitle>
          <MethodSelectorRow>
            {(Object.keys(METHOD_COLORS) as HttpMethod[]).map((m) => (
              <MethodPill
                key={m}
                type="button"
                active={method === m}
                methodColor={METHOD_COLORS[m]}
                onClick={() => actions.setMethod(m)}
              >
                {m}
              </MethodPill>
            ))}
          </MethodSelectorRow>
        </RequestSection>

        {showRecordIdInput && (
          <RequestSection>
            <FlexRow>
              <InputLabel>Record ID</InputLabel>
              <TextInput
                type="text"
                placeholder="e.g. 1 or uuid"
                value={recordId}
                onChange={(e) => actions.setRecordId(e.target.value)}
              />
            </FlexRow>
          </RequestSection>
        )}

        {showRequestBody && (
          <RequestSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <InputLabel>Request Body (JSON)</InputLabel>
              <button
                type="button"
                onClick={actions.handleFormatJson}
                style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
              >
                Beautify
              </button>
            </div>
            <JsonTextarea
              placeholder="{\n  // Enter valid JSON payload here\n}"
              value={requestBody}
              onChange={(e) => actions.setRequestBody(e.target.value)}
            />
          </RequestSection>
        )}

        <ActionButton onClick={actions.handleSendRequest} disabled={isPending}>
          {isPending ? (
            <Loader2 size={16} style={{ animation: "spin 0.6s linear infinite" }} />
          ) : (
            <Send size={16} />
          )}
          {isPending ? "Sending..." : "Send Request"}
        </ActionButton>

        {!lastResponse && (
          <div style={{ marginTop: "var(--space-4)", flex: 1, padding: "40px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-dim)", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px dashed var(--border)" }}>
            <Terminal size={24} style={{ marginBottom: "12px", opacity: 0.5 }} />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>Ready to send</span>
            <span style={{ fontSize: "12px", marginTop: "4px" }}>Click "Send Request" to fetch the response.</span>
          </div>
        )}

        {lastResponse && (
          <ResponseContainer>
            <ResponseHeaderRow>
              <StatusBadge success={lastResponse.status >= 200 && lastResponse.status < 300}>
                {lastResponse.status >= 200 && lastResponse.status < 300 ? <Check size={14} /> : <Circle size={14} />}
                {lastResponse.status} Status
              </StatusBadge>
              <button
                type="button"
                onClick={() => handleCopy(JSON.stringify(lastResponse.data, null, 2), "Response")}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}
              >
                <Copy size={12} /> Copy Output
              </button>
            </ResponseHeaderRow>
            <ResponseBody>
              <SyntaxHighlighter language="json" style={syntaxStyle}>
                {JSON.stringify(lastResponse.data, null, 2)}
              </SyntaxHighlighter>
            </ResponseBody>
          </ResponseContainer>
        )}
      </RightPanel>
    </PageShell>
  );
};
