import type { components } from "@/schemas/schema";
import type {
  GetMemberMachesRecordResponse,
  GetMemberMyClubsResponse,
  GetMemberMyPageData,
  GetMemberMyPageResponse,
  GetMemberSessionResponse,
  PostMembersProfileImageResponse,
  PutMemberProfileRequest,
  PutMemberProfileResponse,
} from "@/types/memberTypes";
import restClient from "../restClient";

export const getMembersSession =
  async (): Promise<GetMemberSessionResponse> => {
    return restClient.get<GetMemberSessionResponse>("/members/session");
  };

export const getMembersMyPage = async (): Promise<GetMemberMyPageResponse> => {
  return restClient.get<GetMemberMyPageResponse>("/members/myPage");
};

export const getMembersMyClubs =
  async (): Promise<GetMemberMyClubsResponse> => {
    return restClient.get<GetMemberMyClubsResponse>("/members/myClubs");
  };

export const getMembersMatchesRecord =
  async (): Promise<GetMemberMachesRecordResponse> => {
    return restClient.get<GetMemberMachesRecordResponse>(
      "/members/matchesRecord",
    );
  };

export const postMembersProfileImage = async (
  profileImage: FormData,
): Promise<PostMembersProfileImageResponse> => {
  return restClient.postImage<PostMembersProfileImageResponse>(
    "/members/profileImage",
    profileImage,
  );
};

export const putMembersProfile = async (
  profile: PutMemberProfileRequest,
): Promise<PutMemberProfileResponse> => {
  return restClient.put<PutMemberProfileResponse>("/members", profile);
};

// export const postMembersProfileImage = async (
//   profileImage: FormData,
// ): Promise<string> => {
//   const response = await fetch(`${BASE_URL}/members/profileImage`, {
//     method: "POST",
//     // headers: { "Content-Type": "multipart/form-data" },
//     credentials: "include",
//     body: profileImage,
//   });

//   if (!response.ok) {
//     throw new Error("프로필 사진을 S3에 업로드를 실패했습니다.");
//   }

//   return response.text();
// };

// export const putMembersProfileImage = async (
//   profileImage: MemberUpdateRequest,
// ): Promise<MemberResponse> => {
//   const response = await fetch(`${BASE_URL}/members/profileImage`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify(profileImage),
//   });

//   if (!response.ok) {
//     throw new Error("프로필 사진 수정에서 에러가 발생하였습니다.");
//   }

//   return response.json();
// };
