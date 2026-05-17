import { Copy } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as S from "../pages/PlaygroundPage.styles";

interface SchemaPreviewProps {
  schemaJson: string;
  handleCopy: (text: string, label: string) => void;
}

export const SchemaPreview = ({
  schemaJson,
  handleCopy,
}: SchemaPreviewProps) => {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const syntaxStyle = isDark ? vs2015 : atomOneLight;

  if (!schemaJson) return null;

  return (
    <div
      style={{
        marginTop: "var(--space-2)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-2)",
        }}
      >
        <S.SectionTitle style={{ marginBottom: 0 }}>
          Schema Preview
        </S.SectionTitle>
        <button
          type="button"
          onClick={() => handleCopy(schemaJson, "Schema")}
          style={{
            background: "none",
            border: "none",
            color: "var(--accent)",
            cursor: "pointer",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Copy size={12} /> Copy
        </button>
      </div>
      <S.SchemaViewer>
        <SyntaxHighlighter
          language="json"
          style={syntaxStyle}
          customStyle={{
            background: "transparent",
            padding: 0,
            margin: 0,
          }}
        >
          {schemaJson}
        </SyntaxHighlighter>
      </S.SchemaViewer>
    </div>
  );
};
