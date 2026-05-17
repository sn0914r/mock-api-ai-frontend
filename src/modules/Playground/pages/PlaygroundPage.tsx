import {
  usePlaygroundFlow,
  type HttpMethod,
} from "../hooks/ui/usePlaygroundFlow";
import { copy } from "../../../utils/copy";
import { PlaygroundEmpty } from "../components/PlaygroundEmpty";
import { PlaygroundSidebar } from "../components/PlaygroundSidebar";
import { RequestEditor } from "../components/RequestEditor";
import { ResponseViewer } from "../components/ResponseViewer";
import * as S from "./PlaygroundPage.styles";

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "#10b981",
  POST: "#3b82f6",
  PUT: "#f59e0b",
  PATCH: "#f59e0b",
  DELETE: "#ef4444",
};

export const PlaygroundPage = () => {
  const { state, actions } = usePlaygroundFlow();
  const {
    apiId,
    route,
    currentMethod: method,
    isPending,
    currentSession,
    fullUrl,
    schemaJson,
    totalRecords,
    createdAt,
  } = state;
  const {
    recordId,
    body: requestBody,
    response: lastResponse,
  } = currentSession;

  const handleCopy = copy;

  if (!apiId || !route) {
    return <PlaygroundEmpty />;
  }

  return (
    <S.PageShell>
      <S.LeftPanel>
        <PlaygroundSidebar
          apiId={apiId}
          route={route}
          totalRecords={totalRecords}
          createdAt={createdAt}
          schemaJson={schemaJson}
          handleCopy={handleCopy}
        />
      </S.LeftPanel>

      <S.RightPanel>
        <RequestEditor
          method={method}
          recordId={recordId}
          requestBody={requestBody}
          isPending={isPending}
          fullUrl={fullUrl}
          actions={actions}
          handleCopy={handleCopy}
          methodColors={METHOD_COLORS}
        />

        <ResponseViewer
          lastResponse={lastResponse}
          isPending={isPending}
          handleCopy={handleCopy}
        />
      </S.RightPanel>
    </S.PageShell>
  );
};
