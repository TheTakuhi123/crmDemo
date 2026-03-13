import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useSecuredAxios } from "./useSecuredAxios";
import { RaynetClient } from "../../models/RaynetClient";

export interface RaynetDetailResponse<T> {
  success: boolean;
  data: T;
}

const detailKey = "client-detail";

export const useGetClientDetail = (
  companyId: number | string | undefined,
  options?: UseQueryOptions<RaynetDetailResponse<RaynetClient>, Error>
) => {
  const securedAxios = useSecuredAxios();

  return useQuery<RaynetDetailResponse<RaynetClient>, Error>({
    queryKey: [detailKey, companyId],
    queryFn: async () => {
      const response = await securedAxios.get(`/company/${companyId}/`);
      return response.data;
    },
    enabled: !!companyId, // jen pokud mám platné id
    staleTime: 1000 * 60 * 10,
    ...options,
  });
};