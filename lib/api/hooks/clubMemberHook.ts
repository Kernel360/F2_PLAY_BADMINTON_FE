import { useQuery } from "@tanstack/react-query";
import { getClubMembers } from "../functions/clubMemberFn";

export const useGetClubMembers = (clubId: number) => {
  return useQuery({
    queryKey: ["clubMembersData"],
    queryFn: () => getClubMembers(clubId),
  });
};
