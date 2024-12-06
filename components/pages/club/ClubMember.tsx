"use client";

import Spinner from "@/components/Spinner";
import ClubMemberApplicants from "@/components/club/ClubMemberApplicants";
import ClubMemberApprovalDialog from "@/components/club/ClubMemberApprovalDialog";
import ClubMemberBanList from "@/components/club/ClubMemberBanList";
import ClubMemberList from "@/components/club/ClubMemberList";
import { useGetClubsApplicants } from "@/lib/api/hooks/clubHook";
import {
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

  const [selectedApplicant, setSelectedApplicant] =
    useState<GetClubApplicants | null>(null);

  const handleModalOpen = (applicant: GetClubApplicants) => {
    setSelectedApplicant(applicant);
  };

  const handleModalClose = () => {
    setSelectedApplicant(null);
  };

  if (isJoinedLoading) {
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {isJoined?.data?.role === "ROLE_OWNER" && (
        <ClubMemberApplicants
          role={isJoined?.data?.role}
          clubId={clubId as string}
          onOpenModal={handleModalOpen}
        />
      )}
      {isJoined?.data && (
        <ClubMemberList clubId={clubId as string} isJoined={isJoined.data} />
      )}

      <ClubMemberBanList clubId={clubId as string} />

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
