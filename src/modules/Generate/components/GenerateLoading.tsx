import { Loader2 } from "lucide-react";
import { AnimatedLoadingText } from "./AnimatedLoadingText";
import * as S from "../pages/GeneratePage.styles";

export const GenerateLoading = () => {
  return (
    <S.LoadingPanel>
      <Loader2
        size={24}
        color="var(--accent)"
        style={{ animation: "spin 0.6s linear infinite" }}
      />
      <AnimatedLoadingText />
    </S.LoadingPanel>
  );
};
