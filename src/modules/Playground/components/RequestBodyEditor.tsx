import type { HttpMethod } from "../hooks/ui/usePlaygroundFlow";
import * as S from "../pages/PlaygroundPage.styles";
import type { PlaygroundSession } from "../hooks/ui/usePlaygroundSessions";

interface RequestBodyEditorProps {
  method: HttpMethod;
  recordId: string;
  requestBody: string;
  updateSession: (method: HttpMethod, updates: Partial<PlaygroundSession>) => void;
  handleFormatJson: () => void;
}

export const RequestBodyEditor = ({
  method,
  recordId,
  requestBody,
  updateSession,
  handleFormatJson,
}: RequestBodyEditorProps) => {
  const showRecordIdInput = ["PUT", "PATCH", "DELETE"].includes(method);
  const showRequestBody = ["POST", "PUT", "PATCH"].includes(method);

  return (
    <>
      {showRecordIdInput && (
        <S.RequestSection>
          <S.FlexRow>
            <S.InputLabel>Record ID</S.InputLabel>
            <S.TextInput
              type="text"
              placeholder="e.g. 1 or uuid"
              value={recordId}
              onChange={(e) =>
                updateSession(method, { recordId: e.target.value })
              }
            />
          </S.FlexRow>
        </S.RequestSection>
      )}

      {showRequestBody && (
        <S.RequestSection>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <S.InputLabel>Request Body (JSON)</S.InputLabel>
            <button
              type="button"
              onClick={handleFormatJson}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent)",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Beautify
            </button>
          </div>
          <S.JsonTextarea
            placeholder="{\n  // Enter valid JSON payload here\n}"
            value={requestBody}
            onChange={(e) =>
              updateSession(method, { body: e.target.value })
            }
          />
        </S.RequestSection>
      )}
    </>
  );
};
