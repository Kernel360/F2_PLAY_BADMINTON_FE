import type {
  GetActivityClubListResponse,
  GetClubApplicantsResponse,
  GetClubDetailsResponse,
  GetClubListResponse,
  GetPopularClubListResponse,
  GetRecentlyClubListResponse,
  PatchClubRequest,
  PatchClubResponse,
  PostClubRequest,
  PostClubResponse,
} from "@/types/clubTypes";
import restClient from "../restClient";

export const getClubs = async ({
  pageParam,
  size,
  sort,
}: {
  pageParam: unknown;
  size: number;
  sort: string;
}) => {
  return restClient.get<GetClubListResponse>(
    `/clubs?page=${pageParam}&size=${size}&sort=${sort}`,
  );
};

export const getSearchClubs = async ({
  pageParam,
  size,
  sort,
  keyword,
}: {
  pageParam: unknown;
  size: number;
  sort: string;
  keyword: string;
}) => {
  return restClient.get<GetClubListResponse>(
    `/clubs/search?page=${pageParam}&size=${size}&sort=${sort}&keyword=${keyword}`,
  );
};

export const getPopularClubs =
  async (): Promise<GetPopularClubListResponse> => {
    return restClient.get<GetPopularClubListResponse>("/clubs/popular");
  };

export const getActivityClubs =
  async (): Promise<GetActivityClubListResponse> => {
    return restClient.get<GetActivityClubListResponse>("/clubs/activity");
  };

export const getRecentlyClubs =
  async (): Promise<GetRecentlyClubListResponse> => {
    return restClient.get<GetRecentlyClubListResponse>("/clubs/recently");
  };

export const postClubs = async (
  clubData: PostClubRequest,
): Promise<PostClubResponse> => {
  return restClient.post<PostClubResponse>("/clubs", clubData);
};

export const postClubsImg = async (clubImg: FormData): Promise<string> => {
  return restClient.postImage<string>("/clubs/images", clubImg);
};

export const getClubsById = async (
  clubId: string,
): Promise<GetClubDetailsResponse> => {
  return restClient.get<GetClubDetailsResponse>(`/clubs/${clubId}`);
};

export const patchClubs = async (
  clubUpdateData: PatchClubRequest,
  clubId: string,
): Promise<PatchClubResponse> => {
  return restClient.patch<PatchClubResponse>(
    `/clubs/${clubId}`,
    clubUpdateData,
  );
};

export const getClubsApplicants = async (
  clubId: string,
): Promise<GetClubApplicantsResponse> => {
  return restClient.get<GetClubApplicantsResponse>(
    `/clubs/${clubId}/applicants`,
  );
};
