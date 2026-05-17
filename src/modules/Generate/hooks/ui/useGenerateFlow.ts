import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTheme } from "../../../../utils/getTheme";
import {
  atomOneLight,
  vs2015,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useGenerateForm } from "./useGenerateForm";
import { useGetApiData } from "./useGetApiData";
import { copy } from "../../../../utils/copy";

export const useGeneratePageFlow = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"schema" | "response" | "details">(
    "response",
  );
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  const form = useGenerateForm();
  const apiData = useGetApiData(form.generatedApiData);

  const theme = getTheme();
  const syntaxStyle = theme === "dark" ? vs2015 : atomOneLight;

  const schemaJson = useMemo(
    () => (apiData.schema ? JSON.stringify(apiData.schema, null, 2) : null),
    [apiData],
  );

  const dataJson = useMemo(
    () => (apiData?.data ? JSON.stringify(apiData.data, null, 2) : null),
    [apiData],
  );

  const currentCode = activeTab === "schema" ? schemaJson : dataJson;

  const createdAt = useMemo(
    () =>
      apiData.details.created && apiData.details.created !== "N/A"
        ? new Date(apiData.details.created).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "-",
    [apiData],
  );

  const copyUrlFn = () => {
    const fullUrl = form.generatedApiData?.fullUrl;
    if (fullUrl) {
      copy(fullUrl, "API endpoint", setIsUrlCopied);
    }
  };

  const copyCodeFn = () => {
    if (currentCode) {
      copy(
        currentCode,
        activeTab === "schema" ? "Schema" : "Response",
        setIsCodeCopied,
      );
    }
  };

  const goToPlayground = () => {
    if (form.generatedApiData) {
      navigate(
        `/playground?apiId=${form.generatedApiData.apiId}&route=${form.generatedApiData.route}`,
      );
    }
  };

  return {
    form,
    apiData,
    tabs: {
      activeTab,
      setActiveTab,
      currentCode,
      createdAt,
      itemCount: apiData.details.items,
    },
    ui: {
      syntaxStyle,
      isUrlCopied,
      isCodeCopied,
      copyCodeFn,
      copyUrlFn,
      goToPlayground,
    },
  };
};
