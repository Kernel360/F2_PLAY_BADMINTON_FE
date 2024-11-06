import type { components } from "@/schemas/schema";
import type {
  GetMemberMachesRecordData,
  GetMemberMyClubsData,
  GetMemberMyPageData,
  GetMemberSessionData,
} from "@/types/memberTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMembersMatchesRecord,
  // getIsClubMember,
  getMembersMyClubs,
  getMembersMyPage,
  getMembersSession,
  postMembersProfileImage,
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

// export const useGetMyInfo = (isEnabled: boolean) => {
//   return useQuery({
//     queryKey: ["myInfo"],
//     queryFn: getMembersMyPage,
//     enabled: isEnabled,
//   });
// };

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

// export const usePutMembersProfileImage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (profileImage: MemberImageUpdate) =>
//       putMembersProfileImage(profileImage),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["myPageData"] });
//     },
//     onError: (error: Error) => alert(error),
//   });
// };
