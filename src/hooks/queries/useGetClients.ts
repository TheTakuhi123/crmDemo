import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useSecuredAxios } from "../queries/useSecuredAxios";
import { RaynetClient } from "../../models/RaynetClient";

export interface RaynetResponse<T> {
  success: boolean;
  totalCount: number;
  data: T[];
}

const rootKey = "clients";

type UseGetClientsQueryOptions = UseQueryOptions<RaynetResponse<RaynetClient>, Error>;

type UseGetClientsQueryParams = {
  offset?: number;
  limit?: number;
  fulltext?: string;
};

export const getClientsQueryKey = (params?: UseGetClientsQueryParams) => {
  return [rootKey, params?.fulltext, params?.offset, params?.limit];
};

export const useGetClients = (
  params?: UseGetClientsQueryParams,
  options?: UseGetClientsQueryOptions,
) => {
  const securedAxios = useSecuredAxios();

  return useQuery<RaynetResponse<RaynetClient>, Error>({
    queryKey: getClientsQueryKey(params),
    queryFn: async () => {
      const response = await securedAxios.get("/company/", { 
        params: {
          offset: params?.offset ?? 0,
          limit: params?.limit ?? 100,
          ...(params?.fulltext && { fulltext: params.fulltext })
        } 
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5, 
    ...options,
  });
};