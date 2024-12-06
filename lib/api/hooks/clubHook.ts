import {
  getActivityClubs,
  getClubs,
  getClubsApplicants,
  getClubsById,
  getPopularClubs,
  getRecentlyClubs,
  getSearchClubs,
  patchClubs,
  postClubs,
  postClubsImg,
} from "@/lib/api/functions/clubFn";
import useInfiniteQueryReturnFlattenData from "@/lib/api/hooks/useInfiniteQueryReturnFlattenData";
import useQueryWithToast from "@/lib/api/hooks/useQueryWithToast";
import type {
  ClubCardResponse,
  GetClubApplicants,
  GetClubApplicantsData,
  GetClubDetailData,
  GetClubList,
  GetClubListResponse,
  PatchClubData,
  PatchClubRequest,
  PostClubData,
  PostClubRequest,
} from "@/types/clubTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useMutationWithToast from "./useMutationWithToast";

export const useGetClubs = (size: number, sort: string) => {
  return useInfiniteQueryReturnFlattenData<GetClubList>(
    ["clubList", size, sort],
    ({ pageParam }) => getClubs({ pageParam, size, sort }),
    0,
  );
};

export const useGetSearchClubs = (
  size: number,
  sort: string,
  keyword: string,
) => {
  return useInfiniteQueryReturnFlattenData<GetClubList>(
    ["searchClubList", size, sort, keyword],
    ({ pageParam }) => getSearchClubs({ pageParam, size, sort, keyword }),
    0,
  );
};

export const useGetPopularClubs = () => {
  return useQueryWithToast<ClubCardResponse[]>(["clubsPopularData"], () =>
    getPopularClubs(),
  );
};

export const useGetActivityClubs = () => {
  return useQueryWithToast<ClubCardResponse[]>(["clubsActivityData"], () =>
    getActivityClubs(),
  );
};

export const useGetRecentlyClubs = () => {
  return useQueryWithToast<ClubCardResponse[]>(["clubsRecentlyData"], () =>
    getRecentlyClubs(),
  );
};

export const usePostClubs = (onSuccess: (clubToken: string) => void) => {
  const queryClient = useQueryClient();

  const mutationFn = (clubData: PostClubRequest) => postClubs(clubData);

  const onSuccessCallback = (data: PostClubData) => {
    if (data.club_token) {
      queryClient.invalidateQueries({ queryKey: ["clubList"] });
      onSuccess(data.club_token);
    }
  };

  return useMutationWithToast<PostClubData, PostClubRequest>(
    mutationFn,
    onSuccessCallback,
  );
};

export const usePostClubsImg = () => {
  return useMutation({
    mutationFn: (clubImg: FormData) => postClubsImg(clubImg),
    onError: (error: Error) => alert(error),
  });
};

export const useGetClubsById = (clubId: string) => {
  return useQueryWithToast<GetClubDetailData>(["clubsDataById", clubId], () =>
    getClubsById(clubId),
  );
};

export const usePatchClubs = (clubId: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const mutationFn = (clubUpdateData: PatchClubRequest) =>
    patchClubs(clubUpdateData, clubId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["clubList"] });
    queryClient.invalidateQueries({ queryKey: ["clubsDataById", clubId] });
    onSuccess();
  };

  return useMutationWithToast<PatchClubData, PatchClubRequest>(
    mutationFn,
    onSuccessCallback,
  );
};

export const useGetClubsApplicants = (
  clubId: string,
  size: number,
  options?: { enabled?: boolean },
) => {
  return useInfiniteQueryReturnFlattenData<GetClubApplicants>(
    ["clubsApplicants", size],
    ({ pageParam }) => getClubsApplicants(clubId, pageParam, size),
    0,
    options,
  );
};
