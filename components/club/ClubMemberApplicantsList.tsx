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
import type { GetClubApplicants } from "@/types/clubTypes";
import { getTierWithEmoji } from "@/utils/getTier";

interface ClubMemberApplicantsListProps {
  applicants: GetClubApplicants[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  onOpenModal: (applicant: GetClubApplicants) => void; // Modal open handler
}

function ClubMemberApplicantsList({
  applicants,
  fetchNextPage,
  hasNextPage,
  onOpenModal,
}: ClubMemberApplicantsListProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-black">
          동호회 참여 신청
        </CardTitle>
      </CardHeader>
      <CardContent>
        {applicants && applicants.length > 0 ? (
          <ScrollArea className="h-80">
            <Table className="relative">
              <TableHeader className="sticky top-0">
                <TableRow className="bg-white hover:bg-white">
                  <TableHead className="w-[150px] text-center">회원</TableHead>
                  <TableHead className="w-[100px] text-center">티어</TableHead>
                  <TableHead className="hidden md:table-cell text-center" />
                  <TableHead className="hidden lg:table-cell text-center" />
                  <TableHead className="hidden lg:table-cell text-center" />
                  <TableHead className="hidden xl:table-cell text-center" />
                  <TableHead className="w-[120px] text-center" />
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
                      {getTierWithEmoji(applicant.tier)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell" />
                    <TableCell className="hidden lg:table-cell" />
                    <TableCell className="hidden lg:table-cell" />
                    <TableCell className="hidden xl:table-cell" />
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
            {hasNextPage && (
              <div className="w-full flex justify-center items-center p-3">
                <Button
                  type="button"
                  onClick={() => fetchNextPage()}
                  className="mt-4 px-6 py-2 font-semibold rounded-lg duration-300 shadow-md hover:shadow-lg focus:ring-2"
                >
                  더보기
                </Button>
              </div>
            )}
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

export default ClubMemberApplicantsList;
