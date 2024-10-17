import type { components } from "@/schemas/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getIsClubMember,
  getMembersMyPage,
  postMembersProfileImage,
  putMembersProfileImage,
} from "../functions/memberFn";

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
    queryFn: getMembersMyPage,
    enabled: isEnabled,
  });
};

export const usePostMembersProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileImage: FormData) =>
      postMembersProfileImage(profileImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPageData"] });
    },
    onError: (error: Error) => alert(error),
  });
};

export const usePutMembersProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileImage: MemberImageUpdate) =>
      putMembersProfileImage(profileImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPageData"] });
    },
    onError: (error: Error) => alert(error),
  });
};
