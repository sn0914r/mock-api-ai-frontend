import { Loader2, Send } from "lucide-react";
import type { HttpMethod } from "../hooks/ui/usePlaygroundFlow";
import * as S from "../pages/PlaygroundPage.styles";
import { UrlBar } from "./UrlBar";
import { MethodSelector } from "./MethodSelector";
import { RequestBodyEditor } from "./RequestBodyEditor";

import type { PlaygroundSession } from "../hooks/ui/usePlaygroundSessions";

interface RequestEditorProps {
  method: HttpMethod;
  recordId: string;
  requestBody: string;
  isPending: boolean;
  fullUrl: string;
  actions: {
    setCurrentMethod: (m: HttpMethod) => void;
    updateSession: (method: HttpMethod, updates: Partial<PlaygroundSession>) => void;
    handleSendRequest: () => void;
    handleFormatJson: () => void;
  };
  handleCopy: (text: string, label: string) => void;
  methodColors: Record<HttpMethod, string>;
}

export const RequestEditor = ({
  method,
  recordId,
  requestBody,
  isPending,
  fullUrl,
  actions,
  handleCopy,
  methodColors,
}: RequestEditorProps) => {
  return (
    <>
      <UrlBar
        method={method}
        fullUrl={fullUrl}
        methodColor={methodColors[method]}
        handleCopy={handleCopy}
      />

      <MethodSelector
        method={method}
        methodColors={methodColors}
        setCurrentMethod={actions.setCurrentMethod}
      />

      <RequestBodyEditor
        method={method}
        recordId={recordId}
        requestBody={requestBody}
        updateSession={actions.updateSession}
        handleFormatJson={actions.handleFormatJson}
      />

      <S.ActionButton onClick={actions.handleSendRequest} disabled={isPending}>
        {isPending ? (
          <Loader2
            size={16}
            style={{ animation: "spin 0.6s linear infinite" }}
          />
        ) : (
          <Send size={16} />
        )}
        {isPending ? "Sending..." : "Send Request"}
      </S.ActionButton>
    </>
  );
};
