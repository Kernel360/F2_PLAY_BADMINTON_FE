"use client";
import { useToast } from "@/hooks/use-toast";
import type { ErrorCode } from "@/types/errorCode";
import { type QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface CommonResponse<T> {
  result?: "SUCCESS" | "FAIL";
  data?: T;
  errorCode?: ErrorCode;
  errorMessageForLog?: string;
  errorMessageForClient?: string;
}

const useQueryWithToast = <TData>(
  queryKey: string[],
  queryFn: () => Promise<CommonResponse<TData>>,
): {
  isLoading: boolean;
  data: TData | undefined;
  refetch: () => Promise<QueryObserverResult<CommonResponse<TData>>>;
} => {
  const { toast } = useToast();
  const queryResult = useQuery<CommonResponse<TData>>({ queryKey, queryFn });

  useEffect(() => {
    if (queryResult.data?.result === "FAIL") {
      toast({
        title: queryResult.data?.errorMessageForClient,
        variant: "destructive",
      });
    }
  }, [queryResult.data, toast]);

  // if (queryResult.data?.result === "SUCCESS") {
  //   return { isLoading: queryResult.isLoading, data: queryResult.data?.data };
  // }

  return {
    isLoading: queryResult.isLoading,
    data: queryResult.data?.data,
    refetch: queryResult.refetch,
  };
};

export default useQueryWithToast;
