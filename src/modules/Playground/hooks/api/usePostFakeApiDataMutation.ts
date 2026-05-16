import { useMutation } from "@tanstack/react-query";
import { postApiData } from "../../api";

export const usePostFakeApiDataMutation = () => {
  return useMutation({
    mutationFn: postApiData,
  });
};
