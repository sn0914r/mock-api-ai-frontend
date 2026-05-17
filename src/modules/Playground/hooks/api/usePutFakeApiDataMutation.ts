import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putApiData } from "../../api";

export const usePutFakeApiDataMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: putApiData,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["fake_api_data"] });
    },
  });
};
