import { useToast } from "@/hooks/use-toast";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useQueryWithAlert = <TData>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
): UseQueryResult<TData> => {
  const { toast } = useToast();
  const queryResult = useQuery({ queryKey, queryFn });

  useEffect(() => {
    if (queryResult.error) {
      toast({
        title: "오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  }, [queryResult.error, toast]);

  return queryResult;
};

export default useQueryWithAlert;
