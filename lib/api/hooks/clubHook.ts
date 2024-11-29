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
import useQueryWithToast from "@/lib/api/hooks/useQueryWithToast";
import type {
  ClubCardResponse,
  GetClubApplicantsData,
  GetClubDetailData,
  GetClubListResponse,
  PatchClubRequest,
  PostClubData,
  PostClubRequest,
  PostClubResponse,
} from "@/types/clubTypes";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useMutationWithToast from "./useMutationWithToast";

export const useGetClubs = (size: number, sort: string) => {
  return useInfiniteQuery<GetClubListResponse>({
    queryKey: ["clubList", size, sort],
    queryFn: ({ pageParam }) => getClubs({ pageParam, size, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return !lastPage?.data?.last ? pages.length : null;
    },
  });
};

export const useGetSearchClubs = (
  size: number,
  sort: string,
  keyword: string,
) => {
  return useInfiniteQuery<GetClubListResponse>({
    queryKey: ["searchClubList", size, sort, keyword],
    queryFn: ({ pageParam }) =>
      getSearchClubs({ pageParam, size, sort, keyword }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return !lastPage?.data?.last ? pages.length : null;
    },
  });
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

export const usePatchClubs = (clubId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clubUpdateData: PatchClubRequest) =>
      patchClubs(clubUpdateData, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubList"] });
      queryClient.invalidateQueries({ queryKey: ["clubsDataById", clubId] });
    },
    onError: (error: Error) => alert(error),
  });
};

export const useGetClubsApplicants = (
  clubId: string,
  options?: { enabled?: boolean },
) => {
  return useQueryWithToast<GetClubApplicantsData[]>(
    ["clubsApplicants"],
    () => getClubsApplicants(clubId),
    options,
  );
};
