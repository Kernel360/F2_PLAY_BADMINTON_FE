import { useQuery } from "@tanstack/react-query";
import { getClubMembers } from "../functions/clubMemberFn";

export const useGetClubMembers = () => {
  return useQuery({
    queryKey: ["clubMembersData"],
    queryFn: getClubMembers,
  });
};
