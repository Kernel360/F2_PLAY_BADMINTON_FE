import {
  getActivityClubs,
  getClubs,
  getClubsById,
  getPopularClubs,
  getRecentlyClubs,
  patchClubs,
  postClubs,
  postClubsImg,
} from "@/lib/api/functions/clubFn";
import useQueryWithToast from "@/lib/api/hooks/useQueryWithToast";
import type {
  ClubCardResponse,
  ClubParams,
  GetClubDetailData,
  GetClubDetailsResponse,
  GetClubListData,
  GetClubListResponse,
  GetPopularClubListResponse,
  PatchClubRequest,
  PostClubRequest,
} from "@/types/clubTypes";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetClubs = (size: number, sort: string) => {
  return useInfiniteQuery<GetClubListResponse>({
    queryKey: ["projects", size, sort],
    queryFn: ({ pageParam }) => getClubs({ pageParam, size, sort }),
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
