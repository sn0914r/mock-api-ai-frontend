import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateApi } from "../../api";

export const useGenerateApiMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: generateApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["fake_api_data"] });
    },
  });
};
