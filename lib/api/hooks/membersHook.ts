import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../functions/membersFn";

export const useGetMyInfo = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: isEnabled,
  });
};
