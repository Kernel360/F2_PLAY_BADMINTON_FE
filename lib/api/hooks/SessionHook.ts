import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoginState, getLogout } from "../functions/SessionFn";

export const useGetLoginState = () => {
  return useQuery({
    queryKey: ["loginState"],
    queryFn: getLoginState,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loginState"] });
    },
    onError: (error: Error) => alert(error),
  });
};
