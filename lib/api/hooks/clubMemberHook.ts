import type { components } from "@/schemas/schema";
import type {
  GetClubMemberCheckData,
  GetClubMemberListData,
  PostClubMemberData,
  PostClubMemberRequest,
} from "@/types/clubMemberTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClubMembers,
  getClubMembersCheck,
  patchClubMembersBan,
  patchClubMembersExpel,
  patchClubMembersRole,
  postClubMembers,
} from "../functions/clubMemberFn";
import useMutationWithToast from "./useMutationWithToast";
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

export const usePostClubMembers = (clubId: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const mutationFn = (applyReason: PostClubMemberRequest) =>
    postClubMembers(clubId, applyReason);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["clubMembers"] });
    onSuccess();
  };

  return useMutationWithToast<PostClubMemberData, PostClubMemberRequest>(
    mutationFn,
    onSuccessCallback,
  );
};

export const usePatchClubMembersRole = (
  clubId: string,
  clubMemberId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (role: ClubMemberRoleUpdate) =>
      patchClubMembersRole(role, clubId, clubMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubMembers"] });
    },
    onError: (error: Error) => alert(error),
  });
};

export const usePatchClubMembersExpel = (
  clubId: string,
  clubMemberId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expelReason: ClubMemberExpelUpdate) =>
      patchClubMembersExpel(expelReason, clubId, clubMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubMembers"] });
    },
    onError: (error: Error) => alert(error),
  });
};

export const usePatchClubMembersBan = (
  clubId: string,
  clubMemberId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ban: ClubMemberBanUpdate) =>
      patchClubMembersBan(ban, clubId, clubMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubMembers"] });
    },
    onError: (error: Error) => alert(error),
  });
};
