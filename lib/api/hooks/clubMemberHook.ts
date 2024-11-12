import type { components } from "@/schemas/schema";
import type {
  GetClubMemberCheckData,
  GetClubMemberListData,
} from "@/types/clubMemberTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClubMembers,
  getClubMembersCheck,
  patchClubMembersBan,
  patchClubMembersExpel,
  patchClubMembersRole,
  postClubMembers,
  // postClubMembers,
} from "../functions/clubMemberFn";
import useQueryWithToast from "./useQueryWithToast";

type ClubMemberRoleUpdate =
  components["schemas"]["ClubMemberRoleUpdateRequest"];
type ClubMemberExpelUpdate = components["schemas"]["ClubMemberExpelRequest"];
type ClubMemberBanUpdate = components["schemas"]["ClubMemberBanRequest"];

export const useGetClubMembers = (clubId: string) => {
  return useQueryWithToast<GetClubMemberListData>(["clubMembers"], () =>
    getClubMembers(clubId),
  );
};

export const useGetClubMembersCheck = (clubId: string) => {
  return useQueryWithToast<GetClubMemberCheckData>(["clubMembersCheck"], () =>
    getClubMembersCheck(clubId),
  );
};

export const usePostClubMembers = (clubId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postClubMembers(clubId),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["clubMembersData"] });
    // },
    // onError: (error: Error) => alert(error),
  });
};

export const usePatchClubMembersRole = (
  clubId: number,
  clubMemberId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (role: ClubMemberRoleUpdate) =>
      patchClubMembersRole(role, clubId, clubMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubMembersData"] });
    },
    onError: (error: Error) => alert(error),
  });
};

export const usePatchClubMembersExpel = (
  clubId: number,
  clubMemberId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expelReason: ClubMemberExpelUpdate) =>
      patchClubMembersExpel(expelReason, clubId, clubMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubMembersData"] });
    },
    onError: (error: Error) => alert(error),
  });
};

export const usePatchClubMembersBan = (
  clubId: number,
  clubMemberId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ban: ClubMemberBanUpdate) =>
      patchClubMembersBan(ban, clubId, clubMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubMembersData"] });
    },
    onError: (error: Error) => alert(error),
  });
};

// export const usePostClubMembers = (clubId: number) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => postClubMembers(clubId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["clubMembersData"] });
//       queryClient.invalidateQueries({ queryKey: ["clubsDataById"] });
//       queryClient.invalidateQueries({ queryKey: ["isClubMemberData"] });
//       queryClient.invalidateQueries({ queryKey: ["myInfo"] });
//     },
//     onError: (error: Error) => alert(error),
//   });
// };
