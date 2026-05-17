import type { HttpMethod } from "../hooks/ui/usePlaygroundFlow";
import * as S from "../pages/PlaygroundPage.styles";

interface MethodSelectorProps {
  method: HttpMethod;
  methodColors: Record<HttpMethod, string>;
  setCurrentMethod: (m: HttpMethod) => void;
}

export const MethodSelector = ({
  method,
  methodColors,
  setCurrentMethod,
}: MethodSelectorProps) => {
  return (
    <S.RequestSection>
      <S.SectionTitle>Method</S.SectionTitle>
      <S.MethodSelectorRow>
        {(Object.keys(methodColors) as HttpMethod[]).map((m) => (
          <S.MethodPill
            key={m}
            type="button"
            active={method === m}
            methodColor={methodColors[m]}
            onClick={() => setCurrentMethod(m)}
          >
            {m}
          </S.MethodPill>
        ))}
      </S.MethodSelectorRow>
    </S.RequestSection>
  );
};
