import ClubMemberBanDialog from "@/components/club/ClubMemberBanDialog";
import ClubMemberExpelDialog from "@/components/club/ClubMemberExpelDialog";
import ClubMemberRoleChangeDialog from "@/components/club/ClubMemberRoleChangeDialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  GetClubMemberCheckData,
  GetClubMemberListData,
} from "@/types/clubMemberTypes";

import { getTierWithEmojiAndText } from "@/utils/getTier";

const changeRoleWord = (role: string) => {
  switch (role) {
    case "ROLE_OWNER":
      return <Badge className="bg-zinc-900 text-white">회장</Badge>;
    case "ROLE_MANAGER":
      return <Badge className="bg-zinc-500 text-white">매니저</Badge>;
    case "ROLE_USER":
      return "회원";
    default:
      return "";
  }
};

interface MemberListProps {
  members: GetClubMemberListData;
  isJoined: GetClubMemberCheckData;
  clubId: string;
}

function ClubMemberList({ members, isJoined, clubId }: MemberListProps) {
  const allMembers = [
    ...(members.role_owner ?? []),
    ...(members.role_manager ?? []),
    ...(members.role_user ?? []),
  ];

  return (
    <div className="min-h-[200px]">
      <h2 className="text-black font-bold">동호회 회원</h2>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead className="text-center">역할</TableHead>
            <TableHead>회원</TableHead>
            <TableHead className="text-center">티어</TableHead>
            <TableHead className="text-center">전적</TableHead>
            <TableHead className="text-center">정지 상태</TableHead>
            <TableHead className="text-center"> </TableHead>
            <TableHead className="text-center"> </TableHead>
            <TableHead className="text-center"> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allMembers.map((member) => (
            <TableRow key={member.club_member_id} className="hover:bg-white">
              <TableCell className="text-black text-center">
                {changeRoleWord(member.role ?? "")}
              </TableCell>
              <TableCell className="flex flex-1 gap-2 justify-start items-center">
                <img
                  src={member.image}
                  alt="userImg"
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-black text-center">{member.name}</p>
              </TableCell>
              <TableCell className="text-black text-center">
                {getTierWithEmojiAndText(member.tier as string)}
              </TableCell>
              <TableCell className="text-black text-center">
                {member.league_record.match_count}전 |{" "}
                {member.league_record.win_count}승 |{" "}
                {member.league_record.draw_count}무 |{" "}
                {member.league_record.lose_count}패
              </TableCell>
              <TableCell className="text-black text-center">
                {member.is_banned ? <p className="text-red-500">정지</p> : ""}
              </TableCell>
              {member.role !== "ROLE_OWNER" &&
                isJoined?.role === "ROLE_OWNER" && (
                  <>
                    <TableCell className="text-center">
                      <ClubMemberRoleChangeDialog
                        clubId={clubId}
                        clubMemberId={member.club_member_id}
                        memberRole={member.role}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <ClubMemberBanDialog
                        clubId={clubId}
                        clubMemberId={member.club_member_id}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <ClubMemberExpelDialog
                        clubId={clubId}
                        clubMemberId={member.club_member_id}
                      />
                    </TableCell>
                  </>
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ClubMemberList;
