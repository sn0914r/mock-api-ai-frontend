import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateApiSchema, type GenerateApiFormValues } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGenerateApiMutation } from "../api/useGenerateApiMutation";
import { normalizeRoute } from "../../../../utils/normalizeRoute";
import { toast } from "sonner";

export interface GeneratedApiDataI {
  apiId: string;
  route: string;
  apiUrl: string;
  fullUrl: string;
}

export const useGenerateForm = () => {
  const [generatedApiData, setGeneratedApiData] =
    useState<GeneratedApiDataI | null>(null);
  const defaultValues = {
    prompt: "",
    limit: 5,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GenerateApiFormValues>({
    resolver: zodResolver(generateApiSchema),
    defaultValues,
  });

  const promptValue = watch("prompt");

  const { mutate: generate, isPending: isGenerating } =
    useGenerateApiMutation();

  const onSubmit = (data: GenerateApiFormValues) => {
    generate(data, {
      onSuccess: (result) => {
        if (!result.data) {
          toast.error("Failed to generate API data");
          return;
        }
        const baseUrl = import.meta.env.VITE_API_URL || "";
        const fullUrl = `${baseUrl}${normalizeRoute(result.data.apiUrl)}`;

        toast.success("API generated successfully!");
        setGeneratedApiData({
          apiId: result.data.apiId,
          route: result.data.route,
          apiUrl: result.data.apiUrl,
          fullUrl,
        });
      },

      onError: (err: Error) => {
        toast.error(err.message || "Failed to generate API");
      },
    });
  };

  const handleExamplePromptGenerate = (prompt: string) => {
    setValue("prompt", prompt, { shouldValidate: true });
  };

  const handleReset = () => {
    setGeneratedApiData(null);
    setValue("prompt", "");
    setValue("limit", 5);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isGenerating,
    handleExamplePromptGenerate,
    promptValue,
    handleReset,
    generatedApiData,
  };
};
