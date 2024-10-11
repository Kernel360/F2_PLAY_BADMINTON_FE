import { getClubs, postClubs } from "@/lib/api/functions/clubFn";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetClubs = () => {
  return useQuery({
    queryKey: ["clubsData"],
    queryFn: getClubs,
  });
};

export const usePostClubs = () => {
  return useMutation({
    mutationFn: postClubs,
    onError: (error: Error) => {
      console.error("클럽 생성 중 오류:", error.message);
    },
  });
};
