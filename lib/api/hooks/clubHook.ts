import { getClubs } from "@/lib/api/functions/clubFn";
import { useQuery } from "@tanstack/react-query";

export const useClubs = () => {
  return useQuery({
    queryKey: ["clubsData"],
    queryFn: getClubs,
  });
};
