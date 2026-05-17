import { Check, Circle, Copy } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as S from "../pages/PlaygroundPage.styles";

interface ResponseDisplayProps {
  lastResponse: { status: number; data: unknown };
  handleCopy: (text: string, label: string) => void;
}

export const ResponseDisplay = ({
  lastResponse,
  handleCopy,
}: ResponseDisplayProps) => {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const syntaxStyle = isDark ? vs2015 : atomOneLight;

  const isSuccess = lastResponse.status >= 200 && lastResponse.status < 300;

  return (
    <S.ResponseContainer>
      <S.ResponseHeaderRow>
        <S.StatusBadge success={isSuccess}>
          {isSuccess ? <Check size={14} /> : <Circle size={14} />}
          {lastResponse.status} Status
        </S.StatusBadge>
        <button
          type="button"
          onClick={() =>
            handleCopy(JSON.stringify(lastResponse.data, null, 2), "Response")
          }
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
          }}
        >
          <Copy size={12} /> Copy Output
        </button>
      </S.ResponseHeaderRow>
      <S.ResponseBody>
        <SyntaxHighlighter language="json" style={syntaxStyle}>
          {JSON.stringify(lastResponse.data, null, 2)}
        </SyntaxHighlighter>
      </S.ResponseBody>
    </S.ResponseContainer>
  );
};
