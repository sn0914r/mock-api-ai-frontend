import { useState, useCallback } from "react";

type SessionMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface PlaygroundSession {
  recordId: string;
  body: string;
  response: { status: number; data: unknown } | null;
}

export const usePlaygroundSessions = () => {
  const [sessions, setSession] = useState<Record<SessionMethod, PlaygroundSession>>({
    GET: { recordId: "", body: "", response: null },
    POST: { recordId: "", body: "", response: null },
    PUT: { recordId: "", body: "", response: null },
    PATCH: { recordId: "", body: "", response: null },
    DELETE: { recordId: "", body: "", response: null },
  });

  const updateSession = useCallback((
    method: SessionMethod,
    updates: Partial<PlaygroundSession>,
  ) => {
    setSession((prev) => ({
      ...prev,
      [method]: { ...prev[method], ...updates } as PlaygroundSession,
    }));
  }, []);

  return { sessions, updateSession };
};
