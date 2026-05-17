import { Copy, Check, ExternalLink } from "lucide-react";
import * as S from "../pages/GeneratePage.styles";

interface ApiUrlBarProps {
  apiUrl: string;
  isCopied: boolean;
  onCopy: () => void;
  onPlayground: () => void;
}

export const ApiUrlBar = ({
  apiUrl,
  isCopied,
  onCopy,
  onPlayground,
}: ApiUrlBarProps) => {
  return (
    <S.UrlBar>
      <S.MethodBadge>GET</S.MethodBadge>
      <S.UrlText>{apiUrl}</S.UrlText>
      <S.UrlActions>
        <S.UrlBtn type="button" onClick={onCopy}>
          {isCopied ? <Check size={13} /> : <Copy size={13} />}
        </S.UrlBtn>
        <S.UrlBtn primary type="button" onClick={onPlayground}>
          <ExternalLink size={13} /> Playground
        </S.UrlBtn>
      </S.UrlActions>
    </S.UrlBar>
  );
};
