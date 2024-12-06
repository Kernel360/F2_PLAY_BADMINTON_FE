import useInfiniteQueryReturnFlattenData from "@/lib/api/hooks//useInfiniteQueryReturnFlattenData";
import type {
  GetClubMemberList,
  PatchClubMemberBanData,
  PatchClubMemberBanRequest,
  PatchClubMemberExpelData,
  PatchClubMemberExpelRequest,
  PatchClubMemberRoleData,
  PatchClubMemberRoleRequest,
  PostClubMemberApproveData,
  PostClubMemberData,
  PostClubMemberRejectData,
  PostClubMemberRequest,
} from "@/types/clubMemberTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getClubBanMembers,
  getClubMembers,
  getClubMembersCheck,
  patchClubMembersBan,
  patchClubMembersExpel,
  patchClubMembersRole,
  postClubMembers,
  postClubMembersApprove,
  postClubMembersReject,
} from "../functions/clubMemberFn";
import useMutationWithToast from "./useMutationWithToast";

export const useGetClubMembers = (clubId: string, size: number) => {
  return useInfiniteQueryReturnFlattenData<GetClubMemberList>(
    ["clubMembers", clubId],
    ({ pageParam }) => getClubMembers({ pageParam, clubId, size }),
    0,
  );
};

export const useGetClubBanMembers = (clubId: string, size: number) => {
  return useInfiniteQueryReturnFlattenData<GetClubMemberList>(
    ["clubBanMembers", clubId],
    ({ pageParam }) => getClubBanMembers({ pageParam, clubId, size }),
    0,
  );
};

export const useGetClubMembersCheck = (clubId: string) => {
  return useQuery({
    queryKey: ["clubMembersCheck", clubId],
    queryFn: () => getClubMembersCheck(clubId),
  });
};

export const usePostClubMembers = (clubId: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const mutationFn = (applyReason: PostClubMemberRequest) =>
    postClubMembers(clubId, applyReason);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["clubMembers", clubId] });
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
    queryClient.invalidateQueries({ queryKey: ["clubMembers", clubId] });
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
    queryClient.invalidateQueries({ queryKey: ["clubMembers", clubId] });

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
    queryClient.invalidateQueries({ queryKey: ["clubMembers", clubId] });
    queryClient.invalidateQueries({ queryKey: ["clubBanMembers", clubId] });
    onSuccess();
  };

  return useMutationWithToast<
    PatchClubMemberBanData,
    PatchClubMemberBanRequest
  >(mutationFn, onSuccessCallback);
};

export const usePostClubMemberApprove = (
  clubId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = (clubApplyId: number) =>
    postClubMembersApprove(clubId, clubApplyId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["clubMembers", clubId] });
    queryClient.invalidateQueries({ queryKey: ["clubsApplicants", clubId] });
    onSuccess();
  };

  return useMutationWithToast<PostClubMemberApproveData, number>(
    mutationFn,
    onSuccessCallback,
  );
};

export const usePostClubMemberReject = (
  clubId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = (clubApplyId: number) =>
    postClubMembersReject(clubId, clubApplyId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["clubsApplicants", clubId] });
    onSuccess();
  };

  return useMutationWithToast<PostClubMemberRejectData, number>(
    mutationFn,
    onSuccessCallback,
  );
};
