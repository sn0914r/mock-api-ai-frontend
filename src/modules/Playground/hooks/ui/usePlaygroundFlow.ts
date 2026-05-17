import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePlaygroundSessions } from "./usePlaygroundSessions";
import { useGetFakeApiDataQuery } from "../api/useGetFakeApiDataQuery";
import { usePostFakeApiDataMutation } from "../api/usePostFakeApiDataMutation";
import { usePutFakeApiDataMutation } from "../api/usePutFakeApiDataMutation";
import { usePatchFakeApiDataMutation } from "../api/usePatchFakeApiDataMutation";
import { useDeleteFakeApiDataMutation } from "../api/useDeleteFakeApiDataMutation";
import { toast } from "sonner";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Tabs = "response" | "headers";

export const usePlaygroundFlow = () => {
  const [searchParams] = useSearchParams();

  const apiId = searchParams.get("apiId") || "";
  const route = searchParams.get("route") || "";

  const [currentMethod, setCurrentMethod] = useState<HttpMethod>("GET");
  const [activeTab, setActiveTab] = useState<Tabs>("response");

  const { sessions, updateSession } = usePlaygroundSessions();
  const currentSession = sessions[currentMethod];

  const getQuery = useGetFakeApiDataQuery(apiId, route);
  const mutations = {
    POST: usePostFakeApiDataMutation(),
    PUT: usePutFakeApiDataMutation(),
    PATCH: usePatchFakeApiDataMutation(),
    DELETE: useDeleteFakeApiDataMutation(),
  };

  const isPending =
    getQuery.isFetching || Object.values(mutations).some((m) => m.isPending);

  useEffect(() => {
    if (getQuery.data && !sessions.GET.response) {
      updateSession("GET", {
        response: { status: 200, data: getQuery.data },
      });
    }
  }, [getQuery.data, sessions.GET.response, updateSession]);

  const handleSendRequest = async () => {
    if (currentMethod === "GET") {
      try {
        const refetched = await getQuery.refetch();
        if (refetched.isError) {
          throw refetched.error || new Error("Failed to fetch data");
        }
        updateSession("GET", {
          response: { status: 200, data: refetched.data },
        });
        toast.success("GET request successful");
      } catch (error: unknown) {
        const err = error as { status?: number; message?: string };
        const errorRes = {
          status: err.status || 500,
          data: err.message || "Error",
        };
        updateSession("GET", { response: errorRes });
        toast.error("Request failed");
      }
      return;
    }

    if (["PUT", "PATCH", "DELETE"].includes(currentMethod)) {
      if (!currentSession.recordId || !currentSession.recordId.toString().trim()) {
        toast.error(`Record ID is required for ${currentMethod}`);
        return;
      }
    }

    let parsedBody = {};
    if (["POST", "PUT", "PATCH"].includes(currentMethod)) {
      const rawBody = (currentSession.body || "").trim();
      if (!rawBody) {
        toast.error(`Request body is required for ${currentMethod}`);
        return;
      }

      try {
        const cleanBody = rawBody
          .replace(/[\u2018\u2019]/g, "'")
          .replace(/[\u201C\u201D]/g, '"');
        parsedBody = JSON.parse(cleanBody);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        toast.error(`Invalid JSON in request body: ${message}`);
        return;
      }
    }

    try {
      let result;
      if (currentMethod === "POST") {
        result = await mutations.POST.mutateAsync({
          apiId,
          route,
          body: parsedBody,
        });
      } else if (currentMethod === "PUT") {
        result = await mutations.PUT.mutateAsync({
          apiId,
          route,
          elementId: currentSession.recordId,
          body: parsedBody,
        });
      } else if (currentMethod === "PATCH") {
        result = await mutations.PATCH.mutateAsync({
          apiId,
          route,
          elementId: currentSession.recordId,
          body: parsedBody,
        });
      } else if (currentMethod === "DELETE") {
        result = await mutations.DELETE.mutateAsync({
          apiId,
          route,
          elementId: currentSession.recordId,
        });
      }

      updateSession(currentMethod, {
        response: { status: 200, data: result },
      });

      toast.success(`${currentMethod} request successful`);
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string };
      const errorRes = {
        status: err.status || 500,
        data: err.message || "Error",
      };

      updateSession(currentMethod, { response: errorRes });

      toast.error(`Request failed`);
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(currentSession.body);
      updateSession(currentMethod, { body: JSON.stringify(parsed, null, 2) });

      toast.success("JSON Formatted");
    } catch {
      toast.error("Invalid JSON");
    }
  };

  const schemaJson = getQuery.data?.data?.schema_json
    ? JSON.stringify(getQuery.data.data.schema_json, null, 2)
    : "";
  const totalRecords = getQuery.data?.data?.data_json?.length ?? 0;
  const createdAt = getQuery.data?.data?.created_at
    ? new Date(getQuery.data.data.created_at).toLocaleString()
    : "N/A";

  const getFullUrl = () => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    let url = `${baseUrl}/api/${apiId}${route}`;
    if (["PUT", "PATCH", "DELETE"].includes(currentMethod) && currentSession.recordId) {
      url += `/${currentSession.recordId}`;
    }
    return url;
  };

  return {
    state: {
      apiId,
      route,
      currentMethod,
      activeTab,
      isPending,
      currentSession,
      fullUrl: getFullUrl(),
      schemaJson,
      totalRecords,
      createdAt,
    },
    apiData: getQuery.data?.data,
    actions: {
      setCurrentMethod,
      setActiveTab,
      updateSession,
      handleSendRequest,
      handleFormatJson,
    },
  };
};
