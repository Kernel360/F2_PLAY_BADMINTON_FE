import type {
  GetMemberMachesRecordData,
  GetMemberMyClubsData,
  GetMemberMyPageData,
  PutMemberProfileData,
  PutMemberProfileRequest,
} from "@/types/memberTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMembersMatchesRecord,
  getMembersMyClubs,
  getMembersMyPage,
  getMembersSession,
  postMembersProfileImage,
  putMembersProfile,
} from "../functions/memberFn";
import useMutationWithToast from "./useMutationWithToast";
import useQueryWithToast from "./useQueryWithToast";

export const useGetMembersSession = () => {
  return useQuery({
    queryKey: ["mySession"],
    queryFn: async () => {
      const result = await getMembersSession();

      if (result.result === "FAIL") {
        return null;
      }
      return result.data;
    },
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
