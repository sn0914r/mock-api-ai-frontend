import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getApiData } from "../../api";

export const useGetFakeApiDataQuery = (
  apiId: string, 
  route: string,
  options?: Omit<UseQueryOptions<unknown, unknown, unknown, unknown>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["fake_api_data", apiId, route],
    queryFn: () => getApiData({ apiId, route }),
    ...options,
  });
};
