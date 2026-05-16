import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetFakeApiDataQuery } from "../api/useGetFakeApiDataQuery";
import { usePostFakeApiDataMutation } from "../api/usePostFakeApiDataMutation";
import { usePutFakeApiDataMutation } from "../api/usePutFakeApiDataMutation";
import { usePatchFakeApiDataMutation } from "../api/usePatchFakeApiDataMutation";
import { useDeleteFakeApiDataMutation } from "../api/useDeleteFakeApiDataMutation";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const usePlaygroundFlow = () => {
  const [searchParams] = useSearchParams();
  const apiId = searchParams.get("apiId") || "";
  const route = searchParams.get("route") || "";

  const [method, setMethod] = useState<HttpMethod>("GET");
  const [recordId, setRecordId] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [activeTab, setActiveTab] = useState<"response" | "headers">("response");

  // Keep track of the most recent response to show in the viewer
  const [lastResponse, setLastResponse] = useState<{
    status: number;
    data: unknown;
    error?: string;
  } | null>(null);

  const [responsesCache, setResponsesCache] = useState<Record<string, { status: number; data: unknown; error?: string }>>({});
  const [requestBodyCache, setRequestBodyCache] = useState<Record<string, string>>({});

  const getQuery = useGetFakeApiDataQuery(apiId, route, { enabled: !!apiId && !!route });
  const postMutation = usePostFakeApiDataMutation();
  const putMutation = usePutFakeApiDataMutation();
  const patchMutation = usePatchFakeApiDataMutation();
  const deleteMutation = useDeleteFakeApiDataMutation();

  const isPending =
    getQuery.isFetching ||
    postMutation.isPending ||
    putMutation.isPending ||
    patchMutation.isPending ||
    deleteMutation.isPending;

  const handleSendRequest = async () => {
    if (!apiId || !route) {
      toast.error("Missing API ID or Route");
      return;
    }

    setLastResponse(null);

    try {
      let parsedBody = undefined;
      if (["POST", "PUT", "PATCH"].includes(method)) {
        try {
          // Clean up common MacOS typing artifacts like smart quotes before parsing
          const cleanBodyForParse = requestBody
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/[\u201C\u201D]/g, '"');

          try {
            parsedBody = requestBody ? JSON.parse(cleanBodyForParse) : {};
          } catch {
            parsedBody = new Function("return " + (cleanBodyForParse || "{}"))();
          }
        } catch {
          toast.error("Invalid JSON in Request Body");
          return;
        }
      }

      if (["PUT", "PATCH", "DELETE"].includes(method) && !recordId) {
        toast.error(`Record ID is required for ${method}`);
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const cleanRoute = route.startsWith('/') ? route : '/' + route;
      let fullUrl = `${baseUrl}/api/${apiId}${cleanRoute}`;
      if (["PUT", "PATCH", "DELETE"].includes(method) && recordId) {
        fullUrl += `/${recordId}`;
      }

      const res = await fetch(fullUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: parsedBody ? JSON.stringify(parsedBody) : undefined,
      });

      const rawJson = await res.json();
      const newResponse = { status: res.status, data: rawJson };
      setLastResponse(newResponse);
      setResponsesCache(prev => ({ ...prev, [method]: newResponse }));
      
      if (res.ok) {
        toast.success(`${method} request successful`);
        getQuery.refetch(); // Refetch the list to update sidebar/records
      } else {
        toast.error(`Request failed with status ${res.status}`);
      }
    } catch (error: unknown) {
      console.error(error);
      const errorResponse = { status: 500, data: { message: "Internal Server Error or Network Issue" } };
      setLastResponse(errorResponse);
      setResponsesCache(prev => ({ ...prev, [method]: errorResponse }));
      toast.error(`Network or Internal Error`);
    }
  };

  const handleFormatJson = () => {
    if (!requestBody.trim()) return;
    try {
      // Clean up common MacOS typing artifacts like smart quotes
      const cleanBody = requestBody
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"');

      let parsed;
      try {
        // Try strict JSON parse first
        parsed = JSON.parse(cleanBody);
      } catch {
        // Fallback to loose JavaScript object parsing (handles trailing commas, single quotes, unquoted keys)
        parsed = new Function("return " + cleanBody)();
      }

      setRequestBody(JSON.stringify(parsed, null, 2));
      toast.success("JSON Formatted");
    } catch {
      toast.error("Cannot format: Invalid syntax");
    }
  };

  const handleMethodChange = (newMethod: HttpMethod) => {
    setRequestBodyCache(prev => ({ ...prev, [method]: requestBody }));
    setMethod(newMethod);
    setLastResponse(responsesCache[newMethod] || null);
    setRequestBody(requestBodyCache[newMethod] || "");
  };

  return {
    state: {
      apiId,
      route,
      method,
      recordId,
      requestBody,
      activeTab,
      lastResponse,
      isPending,
    },
    apiData: getQuery.data,
    actions: {
      setMethod: handleMethodChange,
      setRecordId,
      setRequestBody,
      setActiveTab,
      handleSendRequest,
      handleFormatJson,
    },
  };
};
