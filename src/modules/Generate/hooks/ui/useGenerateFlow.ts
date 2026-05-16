import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateApiSchema, type GenerateApiFormValues } from "../../api/schema";
import { useGenerateApiMutation } from "../api/useGenerateApiMutation";
import { toast } from "sonner";
import { useGetFakeApiDataQuery } from "../../../Playground/hooks/api/useGetFakeApiDataQuery";

interface GeneratedInfo {
  apiId: string;
  route: string;
  apiUrl: string;
}

export const useGenerateFlow = () => {
  const [generatedInfo, setGeneratedInfo] = useState<GeneratedInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GenerateApiFormValues>({
    resolver: zodResolver(generateApiSchema),
    defaultValues: {
      prompt: "",
      limit: 10,
    },
  });

  const promptValue = watch("prompt");

  const { mutate: generate, isPending: isGenerating } = useGenerateApiMutation();

  const onSubmit = (data: GenerateApiFormValues) => {
    generate(data, {
      onSuccess: (result: any) => {
        // apiClient unwraps .data, so result IS the data object directly
        const info = result as GeneratedInfo;
        const baseUrl = import.meta.env.VITE_API_URL || "";
        const fullUrl = info.apiUrl.startsWith("http") 
          ? info.apiUrl 
          : `${baseUrl}${info.apiUrl.startsWith("/") ? "" : "/"}${info.apiUrl}`;

        toast.success("API generated successfully!");
        setGeneratedInfo({
          apiId: info.apiId,
          route: info.route,
          apiUrl: fullUrl,
        });
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to generate API");
      },
    });
  };

  const handleExampleClick = (prompt: string) => {
    setValue("prompt", prompt, { shouldValidate: true });
  };

  const handleReset = () => {
    setGeneratedInfo(null);
    setValue("prompt", "");
    setValue("limit", 10);
  };

  // Fetch generated API data (schema + sample response) after generation
  const {
    data: apiData,
    isLoading: isFetchingData,
  } = useGetFakeApiDataQuery(
    generatedInfo?.apiId || "",
    // strip leading slash for the query
    (generatedInfo?.route || "").replace(/^\//, ""),
    {
      enabled: !!generatedInfo?.apiId && !!generatedInfo?.route,
    }
  );

  return {
    form: {
      register,
      handleSubmit: handleSubmit(onSubmit),
      errors,
      isGenerating,
      handleExampleClick,
      promptValue,
    },
    result: {
      generatedInfo,
      apiData,
      isFetchingData,
      handleReset,
    },
  };
};
