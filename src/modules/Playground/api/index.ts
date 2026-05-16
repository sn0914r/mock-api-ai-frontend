import { apiClient as api } from "../../../lib/apiClient";

export const getApiData = async ({
  apiId,
  route,
}: {
  apiId: string;
  route: string;
}) => {
  return api<{
    id: string;
    route: string;
    schema_json: Record<string, string>;
    data_json: Record<string, unknown>[];
    created_at: string;
  }>(`api/${apiId}${route.startsWith('/') ? route : '/' + route}`, {
    method: "GET",
  });
};

export const postApiData = async ({ apiId, route, body }: { apiId: string; route: string; body: Record<string, unknown> }) => {
  return api<unknown>(`api/${apiId}${route.startsWith('/') ? route : '/' + route}`, {
    method: "POST",
    body: body,
  });
};

export const putApiData = async ({ apiId, route, elementId, body }: { apiId: string; route: string; elementId: string | number; body: Record<string, unknown> }) => {
  return api<unknown>(`api/${apiId}${route.startsWith('/') ? route : '/' + route}/${elementId}`, {
    method: "PUT",
    body: body,
  });
};

export const patchApiData = async ({ apiId, route, elementId, body }: { apiId: string; route: string; elementId: string | number; body: Record<string, unknown> }) => {
  return api<unknown>(`api/${apiId}${route.startsWith('/') ? route : '/' + route}/${elementId}`, {
    method: "PATCH",
    body: body,
  });
};

export const deleteApiData = async ({ apiId, route, elementId }: { apiId: string; route: string; elementId: string | number }) => {
  return api<unknown>(`api/${apiId}${route.startsWith('/') ? route : '/' + route}/${elementId}`, {
    method: "DELETE",
  });
};
