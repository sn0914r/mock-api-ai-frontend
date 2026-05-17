import { Copy } from "lucide-react";
import * as G from "../../Generate/pages/GeneratePage.styles";

interface UrlBarProps {
  method: string;
  fullUrl: string;
  methodColor: string;
  handleCopy: (text: string, label: string) => void;
}

export const UrlBar = ({
  method,
  fullUrl,
  methodColor,
  handleCopy,
}: UrlBarProps) => {
  return (
    <G.UrlBar>
      <G.MethodBadge style={{ background: methodColor, color: "#fff" }}>
        {method}
      </G.MethodBadge>
      <G.UrlText>{fullUrl}</G.UrlText>
      <G.UrlActions>
        <G.UrlBtn
          type="button"
          onClick={() => handleCopy(fullUrl, "Endpoint URL")}
        >
          <Copy size={13} />
        </G.UrlBtn>
      </G.UrlActions>
    </G.UrlBar>
  );
};
