import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type CommonResponse<T> =
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

  useEffect(() => {
    if (queryResult.error) {
      toast({
        title: "오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  }, [queryResult.error, toast]);

  if (queryResult.data?.result === "SUCCESS") {
    return { isLoading: queryResult.isLoading, data: queryResult.data?.data };
  }

  return { isLoading: queryResult.isLoading, data: undefined };
};

export default useQueryWithToast;
