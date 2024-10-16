import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClubMembers, postClubMembers } from "../functions/clubMemberFn";

export const useGetClubMembers = () => {
  return useQuery({
    queryKey: ["clubMembersData"],
    queryFn: getClubMembers,
  });
};

export const usePostClubMembers = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postClubMembers(clubId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubMembersData"] });
    },
    onError: (error: Error) => alert(error),
  });
};
