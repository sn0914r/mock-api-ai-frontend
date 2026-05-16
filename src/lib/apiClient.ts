const BASE_URL = import.meta.env.VITE_API_URL;

interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export const apiClient = async <T = unknown>(
  endPoint: string,
  options: ApiOptions = {},
): Promise<T> => {
  const url = `${BASE_URL}/${endPoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const responseP: {
    success: boolean;
    message?: string;
    data: Record<string, unknown>[];
  } = await response.json();

  if (!responseP.success) {
    throw new Error(responseP.message || "Something went wrong");
  }

  return responseP.data as T;
};
