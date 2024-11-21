import type { components } from "@/schemas/schema";
import type {
  GetClubMemberCheckData,
  GetClubMemberListData,
  PatchClubMemberBanData,
  PatchClubMemberBanRequest,
  PatchClubMemberExpelData,
  PatchClubMemberExpelRequest,
  PatchClubMemberRoleData,
  PatchClubMemberRoleRequest,
  PostClubMemberData,
  PostClubMemberRequest,
} from "@/types/clubMemberTypes";
import { useQueryClient } from "@tanstack/react-query";
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
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = (role: PatchClubMemberRoleRequest) =>
    patchClubMembersRole(role, clubId, clubMemberId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["clubMembers"] });
    onSuccess();
  };

  return useMutationWithToast<
    PatchClubMemberRoleData,
    PatchClubMemberRoleRequest
  >(mutationFn, onSuccessCallback);
};

export const usePatchClubMembersExpel = (
  clubId: string,
  clubMemberId: number,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = (expelReason: PatchClubMemberExpelRequest) =>
    patchClubMembersExpel(expelReason, clubId, clubMemberId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["clubMembers"] });
    onSuccess();
  };

  return useMutationWithToast<
    PatchClubMemberExpelData,
    PatchClubMemberExpelRequest
  >(mutationFn, onSuccessCallback);
};

export const usePatchClubMembersBan = (
  clubId: string,
  clubMemberId: number,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = (ban: PatchClubMemberBanRequest) =>
    patchClubMembersBan(ban, clubId, clubMemberId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["clubMembers"] });
    onSuccess();
  };

  return useMutationWithToast<
    PatchClubMemberBanData,
    PatchClubMemberBanRequest
  >(mutationFn, onSuccessCallback);
};
