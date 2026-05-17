import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApiData } from "../../api";

export const usePostFakeApiDataMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postApiData,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["fake_api_data"] });
    },
  });
};
