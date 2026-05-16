import { useMutation } from "@tanstack/react-query";
import { deleteApiData } from "../../api";

export const useDeleteFakeApiDataMutation = () => {
  return useMutation({
    mutationFn: deleteApiData,
  });
};
