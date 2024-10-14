import { getClubs, postClubs, postClubsImg } from "@/lib/api/functions/clubFn";
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
    },
    onError: (error: Error) => alert(error),
  });
};

export const usePostClubsImg = () => {
  return useMutation<string, Error, FormData>({
    mutationFn: (clubImg: FormData) => postClubsImg(clubImg),
    onError: (error: Error) => alert(error),
  });
};
