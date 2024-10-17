import { useQuery } from "@tanstack/react-query";
import { getMatches } from "../functions/matchFn";

export const useGetMatches = (clubId: number, leagueId: number) => {
  return useQuery({
    queryKey: ["matchesData"],
    queryFn: () => getMatches(clubId, leagueId),
  });
};
