import { Terminal } from "lucide-react";
import * as S from "../pages/GeneratePage.styles";

export const GenerateEmpty = () => {
  return (
    <S.EmptyPanel>
      <S.EmptyIcon>
        <Terminal size={20} strokeWidth={1.5} />
      </S.EmptyIcon>
      <S.EmptyTitle>No response yet</S.EmptyTitle>
      <S.EmptySub>
        Write a prompt and click Generate to create a mock API endpoint.
      </S.EmptySub>
    </S.EmptyPanel>
  );
};
