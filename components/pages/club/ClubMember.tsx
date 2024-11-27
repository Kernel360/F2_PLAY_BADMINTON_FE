"use client";

import Spinner from "@/components/Spinner";
import ClubMemberApplicants from "@/components/club/ClubMemberApplicants";
import ClubMemberApprovalDialog from "@/components/club/ClubMemberApprovalDialog";
import ClubMemberList from "@/components/club/ClubMemberList";
import { useGetClubsApplicants } from "@/lib/api/hooks/clubHook";
import {
  useGetClubMembers,
  useGetClubMembersCheck,
} from "@/lib/api/hooks/clubMemberHook";
import type { GetClubApplicantsData } from "@/types/clubTypes";
import { useParams } from "next/navigation";
import { useState } from "react";

function ClubMember() {
  const { clubId } = useParams();
  const { data: members, isLoading: membersLoading } = useGetClubMembers(
    clubId as string,
  );
  const { data: isJoined, isLoading: isJoinedLoading } = useGetClubMembersCheck(
    clubId as string,
  );
  const { data: applicants } = useGetClubsApplicants(clubId as string, {
    enabled: isJoined?.data?.role === "ROLE_OWNER",
  });
  const [selectedApplicant, setSelectedApplicant] =
    useState<GetClubApplicantsData | null>(null);

  const handleModalOpen = (applicant: GetClubApplicantsData) => {
    setSelectedApplicant(applicant);
  };

  const handleModalClose = () => {
    setSelectedApplicant(null);
  };

  if (membersLoading || isJoinedLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-6">
      {applicants && (
        <ClubMemberApplicants
          applicants={applicants}
          onOpenModal={handleModalOpen}
        />
      )}
      {members && isJoined?.data && (
        <ClubMemberList
          members={members}
          isJoined={isJoined.data}
          clubId={clubId as string}
        />
      )}
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
