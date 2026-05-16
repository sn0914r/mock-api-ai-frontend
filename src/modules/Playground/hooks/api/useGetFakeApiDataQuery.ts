import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getApiData, type FakeApiData } from "../../api";

type QueryKey = readonly ["fake_api_data", string, string];

export const useGetFakeApiDataQuery = (
  apiId: string, 
  route: string,
  options?: Omit<UseQueryOptions<FakeApiData, Error, FakeApiData, QueryKey>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["fake_api_data", apiId, route] as const,
    queryFn: () => getApiData({ apiId, route }),
    ...options,
  });
};
