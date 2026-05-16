import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Terminal,
  Circle,
} from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner";
import { useGenerateFlow } from "../hooks/ui/useGenerateFlow";
import {
  PageShell,
  LeftPanel,
  RightPanel,
  SectionLabel,
  FormBody,
  InputGroup,
  Label,
  Textarea,
  NumberInput,
  ErrorText,
  ChipsRow,
  Chip,
  FormFooter,
  SubmitBtn,
  ResultsWrapper,
  ResultHeader,
  StatusRow,
  StatusDot,
  NewApiBtn,
  UrlBar,
  MethodBadge,
  UrlText,
  UrlActions,
  UrlBtn,
  TabBar,
  Tab,
  ResponseBlock,
  ResponseBar,
  ResponseLabel,
  CopyBtn,
  CodeBody,
  MetaTable,
  MetaRow,
  MetaKey,
  MetaValue,
  EmptyPanel,
  EmptyIcon,
  EmptyTitle,
  EmptySub,
  LoadingPanel,
  LoadingSteps,
  LoadingStep,
} from "./GeneratePage.styles";

SyntaxHighlighter.registerLanguage("json", json);

const EXAMPLES = [
  "E-commerce API with products, categories, reviews,\nprices, stock status, and dynamic image URLs.",
  "Social Network API with user profiles, nested comments,\nfriend lists, and engagement metrics.",
  "Financial Dashboard API with transaction histories,\ncurrency conversions, and account balances.",
];

const AnimatedLoadingText = () => {
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setStep((s) => (s + 1) % 2);
        setFade(true);
      }, 150);
    }, 600); // 600ms total loop for 0.5s visible

    return () => clearInterval(timer);
  }, []);

  return (
    <span
      style={{
        opacity: fade ? 1 : 0,
        transition: "opacity 0.15s ease-in-out",
        display: "inline-block",
        minWidth: "160px",
        textAlign: "center",
      }}
    >
      {step === 0 ? "Generating schema..." : "Generating fake data..."}
    </span>
  );
};

