"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLanyardData, type LanyardResponse } from "@/lib/lanyard";

export function useLanyard() {
  const { data, error, isLoading } = useQuery<LanyardResponse>({
    queryKey: ["lanyard"],
    queryFn: fetchLanyardData,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    staleTime: 0
  });

  return {
    data: data?.data,
    isLoading,
    error: error as Error | null
  };
}
