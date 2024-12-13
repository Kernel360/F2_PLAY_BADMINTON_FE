"use client";

import { useToast } from "@/hooks/use-toast";
import type { CommonResponse } from "@/types/commonTypes";
import { type QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface UseQueryWithToastOptions {
  enabled?: boolean;
  staleTime?: number; // 서버 fetching을 위한 staleTime 설정
}

const useQueryWithToast = <TData>(
  queryKey: string[],
  queryFn: () => Promise<CommonResponse<TData>>,
  options?: UseQueryWithToastOptions,
): {
  isLoading: boolean;
  data: TData | undefined;
  refetch: () => Promise<QueryObserverResult<CommonResponse<TData>>>;
} => {
  const { toast } = useToast();

  const queryResult = useQuery<CommonResponse<TData>>({
    queryKey,
    queryFn,
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
  });

  useEffect(() => {
    if (queryResult.data?.result === "FAIL") {
      toast({
        title: queryResult.data?.error_message_for_client,
        variant: "destructive",
      });
    }
  }, [queryResult.data, toast]);

  return {
    isLoading: queryResult.isLoading,
    data: queryResult.data?.data,
    refetch: queryResult.refetch,
  };
};

export default useQueryWithToast;
