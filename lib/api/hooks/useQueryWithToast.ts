import { useToast } from "@/hooks/use-toast";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface CommonResponse<T> {
  result?: "SUCCESS" | "FAIL";
  data?: T;
  message?: string;
  error_code?: string;
}

type Hello<T> =
  | {
      result: "SUCCESS";
      data: T;
    }
  | {
      result: "FAIL";
      message: string;
      error_code: string;
    };

const useQueryWithToast = <TData>(
  queryKey: string[],
  queryFn: () => Promise<CommonResponse<TData>>,
): { isLoading: boolean; data: TData | undefined } => {
  const { toast } = useToast();
  const queryResult = useQuery<CommonResponse<TData>>({ queryKey, queryFn });

  // queryResult.data?.error_code
  useEffect(() => {
    if (queryResult.error) {
      toast({
        title: "오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  }, [queryResult.error, toast]);

  return { isLoading: queryResult.isLoading, data: queryResult.data?.data };
};

export default useQueryWithToast;
