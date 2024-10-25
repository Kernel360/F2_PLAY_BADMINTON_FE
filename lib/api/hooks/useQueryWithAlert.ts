import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useQueryWithAlert = (queryKey: string[], queryFn: () => void) => {
  const { toast } = useToast();
  const { error, ...rest } = useQuery({ queryKey, queryFn });

  useEffect(() => {
    if (error) {
      toast({
        title: "오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return rest;
};

export default useQueryWithAlert;
