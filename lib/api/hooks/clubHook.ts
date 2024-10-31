import {
  getClubs,
  getClubsById,
  patchClubs,
  postClubs,
  postClubsImg,
} from "@/lib/api/functions/clubFn";
import type {
  GetClubDetailData,
  GetClubDetailsResponse,
  GetClubListData,
  GetClubListResponse,
  PatchClubRequest,
  PostClubRequest,
} from "@/types/clubTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryWithToast from "./useQueryWithToast";

export const useGetClubs = () => {
  return useQueryWithToast<GetClubListData>(["clubsData"], getClubs);
};

export const usePostClubs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clubData: PostClubRequest) => postClubs(clubData),
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
  return useQueryWithToast<GetClubDetailData>(["clubsDataById"], () =>
    getClubsById(clubId),
  );
};

export const usePatchClubs = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clubUpdateData: PatchClubRequest) =>
      patchClubs(clubUpdateData, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubsData"] });
      queryClient.invalidateQueries({ queryKey: ["clubsDataById"] });
    },
    onError: (error: Error) => alert(error),
  });
};
