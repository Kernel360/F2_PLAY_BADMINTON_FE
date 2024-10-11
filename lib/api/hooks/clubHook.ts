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
    onError: (error) => {
      console.error("Error during club posting:", error);
      // 추가적인 오류 처리 로직을 여기에 추가할 수 있습니다.
    },
  });
};
