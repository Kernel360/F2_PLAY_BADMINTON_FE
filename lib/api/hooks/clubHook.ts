import { getClubs } from "@/lib/api/functions/clubFn";
import { useQuery } from "@tanstack/react-query";

export default function useClubs() {
  return useQuery({
    queryKey: ["clubsData"],
    queryFn: getClubs,
  });
}
