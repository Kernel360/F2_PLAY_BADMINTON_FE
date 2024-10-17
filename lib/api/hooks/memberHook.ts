import type { components } from "@/schemas/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getIsClubMember,
  getMembersMyPage,
  postMembersProfileImage,
  putMembersProfileImage,
} from "../functions/memberFn";
import { getMyInfo } from "../functions/membersFn";

type MemberImageUpdate = components["schemas"]["MemberUpdateRequest"];

export const useGetIsClubMember = () => {
  return useQuery({
    queryKey: ["isClubMemberData"],
    queryFn: getIsClubMember,
  });
};

export const useGetMembersMyPage = () => {
  return useQuery({
    queryKey: ["myPageData"],
    queryFn: getMembersMyPage,
  });
};

export const useGetMyInfo = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: isEnabled,
  });
};

export const usePostMembersProfileImage = () => {
  return useMutation({
    mutationFn: (profileImage: FormData) =>
      postMembersProfileImage(profileImage),
    onError: (error: Error) => alert(error),
  });
};

export const usePutMembersProfileImage = () => {
  return useMutation({
    mutationFn: (profileImage: MemberImageUpdate) =>
      putMembersProfileImage(profileImage),
    onError: (error: Error) => alert(error),
  });
};
