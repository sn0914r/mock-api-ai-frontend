import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApiData } from "../../api";

export const useDeleteFakeApiDataMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteApiData,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["fake_api_data"] });
    },
  });
};
