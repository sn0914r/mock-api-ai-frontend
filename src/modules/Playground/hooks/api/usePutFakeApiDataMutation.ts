import { useMutation } from "@tanstack/react-query";
import { putApiData } from "../../api";

export const usePutFakeApiDataMutation = () => {
  return useMutation({
    mutationFn: putApiData,
  });
};
