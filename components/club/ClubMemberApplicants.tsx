import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GetClubApplicantsData } from "@/types/clubTypes";
import { getTierWithEmojiAndText } from "@/utils/getTier";

interface ClubMemberApplicantsProps {
  applicants: GetClubApplicantsData[];
  onOpenModal: (applicant: GetClubApplicantsData) => void;
}

function ClubMemberApplicants({
  applicants,
  onOpenModal,
}: ClubMemberApplicantsProps) {
  return (
    <div className="min-h-[200px]">
      <h2 className="text-black font-bold">동호회 참여 신청</h2>
      {applicants.length > 0 ? (
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
                    onClick={() => onOpenModal(applicant)}
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
  );
}

export default ClubMemberApplicants;
