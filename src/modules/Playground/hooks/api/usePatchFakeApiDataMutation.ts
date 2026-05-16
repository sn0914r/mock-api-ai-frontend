import { useMutation } from "@tanstack/react-query";
import { patchApiData } from "../../api";

export const usePatchFakeApiDataMutation = () => {
  return useMutation({
    mutationFn: patchApiData,
  });
};
