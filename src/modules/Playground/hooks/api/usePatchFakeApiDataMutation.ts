import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchApiData } from "../../api";

export const usePatchFakeApiDataMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchApiData,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["fake_api_data"] });
    },
  });
};
