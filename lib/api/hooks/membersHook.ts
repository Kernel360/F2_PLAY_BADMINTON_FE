import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../functions/membersFn";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });
};
