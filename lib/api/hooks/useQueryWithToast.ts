import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// type CommonResponse<T> =
//   | {
//       result: "SUCCESS";
//       data: T;
//     }
//   | {
//       result: "FAIL";
//       message: string;
//       error_code: string;
//     };

interface CommonResponse<T> {
  result?: "SUCCESS" | "FAIL";
  data?: T;
  message?: string;
  error_code?: string;
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
    if (queryResult.error) {
      toast({
        title: queryResult.error.message,
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
