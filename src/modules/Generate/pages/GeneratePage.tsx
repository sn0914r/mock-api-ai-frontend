import { useGeneratePageFlow } from "../hooks/ui/useGenerateFlow";
import * as S from "./GeneratePage.styles";
import { GenerateForm } from "../components/GenerateForm";
import { GenerateOutput } from "../components/GenerateOutput";

const EXAMPLES = [
  "E-commerce API with products, categories, prices, stock status, ratings, discounts, and product image URLs.",
  "Financial Dashboard API with transactions, account balances, payment statuses, currencies, and monthly spending reports.",
  "Movie Streaming API with movie titles, genres, ratings, release years, durations, and poster image URLs.",
  "Job Portal API with job titles, company names, salaries, locations, experience levels, and application statuses.",
  "Fitness Tracker API with workout names, calories burned, exercise durations, difficulty levels, and completion status.",
];

export const GeneratePage = () => {
  const { form, apiData, tabs, ui } = useGeneratePageFlow();

  return (
    <S.PageShell>
      <S.LeftPanel>
        <S.SectionLabel>Generate Mock API</S.SectionLabel>
        <GenerateForm form={form} examples={EXAMPLES} />
      </S.LeftPanel>

      <S.RightPanel>
        <GenerateOutput form={form} apiData={apiData} tabs={tabs} ui={ui} />
      </S.RightPanel>
    </S.PageShell>
  );
};
