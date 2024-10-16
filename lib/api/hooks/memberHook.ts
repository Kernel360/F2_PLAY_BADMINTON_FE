import { useQuery } from "@tanstack/react-query";
import { getIsClubMember } from "../functions/memberFn";

export const useGetIsClubMember = () => {
  return useQuery({
    queryKey: ["isClubMemberData"],
    queryFn: getIsClubMember,
  });
};
