import { Copy, Check } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import * as S from "../pages/GeneratePage.styles";

interface ApiCodeViewerProps {
  code: string | null;
  label: string;
  isCopied: boolean;
  onCopy: () => void;
  syntaxStyle: Record<string, React.CSSProperties>;
}

export const ApiCodeViewer = ({
  code,
  label,
  isCopied,
  onCopy,
  syntaxStyle,
}: ApiCodeViewerProps) => {
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
            style={syntaxStyle}
            customStyle={{ background: "transparent" }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </S.CodeBody>
    </S.ResponseBlock>
  );
};
