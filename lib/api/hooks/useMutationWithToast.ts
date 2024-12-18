"use client";
import { useToast } from "@/hooks/use-toast";
import type { ErrorCode } from "@/types/errorCode";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface CommonResponse<T> {
  result?: "SUCCESS" | "FAIL";
  data?: T;
  errorCode?: ErrorCode;
  error_message_for_log?: string;
  error_message_for_client?: string;
}

const useMutationWithToast = <TData, TRequestBody>(
  mutationFn: (requestBody: TRequestBody) => Promise<CommonResponse<TData>>,
  onSuccessCallback?: (data: TData) => void,
): {
  isSuccess: boolean;
  isPending: boolean;
  data: TData | undefined;
  mutate: (requestBody: TRequestBody) => void;
} => {
  const { toast } = useToast();
  const [dataResult, setDataResult] = useState(false);

  const mutationResult = useMutation<
    CommonResponse<TData>,
    Error,
    TRequestBody
  >({
    mutationFn,
    onSuccess: (data) => {
      if (data.result === "SUCCESS" && data.data) {
        onSuccessCallback?.(data.data);
        setDataResult(true);
      }
      if (data.result === "FAIL") {
        toast({
          title: data.error_message_for_client,
          variant: "destructive",
        });
        setDataResult(false);
      }
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    isSuccess: dataResult,
    isPending: mutationResult.isPending,
    data: mutationResult.data?.data,
    mutate: mutationResult.mutate,
  };
};

export default useMutationWithToast;
