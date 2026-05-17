import { useState, useEffect } from "react";
import { Check, Circle, Copy } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as S from "../pages/PlaygroundPage.styles";

SyntaxHighlighter.registerLanguage("json", json);

interface ResponseDisplayProps {
  lastResponse: { status: number; data: unknown };
  handleCopy: (text: string, label: string) => void;
}

export const ResponseDisplay = ({
  lastResponse,
  handleCopy,
}: ResponseDisplayProps) => {
  const [theme, setTheme] = useState(() => {
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    return isDark ? "dark" : "light";
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const syntaxStyle = theme === "dark" ? atomOneDark : atomOneLight;

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
