import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as S from "../pages/GeneratePage.styles";

SyntaxHighlighter.registerLanguage("json", json);

interface ApiCodeViewerProps {
  code: string | null;
  label: string;
  isCopied: boolean;
  onCopy: () => void;
  syntaxStyle?: Record<string, React.CSSProperties>;
}

export const ApiCodeViewer = ({
  code,
  label,
  isCopied,
  onCopy,
}: ApiCodeViewerProps) => {
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

  const activeSyntaxStyle = theme === "dark" ? atomOneDark : atomOneLight;

  return (
    <S.ResponseBlock>
      <S.ResponseBar>
        <S.ResponseLabel>{label}</S.ResponseLabel>
        {code && (
          <S.CopyBtn type="button" onClick={onCopy}>
            {isCopied ? <Check size={11} /> : <Copy size={11} />}
            {isCopied ? "Copied" : "Copy"}
          </S.CopyBtn>
        )}
      </S.ResponseBar>
      <S.CodeBody>
        {code && (
          <SyntaxHighlighter
            language="json"
            style={activeSyntaxStyle}
            customStyle={{ background: "transparent" }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </S.CodeBody>
    </S.ResponseBlock>
  );
};
