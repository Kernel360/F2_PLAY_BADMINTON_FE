import Spinner from "@/components/Spinner";
import ClubMemberBanDialog from "@/components/club/ClubMemberBanDialog";
import ClubMemberExpelDialog from "@/components/club/ClubMemberExpelDialog";
import ClubMemberRoleChangeDialog from "@/components/club/ClubMemberRoleChangeDialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { GetClubMemberList } from "@/types/clubMemberTypes";
import { getTierWithEmoji } from "@/utils/getTier";
import { format } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";

const changeRoleWord = (role: string) => {
  switch (role) {
    case "ROLE_OWNER":
      return (
        <Badge className="bg-zinc-900 hover:bg-zinc-900 text-white">회장</Badge>
      );
    case "ROLE_MANAGER":
      return (
        <Badge className="bg-zinc-500 hover:bg-zinc-500 text-white">
          매니저
        </Badge>
      );
    case "ROLE_USER":
      return "회원";
    default:
      return "";
  }
};

interface ClubMemberBanListProps {
  bannedMembers: GetClubMemberList[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

function ClubMemberBanList({
  bannedMembers,
  fetchNextPage,
  hasNextPage,
}: ClubMemberBanListProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-black">
          제재된 동호회 회원
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bannedMembers && bannedMembers.length > 0 ? (
          <ScrollArea className="h-80">
            <Table className="relative">
              <TableHeader className="sticky top-0">
                <TableRow className="bg-white hover:bg-white">
                  <TableHead className="w-[150px] text-center">회원</TableHead>
                  <TableHead className="w-[100px] text-center">티어</TableHead>
                  <TableHead className="w-[120px] text-center">역할</TableHead>
                  <TableHead className="hidden lg:table-cell text-center w-[243px]">
                    전적
                  </TableHead>
                  <TableHead className="hidden xl:table-cell text-center">
                    제재 종료일
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bannedMembers.map((member) => (
                  <TableRow
                    key={member.club_member_id}
                    className="hover:bg-white items-center"
                  >
                    <TableCell className="text-black text-center">
                      <div className="flex gap-2 justify-start items-center">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <p
                                className="text-black truncate max-w-24"
                                title={member.name}
                              >
                                {member.name}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{member.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>

                    <TableCell className="text-black text-center">
                      {getTierWithEmoji(member.tier as string)}
                    </TableCell>

                    <TableCell className="text-black text-center">
                      {changeRoleWord(member.role ?? "")}
                    </TableCell>

                    <TableCell className="hidden lg:table-cell text-black text-center">
                      {member.league_record.match_count}전 |{" "}
                      {member.league_record.win_count}승 |{" "}
                      {member.league_record.draw_count}무 |{" "}
                      {member.league_record.lose_count}패
                    </TableCell>

                    <TableCell className="hidden xl:table-cell text-black text-center">
                      {member.banned_end_date &&
                        format(member.banned_end_date, "yyyy년 MM월 dd일")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* 페이지네이션 */}
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
            <p>제재된 회원이 없습니다</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ClubMemberBanList;
