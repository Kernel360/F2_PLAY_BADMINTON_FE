import type {
  ClubParams,
  GetClubDetailsResponse,
  GetClubListData,
  GetClubListResponse,
  GetPopularClubListData,
  GetPopularClubListResponse,
  PatchClubRequest,
  PatchClubResponse,
  PostClubRequest,
  PostClubResponse,
} from "@/types/clubTypes";
import restClient from "../restClient";

// export async function getClubs({
//   pageParam,
//   size,
//   sort,
// }: {
//   pageParam: unknown;
//   size: number;
//   sort: string;
// }): Promise<GetClubListResponse> {
//   return restClient.get<GetClubListResponse>(
//     `/clubs?page=${pageParam}&size=${size}&sort=${sort}`,
//   );
// }

export const getClubs = async ({
  pageParam,
  size,
  sort,
}: {
  pageParam: unknown;
  size: number;
  sort: string;
}) => {
  const res = await fetch(
    `https://apit.badminton.run/v1/clubs?page=${pageParam}&size=${size}&sort=${sort}`,
  );
  return res.json();
};

export const getPopularClubs =
  async (): Promise<GetPopularClubListResponse> => {
    return restClient.get<GetPopularClubListResponse>("/clubs/popular");
  };

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
