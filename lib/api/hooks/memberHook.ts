import type { components } from "@/schemas/schema";
import type {
  GetMemberMachesRecordData,
  GetMemberMyClubsData,
  GetMemberMyPageData,
  GetMemberSessionData,
  PutMemberProfileRequest,
} from "@/types/memberTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMembersMatchesRecord,
  // getIsClubMember,
  getMembersMyClubs,
  getMembersMyPage,
  getMembersSession,
  postMembersProfileImage,
  putMembersProfile,
  // putMembersProfileImage,
} from "../functions/memberFn";
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
  return useQueryWithToast<GetMemberMyClubsData[]>(
    ["myClubs"],
    getMembersMyClubs,
  );
};

export const useGetMembersMatchesRecord = () => {
  return useQueryWithToast<GetMemberMachesRecordData[]>(
    ["matchesRecord"],
    getMembersMatchesRecord,
  );
};

export const usePostMembersProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileImage: FormData) => {
      console.log(4);
      return postMembersProfileImage(profileImage);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["myPage"] });
    // },
    onError: (error: Error) => alert(error),
  });
};

export const usePutMembersProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileImage: PutMemberProfileRequest) =>
      putMembersProfile(profileImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPage"] });
      queryClient.invalidateQueries({ queryKey: ["mySession"] });
    },
    onError: (error: Error) => alert(error),
  });
};
