import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetClubsApplicants } from "@/lib/api/hooks/clubHook";
import type { GetClubApplicants } from "@/types/clubTypes";
import { getTierWithEmojiAndText } from "@/utils/getTier";

interface ClubMemberApplicantsProps {
  role: string; // ROLE_OWNER, ROLE_MANAGER 등
  clubId: string;
  onOpenModal: (applicant: GetClubApplicants) => void;
}

function ClubMemberApplicants({
  role,
  clubId,
  onOpenModal,
}: ClubMemberApplicantsProps) {
  const { data: applicants } = useGetClubsApplicants(clubId, 9, {
    enabled: role === "ROLE_OWNER",
  });

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-black">
          동호회 참여 신청
        </CardTitle>
      </CardHeader>
      <CardContent>
        {applicants && applicants.length > 0 ? (
          <ScrollArea className="h-64">
            <Table className="relative">
              <TableHeader>
                <TableRow className="bg-white hover:bg-white">
                  <TableHead className="w-[150px] text-center">회원</TableHead>
                  <TableHead className="w-[100px] text-center">티어</TableHead>
                  <TableHead className="text-center"> </TableHead>
                  <TableHead className="text-center"> </TableHead>
                  <TableHead className="text-center"> </TableHead>
                  <TableHead className="text-center"> </TableHead>
                  <TableHead className="w-[120px] text-center"> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow
                    key={applicant.club_apply_id}
                    className="hover:bg-white"
                  >
                    <TableCell className="text-black text-center">
                      <div className="flex gap-2 items-center justify-start">
                        <img
                          src={applicant.profile_image}
                          alt="userImg"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <p
                                className="truncate max-w-[150px]"
                                title={applicant.name}
                              >
                                {applicant.name}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{applicant.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell className="text-black text-center">
                      {getTierWithEmojiAndText(applicant.tier)}
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="link"
                        onClick={() => onOpenModal(applicant)}
                        className="text-gray-500 p-0 h-fit cursor-pointer"
                      >
                        관리
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <div className="min-h-[200px] flex justify-center items-center text-center text-gray-500 mt-4">
            <p>현재 신청자가 없습니다</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ClubMemberApplicants;
