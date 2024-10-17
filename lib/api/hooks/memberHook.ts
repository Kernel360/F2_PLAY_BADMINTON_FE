import { useQuery } from "@tanstack/react-query";
import { getIsClubMember } from "../functions/memberFn";
import { getMyInfo } from "../functions/membersFn";

export const useGetIsClubMember = () => {
  return useQuery({
    queryKey: ["isClubMemberData"],
    queryFn: getIsClubMember,
  });
};

export const useGetMyInfo = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: isEnabled,
  });
};
