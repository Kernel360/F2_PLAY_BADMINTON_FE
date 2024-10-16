import { useQuery } from "@tanstack/react-query";
import { getIsClubMember, getMembersMyPage } from "../functions/memberFn";

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
