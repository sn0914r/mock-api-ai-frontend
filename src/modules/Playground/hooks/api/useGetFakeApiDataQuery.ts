import { useQuery } from "@tanstack/react-query";
import { getApiData } from "../../api";

export const useGetFakeApiDataQuery = (apiId: string, route: string) => {
  return useQuery({
    queryKey: ["fake_api_data", apiId, route],
    queryFn: () => getApiData({ apiId, route }),
    enabled: !!apiId && !!route,
  });
};
