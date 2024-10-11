import { getClubs, postClubs } from "@/lib/api/functions/clubFn";
import type { components } from "@/schemas/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ClubCreate = components["schemas"]["ClubCreateRequest"];

export const useGetClubs = () => {
  return useQuery({
    queryKey: ["clubsData"],
    queryFn: getClubs,
  });
};

export const usePostClubs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clubData: ClubCreate) => postClubs(clubData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubsData"] });
      console.log("성공");
    },
    onError: () => alert("동호회 생성에 실패했습니다"),
  });
};