export const GeneratePage = () => {
  const navigate = useNavigate();
  const { form, result } = useGenerateFlow();
  const [activeTab, setActiveTab] = useState<"schema" | "response" | "details">(
    "response",
  );
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const syntaxStyle = isDark ? vs2015 : atomOneLight;

  const copy = (text: string, setter: (v: boolean) => void, label: string) => {
    navigator.clipboard.writeText(text);
    setter(true);
    toast.success(`${label} copied`);
    setTimeout(() => setter(false), 2000);
  };

  const apiData = result.apiData as any;
  const schemaJson = apiData?.schema_json
    ? JSON.stringify(apiData.schema_json, null, 2)
    : null;
  const dataJson = apiData?.data_json
    ? JSON.stringify(apiData.data_json, null, 2)
    : null;
  const itemsCount = apiData?.data_json?.length ?? 0;
  const createdAt = apiData?.created_at
    ? new Date(apiData.created_at).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

  const currentCode = activeTab === "schema" ? schemaJson : dataJson;

  return (
    <PageShell>
      {/* ──── LEFT: INPUT ──── */}
      <LeftPanel>
        <SectionLabel>Generate Mock API</SectionLabel>

        <FormBody onSubmit={form.handleSubmit}>
          <InputGroup>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Create a cars API with fields id, carname and price"
              {...form.register("prompt")}
            />
            {form.errors.prompt && (
              <ErrorText>{form.errors.prompt.message}</ErrorText>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Quick Examples</Label>
            <ChipsRow>
              {EXAMPLES.map((ex, i) => (
                <Chip
                  key={i}
                  type="button"
                  onClick={() => form.handleExampleClick(ex)}
                >
                  {ex}
                </Chip>
              ))}
            </ChipsRow>
          </InputGroup>

          <FormFooter>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Label htmlFor="limit" style={{ color: "var(--text-muted)" }}>
                Limit
              </Label>
              <NumberInput
                id="limit"
                type="number"
                min={1}
                max={50}
                style={{ width: "60px", padding: "8px 10px", margin: 0 }}
                {...form.register("limit", { valueAsNumber: true })}
              />
            </div>

            <SubmitBtn type="submit" disabled={form.isGenerating}>
              {form.isGenerating ? (
                <>
                  <Loader2
                    size={14}
                    style={{ animation: "spin 0.6s linear infinite" }}
                  />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Generate
                </>
              )}
            </SubmitBtn>
          </FormFooter>
        </FormBody>
      </LeftPanel>

      {/* ──── RIGHT: OUTPUT ──── */}
      <RightPanel>
        {form.isGenerating ||
        (result.generatedInfo && result.isFetchingData) ? (
          <LoadingPanel>
            <Loader2
              size={24}
              color="var(--accent)"
              style={{ animation: "spin 0.6s linear infinite" }}
            />
            <AnimatedLoadingText />
          </LoadingPanel>
        ) : result.generatedInfo && apiData ? (
          <ResultsWrapper>
            <ResultHeader>
              <StatusRow>
                <StatusDot /> 200 OK
              </StatusRow>
              <NewApiBtn type="button" onClick={result.handleReset}>
                <RotateCcw size={12} /> New
              </NewApiBtn>
            </ResultHeader>

            {/* URL Bar */}
            <UrlBar>
              <MethodBadge>GET</MethodBadge>
              <UrlText>{result.generatedInfo.apiUrl}</UrlText>
              <UrlActions>
                <UrlBtn
                  type="button"
                  onClick={() =>
                    copy(
                      result.generatedInfo!.apiUrl,
                      setCopiedUrl,
                      "API endpoint",
                    )
                  }
                >
                  {copiedUrl ? <Check size={13} /> : <Copy size={13} />}
                </UrlBtn>
                <UrlBtn
                  primary
                  type="button"
                  onClick={() =>
                    navigate(
                      `/playground?apiId=${result.generatedInfo!.apiId}&route=${result.generatedInfo!.route}`,
                    )
                  }
                >
                  <ExternalLink size={13} /> Playground
                </UrlBtn>
              </UrlActions>
            </UrlBar>

            {/* Tabs */}
            <TabBar>
              <Tab
                active={activeTab === "response"}
                onClick={() => setActiveTab("response")}
              >
                Response ({itemsCount})
              </Tab>
              <Tab
                active={activeTab === "schema"}
                onClick={() => setActiveTab("schema")}
              >
                Schema
              </Tab>
              <Tab
                active={activeTab === "details"}
                onClick={() => setActiveTab("details")}
              >
                Details
              </Tab>
            </TabBar>

            {/* Tab Content */}
            {activeTab !== "details" ? (
              <ResponseBlock>
                <ResponseBar>
                  <ResponseLabel>
                    {activeTab === "schema"
                      ? "application/json • schema"
                      : `application/json • ${itemsCount} items`}
                  </ResponseLabel>
                  {currentCode && (
                    <CopyBtn
                      type="button"
                      onClick={() =>
                        copy(
                          currentCode,
                          setCopiedCode,
                          activeTab === "schema" ? "Schema" : "Response",
                        )
                      }
                    >
                      {copiedCode ? <Check size={11} /> : <Copy size={11} />}
                      {copiedCode ? "Copied" : "Copy"}
                    </CopyBtn>
                  )}
                </ResponseBar>
                <CodeBody>
                  {currentCode && (
                    <SyntaxHighlighter
                      language="json"
                      style={syntaxStyle}
                      customStyle={{ background: "transparent" }}
                    >
                      {currentCode}
                    </SyntaxHighlighter>
                  )}
                </CodeBody>
              </ResponseBlock>
            ) : (
              <MetaTable>
                <MetaRow>
                  <MetaKey>API ID</MetaKey>
                  <MetaValue>{result.generatedInfo.apiId}</MetaValue>
                </MetaRow>
                <MetaRow>
                  <MetaKey>Route</MetaKey>
                  <MetaValue>{result.generatedInfo.route}</MetaValue>
                </MetaRow>
                <MetaRow>
                  <MetaKey>Items</MetaKey>
                  <MetaValue>{itemsCount}</MetaValue>
                </MetaRow>
                <MetaRow>
                  <MetaKey>Created</MetaKey>
                  <MetaValue>{createdAt}</MetaValue>
                </MetaRow>
                <MetaRow>
                  <MetaKey>Full URL</MetaKey>
                  <MetaValue>{result.generatedInfo.apiUrl}</MetaValue>
                </MetaRow>
              </MetaTable>
            )}
          </ResultsWrapper>
        ) : (
          <EmptyPanel>
            <EmptyIcon>
              <Terminal size={20} strokeWidth={1.5} />
            </EmptyIcon>
            <EmptyTitle>No response yet</EmptyTitle>
            <EmptySub>
              Write a prompt and click Generate to create a mock API endpoint.
            </EmptySub>
          </EmptyPanel>
        )}
      </RightPanel>
    </PageShell>
  );
};
