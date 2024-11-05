"use client";
import { useToast } from "@/hooks/use-toast";
import type { ErrorCode } from "@/types/errorCode";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface CommonResponse<T> {
  result?: "SUCCESS" | "FAIL";
  data?: T;
  error_code?: ErrorCode;
  error_message_for_log?: string;
  error_message_for_client?: string;
}

const useQueryWithToast = <TData>(
  queryKey: string[],
  queryFn: () => Promise<CommonResponse<TData>>,
): { isLoading: boolean; data: TData | undefined } => {
  const { toast } = useToast();
  const queryResult = useQuery<CommonResponse<TData>>({ queryKey, queryFn });

  useEffect(() => {
    if (queryResult.data?.result === "FAIL") {
      toast({
        title: queryResult.data?.error_message_for_client,
        variant: "destructive",
      });
    }
  }, [queryResult.data, toast]);

  // if (queryResult.data?.result === "SUCCESS") {
  //   return { isLoading: queryResult.isLoading, data: queryResult.data?.data };
  // }

  return { isLoading: queryResult.isLoading, data: queryResult.data?.data };
};

export default useQueryWithToast;
