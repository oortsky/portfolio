import { useQuery } from "@tanstack/react-query";

import {
  fetchLanyardData,
  type LanyardResponse
} from "@/lib/lanyard";

export function useLanyard() {
  const query = useQuery<LanyardResponse>({
    queryKey: ["lanyard"],
    queryFn: fetchLanyardData,
    refetchInterval: 5000
  });

  return {
    data: query.data?.data,
    isLoading: query.isLoading
  };
}