import {
  getClubs,
  getClubsById,
  patchClubs,
  postClubs,
  postClubsImg,
} from "@/lib/api/functions/clubFn";
import type { components } from "@/schemas/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useQueryWithAlert from "./useQueryWithAlert";

type ClubCreate = components["schemas"]["ClubCreateRequest"];
type ClubUpdate = components["schemas"]["ClubUpdateRequest"];
type ClubsData = components["schemas"]["PageClubCardResponse"];

export const useGetClubs = () => {
  return useQueryWithAlert<ClubsData>(["clubsData"], getClubs);
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

export const useGetClubsById = (clubId: number) => {
  return useQuery({
    queryKey: ["clubsDataById", clubId],
    queryFn: () => getClubsById(clubId),
  });
};

export const usePatchClubs = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clubUpdateData: ClubUpdate) =>
      patchClubs(clubUpdateData, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubsData"] });
      queryClient.invalidateQueries({ queryKey: ["clubsDataById"] });
    },
    onError: (error: Error) => alert(error),
  });
};
