import type {
  GetClubDetailsResponse,
  GetClubListData,
  GetClubListResponse,
  PatchClubRequest,
  PatchClubResponse,
  PostClubRequest,
  PostClubResponse,
} from "@/types/clubTypes";
import restClient from "../restClient";

export async function getClubs({ pageParam }): Promise<GetClubListResponse> {
  const { page, size, sort } = pageParam;
  return restClient.get<GetClubListResponse>(
    `/clubs?page=${page}&size=${size}&sort=${sort}`,
  );
}

export const postClubs = async (
  clubData: PostClubRequest,
): Promise<PostClubResponse> => {
  return restClient.post<PostClubResponse>("/clubs", JSON.stringify(clubData));
};

export const postClubsImg = async (clubImg: FormData): Promise<string> => {
  return restClient.postImage<string>("/clubs/images", clubImg);
};

export const getClubsById = async (
  clubId: number,
): Promise<GetClubDetailsResponse> => {
  return restClient.get<GetClubDetailsResponse>(`/clubs/${clubId}`);
};

export const patchClubs = async (
  clubUpdateData: PatchClubRequest,
  clubId: number,
): Promise<PatchClubResponse> => {
  return restClient.patch<PatchClubResponse>(
    `/clubs/${clubId}`,
    JSON.stringify(clubUpdateData),
  );
};
