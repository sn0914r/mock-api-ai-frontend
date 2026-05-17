import { apiClient as api } from "../../../lib/apiClient";
import { normalizeRoute } from "../../../utils/normalizeRoute";

interface FakeGetApiDataFormat {
  id: string;
  route: string;
  schema_json: Record<string, string>;
  data_json: Record<string, unknown>[];
  created_at: string;
}

export const getApiData = async ({
  apiId,
  route,
}: {
  apiId: string;
  route: string;
}) => {
  return api<FakeGetApiDataFormat>(`/api/${apiId}${normalizeRoute(route)}`, {
    method: "GET",
  });
};

export const postApiData = async ({
  apiId,
  route,
  body,
}: {
  apiId: string;
  route: string;
  body: Record<string, unknown>;
}) => {
  return api<Record<string, unknown>>(`/api/${apiId}${normalizeRoute(route)}`, {
    method: "POST",
    body,
  });
};

export const putApiData = async ({
  apiId,
  route,
  elementId,
  body,
}: {
  apiId: string;
  route: string;
  elementId: string | number;
  body: Record<string, unknown>;
}) => {
  return api<Record<string, unknown>>(
    `/api/${apiId}${normalizeRoute(route)}/${elementId}`,
    {
      method: "PUT",
      body,
    },
  );
};

export const patchApiData = async ({
  apiId,
  route,
  elementId,
  body,
}: {
  apiId: string;
  route: string;
  elementId: string | number;
  body: Record<string, unknown>;
}) => {
  return api<Record<string, unknown>>(
    `/api/${apiId}${normalizeRoute(route)}/${elementId}`,
    {
      method: "PATCH",
      body,
    },
  );
};

export const deleteApiData = async ({
  apiId,
  route,
  elementId,
}: {
  apiId: string;
  route: string;
  elementId: string | number;
}) => {
  return api<null>(`/api/${apiId}${normalizeRoute(route)}/${elementId}`, {
    method: "DELETE",
  });
};
