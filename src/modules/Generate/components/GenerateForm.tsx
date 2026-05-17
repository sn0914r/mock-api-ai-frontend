import { Loader2, Sparkles } from "lucide-react";
import * as S from "../pages/GeneratePage.styles";

import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { type GenerateApiFormValues } from "../schema";

interface GenerateFormProps {
  form: {
    register: UseFormRegister<GenerateApiFormValues>;
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: FieldErrors<GenerateApiFormValues>;
    isGenerating: boolean;
    handleExamplePromptGenerate: (prompt: string) => void;
  };
  examples: string[];
}

export const GenerateForm = ({ form, examples }: GenerateFormProps) => {
  return (
    <S.FormBody onSubmit={form.handleSubmit}>
      <S.InputGroup>
        <S.Label htmlFor="prompt">Prompt</S.Label>
        <S.Textarea
          id="prompt"
          placeholder="Create a cars API with fields id, carname and price"
          {...form.register("prompt")}
        />
        {form.errors.prompt && (
          <S.ErrorText>{form.errors.prompt.message}</S.ErrorText>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <S.Label>Quick Examples</S.Label>
        <S.ChipsRow>
          {examples.map((ex, i) => (
            <S.Chip
              key={i}
              type="button"
              onClick={() => form.handleExamplePromptGenerate(ex)}
            >
              {ex}
            </S.Chip>
          ))}
        </S.ChipsRow>
      </S.InputGroup>

      <S.FormFooter>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <S.Label htmlFor="limit" style={{ color: "var(--text-muted)" }}>
            Limit
          </S.Label>
          <S.NumberInput
            id="limit"
            type="number"
            min={1}
            max={50}
            style={{ width: "60px", padding: "8px 10px", margin: 0 }}
            {...form.register("limit", { valueAsNumber: true })}
          />
        </div>

        <S.SubmitBtn type="submit" disabled={form.isGenerating}>
          {form.isGenerating ? (
            <>
              <Loader2
                size={14}
                style={{ animation: "spin 0.6s linear infinite" }}
              />
              Generating…
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Generate
            </>
          )}
        </S.SubmitBtn>
      </S.FormFooter>
    </S.FormBody>
  );
};
