import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  usePostClubMemberApprove,
  usePostClubMemberReject,
} from "@/lib/api/hooks/clubMemberHook";
import type { GetClubApplicants } from "@/types/clubTypes";
import React from "react";

interface ClubMemberApprovalDialogProps {
  clubId: string;
  applicant: GetClubApplicants;
  onClose: () => void;
}

function ClubMemberApprovalDialog({
  clubId,
  applicant,
  onClose,
}: ClubMemberApprovalDialogProps) {
  const { mutate: approveApplicant } = usePostClubMemberApprove(
    clubId,
    onClose,
  );

  const { mutate: rejectApplicant } = usePostClubMemberReject(clubId, onClose);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger>관리</DialogTrigger>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-900">
            가입 승인
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            가입 신청한 회원을 승인하거나 거절할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex flex-col items-center mt-10 gap-6">
            <Avatar className="w-24 h-24 rounded-full border-4 border-white shadow-lg">
              <AvatarImage src={applicant.profile_image} alt={applicant.name} />
              <AvatarFallback>{applicant.name}</AvatarFallback>
            </Avatar>
            <p className="text-center text-2xl font-semibold text-gray-800">
              {applicant.name}
            </p>

            <p className="text-center text-sm text-gray-600 mt-4 leading-relaxed px-4">
              {applicant.apply_reason}
            </p>
          </div>
        </div>
        <DialogFooter className="flex w-full justify-center sm:justify-center space-x-2 mt-6 gap-2">
          <Button
            variant="ghost"
            onClick={() => rejectApplicant(applicant.club_apply_id)}
          >
            거절
          </Button>
          <Button
            variant="default"
            onClick={() => approveApplicant(applicant.club_apply_id)}
          >
            승인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ClubMemberApprovalDialog;
