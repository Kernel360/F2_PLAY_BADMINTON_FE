"use client";

import ClubMemberApplicantsList from "@/components/club/ClubMemberApplicantsList";
import ClubMemberApprovalDialog from "@/components/club/ClubMemberApprovalDialog";
import ClubMemberBanList from "@/components/club/ClubMemberBanList";
import ClubMemberList from "@/components/club/ClubMemberList";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetClubsApplicants } from "@/lib/api/hooks/clubHook";
import {
  useGetClubBanMembers,
  useGetClubMembers,
  useGetClubMembersCheck,
} from "@/lib/api/hooks/clubMemberHook";
import type { GetClubApplicants } from "@/types/clubTypes";
import { useParams } from "next/navigation";
import { useState } from "react";

function ClubMember() {
  const { clubId } = useParams();

  const { data: isJoined, isLoading: isJoinedLoading } = useGetClubMembersCheck(
    clubId as string,
  );
  const {
    data: applicants,
    fetchNextPage: fetchApplicantsNextPage,
    hasNextPage: hasApplicantsNextPage,
    isLoading: applicantsLoading,
  } = useGetClubsApplicants(clubId as string, 9, {
    enabled: !isJoinedLoading && isJoined?.data?.role === "ROLE_OWNER",
  });

  const {
    data: members,
    fetchNextPage: fetchMembersNextPage,
    hasNextPage: hasMembersNextPage,
    isLoading: membersLoading,
  } = useGetClubMembers(clubId as string, 9);

  const {
    data: bannedMembers,
    fetchNextPage: fetchBannedMembersNextPage,
    hasNextPage: hasBannedMembersNextPage,
    isLoading: bannedMembersLoading,
  } = useGetClubBanMembers(clubId as string, 9);

  // Combine loading states
  const isLoading =
    isJoinedLoading ||
    applicantsLoading ||
    membersLoading ||
    bannedMembersLoading;

  // Dialog state management
  const [selectedApplicant, setSelectedApplicant] =
    useState<GetClubApplicants | null>(null);

  const handleModalOpen = (applicant: GetClubApplicants) => {
    setSelectedApplicant(applicant);
  };

  const handleModalClose = () => {
    setSelectedApplicant(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {isJoined?.data?.role === "ROLE_OWNER" && (
        <ClubMemberApplicantsList
          applicants={applicants}
          fetchNextPage={fetchApplicantsNextPage}
          hasNextPage={hasApplicantsNextPage}
          onOpenModal={handleModalOpen} // Pass the modal open handler
        />
      )}
      {isJoined?.data && (
        <ClubMemberList
          clubId={clubId as string}
          members={members}
          fetchNextPage={fetchMembersNextPage}
          hasNextPage={hasMembersNextPage}
          isJoined={isJoined.data}
        />
      )}
      <ClubMemberBanList
        bannedMembers={bannedMembers}
        fetchNextPage={fetchBannedMembersNextPage}
        hasNextPage={hasBannedMembersNextPage}
      />

      {selectedApplicant && (
        <ClubMemberApprovalDialog
          applicant={selectedApplicant}
          clubId={clubId as string}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default ClubMember;
