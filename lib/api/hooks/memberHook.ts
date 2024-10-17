import { useQuery } from "@tanstack/react-query";
import { getIsClubMember, getMembersMyPage } from "../functions/memberFn";
import { getMyInfo } from "../functions/membersFn";

export const useGetIsClubMember = () => {
  return useQuery({
    queryKey: ["isClubMemberData"],
    queryFn: getIsClubMember,
  });
};

export const useGetMembersMyPage = () => {
  return useQuery({
    queryKey: ["myPageData"],
    queryFn: getMembersMyPage,
  });
};

export const useGetMyInfo = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: isEnabled,
  });
};
