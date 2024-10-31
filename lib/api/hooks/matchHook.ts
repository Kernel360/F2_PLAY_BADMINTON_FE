import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postMatches } from "../functions/matchFn";

// export const useGetMatches = (clubId: number, leagueId: number) => {
//   return useQuery({
//     queryKey: ["matchesData"],
//     queryFn: () => getMatches(clubId, leagueId),
//   });
// };

export const usePostMatches = (clubId: number, leagueId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postMatches(clubId, leagueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchesData"] });
      queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    },
    onError: (error: Error) => alert(error),
  });
};
