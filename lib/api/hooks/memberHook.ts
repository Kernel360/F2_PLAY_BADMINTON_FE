import {
  getMembersMatchesRecord,
  getMembersMyClubs,
  getMembersMyPage,
  getMembersSession,
  postMembersProfileImage,
  putMembersProfile,
} from "@/lib/api/functions/memberFn";
import useMutationWithToast from "@/lib/api/hooks/useMutationWithToast";
import useQueryWithToast from "@/lib/api/hooks/useQueryWithToast";
import type {
  GetMemberMachesRecordData,
  GetMemberMyPageData,
  PutMemberProfileData,
  PutMemberProfileRequest,
} from "@/types/memberTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMembersSession = () => {
  return useQuery({
    queryKey: ["mySession"],
    queryFn: getMembersSession,
  });
};

export const useGetMembersMyPage = () => {
  return useQueryWithToast<GetMemberMyPageData>(["myPage"], getMembersMyPage);
};

export const useGetMembersMyClubs = () => {
  return useQuery({
    queryKey: ["myClubs"],
    queryFn: getMembersMyClubs,
  });
};

export const useGetMembersMatchesRecord = () => {
  return useQueryWithToast<GetMemberMachesRecordData>(
    ["matchesRecord"],
    getMembersMatchesRecord,
  );
};

export const usePostMembersProfileImage = () => {
  return useMutation({
    mutationFn: (profileImage: FormData) => {
      return postMembersProfileImage(profileImage);
    },
    onError: (error: Error) => alert(error),
  });
};

export const usePutMembersProfile = (onSuccess: () => void) => {
  const mutationFn = (profileImage: PutMemberProfileRequest) =>
    putMembersProfile(profileImage);

  const queryClient = useQueryClient();

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["myPage"] });
    queryClient.invalidateQueries({ queryKey: ["mySession"] });
    onSuccess();
  };

  return useMutationWithToast<PutMemberProfileData, PutMemberProfileRequest>(
    mutationFn,
    onSuccessCallback,
  );
};
