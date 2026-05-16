import { apiClient as api } from "../../../lib/apiClient";

export const generateApi = async ({
  prompt,
  limit,
}: {
  prompt: string;
  limit: number;
}) => {
  return api<{
    apiId: string;
    route: string;
    apiUrl: string;
  }>("generate", {
    method: "POST",
    body: { prompt, limit },
  });
};
