"use client";

import Spinner from "@/components/Spinner";
import ClubMemberApprovalDialog from "@/components/club/ClubMemberApprovalDialog";
import ClubMemberList from "@/components/club/ClubMemberList";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetClubsApplicants } from "@/lib/api/hooks/clubHook";
import {
  useGetClubMembers,
  useGetClubMembersCheck,
} from "@/lib/api/hooks/clubMemberHook";
import type { GetClubApplicantsData } from "@/types/clubTypes";
import { getTierWithEmojiAndText } from "@/utils/getTier";
import { useParams } from "next/navigation";
import { useState } from "react";

function ClubMember() {
  const { clubId } = useParams();
  const { data: applicants, isLoading: applicantsLoding } =
    useGetClubsApplicants(clubId as string);
  const { data: members, isLoading: membersLoading } = useGetClubMembers(
    clubId as string,
  );
  const { data: isJoined, isLoading: isJoinedLoading } = useGetClubMembersCheck(
    clubId as string,
  );
  const [selectedApplicant, setSelectedApplicant] =
    useState<GetClubApplicantsData | null>(null);

  const handleModalOpen = (applicant: GetClubApplicantsData) => {
    setSelectedApplicant(applicant);
  };

  const handleModalClose = () => {
    setSelectedApplicant(null);
  };

  if (applicantsLoding || membersLoading || isJoinedLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="min-h-[200px]">
        <h2 className="text-black font-bold">동호회 참여 신청</h2>
        {applicants && applicants.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-white h-16">
                <TableHead className="text-center">회원</TableHead>
                <TableHead className="text-center">티어</TableHead>
                <TableHead className="text-center"> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow
                  key={applicant.club_apply_id}
                  className="hover:bg-white h-16"
                >
                  <TableCell className="text-black">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={applicant.profile_image}
                        alt="userImg"
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="text-black text-center">{applicant.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-black text-center">
                    {getTierWithEmojiAndText(applicant.tier)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="link"
                      onClick={() => handleModalOpen(applicant)}
                      className="text-gray-500"
                    >
                      관리
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="min-h-[200px] flex justify-center items-center text-center text-gray-500 mt-4">
            <p>현재 신청자가 없습니다</p>
          </div>
        )}
      </div>
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
