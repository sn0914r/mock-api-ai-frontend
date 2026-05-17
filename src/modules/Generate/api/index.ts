import { apiClient as api } from "../../../lib/apiClient";

interface GenerateApiData {
  apiId: string;
  route: string;
  apiUrl: string;
}

export const generateApi = async ({
  prompt,
  limit,
}: {
  prompt: string;
  limit: number;
}) => {
  return api<GenerateApiData>("/generate", {
    method: "POST",
    body: { prompt, limit },
  });
};
