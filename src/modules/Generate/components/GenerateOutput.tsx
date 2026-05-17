import { RotateCcw } from "lucide-react";
import * as S from "../pages/GeneratePage.styles";
import { GenerateLoading } from "./GenerateLoading";
import { GenerateEmpty } from "./GenerateEmpty";
import { ApiUrlBar } from "./ApiUrlBar";
import { ApiResponseTabs } from "./ApiResponseTabs";
import { ApiCodeViewer } from "./ApiCodeViewer";
import { ApiMetaTable } from "./ApiMetaTable";

interface GenerateOutputProps {
  form: {
    isGenerating: boolean;
    generatedApiData: {
      fullUrl: string;
      apiId: string;
      route: string;
    } | null;
    handleReset: () => void;
  };
  apiData: {
    isFetchingData: boolean;
    data: unknown;
    details: {
      apiId: string;
      route: string;
      items: number;
      fullUrl: string;
    };
  };
  tabs: {
    activeTab: "response" | "schema" | "details";
    setActiveTab: (tab: "response" | "schema" | "details") => void;
    currentCode: string | null;
    createdAt: string;
    itemCount: number;
  };
  ui: {
    syntaxStyle: Record<string, React.CSSProperties>;
    isUrlCopied: boolean;
    isCodeCopied: boolean;
    copyUrlFn: () => void;
    copyCodeFn: () => void;
    goToPlayground: () => void;
  };
}

export const GenerateOutput = ({
  form,
  apiData,
  tabs,
  ui,
}: GenerateOutputProps) => {
  const { activeTab, setActiveTab, currentCode, itemCount, createdAt } = tabs;
  const {
    syntaxStyle,
    isUrlCopied,
    isCodeCopied,
    copyUrlFn,
    copyCodeFn,
    goToPlayground,
  } = ui;

  const isGenerating =
    form.isGenerating || (form.generatedApiData && apiData.isFetchingData);
  const hasResult = form.generatedApiData && apiData.data;

  if (isGenerating) {
    return <GenerateLoading />;
  }

  if (!hasResult) {
    return <GenerateEmpty />;
  }

  return (
    <S.ResultsWrapper>
      <S.ResultHeader>
        <S.StatusRow>
          <S.StatusDot /> 200 OK
        </S.StatusRow>
        <S.NewApiBtn type="button" onClick={form.handleReset}>
          <RotateCcw size={12} /> New
        </S.NewApiBtn>
      </S.ResultHeader>

      <ApiUrlBar
        apiUrl={form.generatedApiData?.fullUrl ?? ""}
        isCopied={isUrlCopied}
        onCopy={copyUrlFn}
        onPlayground={goToPlayground}
      />

      <ApiResponseTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        itemCount={itemCount}
      />

      {activeTab !== "details" ? (
        <ApiCodeViewer
          code={currentCode}
          label={
            activeTab === "schema"
              ? "application/json • schema"
              : `application/json • ${itemCount} items`
          }
          isCopied={isCodeCopied}
          onCopy={copyCodeFn}
          syntaxStyle={syntaxStyle}
        />
      ) : (
        <ApiMetaTable
          apiId={apiData.details.apiId}
          route={apiData.details.route}
          itemsCount={itemCount}
          createdAt={createdAt}
          fullUrl={apiData.details.fullUrl}
        />
      )}
    </S.ResultsWrapper>
  );
};
