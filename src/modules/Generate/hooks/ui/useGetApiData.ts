import { useGetFakeApiDataQuery } from "../../../Playground/hooks/api/useGetFakeApiDataQuery";
import { normalizeRoute } from "../../../../utils/normalizeRoute";
import { type GeneratedApiDataI } from "./useGenerateForm";

export const useGetApiData = (data: GeneratedApiDataI | null) => {
  const apiId = data?.apiId || "";
  const route = data?.route || "";
  const fullUrl = data?.fullUrl || "";

  const nRoute = normalizeRoute(route);
  const { data: serverResponse, isLoading: isFetchingData } =
    useGetFakeApiDataQuery(apiId, nRoute);

  return {
    isFetchingData,
    data: serverResponse?.data?.data_json || null,
    schema: serverResponse?.data?.schema_json || null,
    details: {
      apiId,
      route: nRoute,
      created: serverResponse?.data?.created_at || "N/A",
      fullUrl,
      items: serverResponse?.data?.data_json?.length || 0,
    },
  };
};
