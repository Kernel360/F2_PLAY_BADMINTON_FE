"use client";

import MemberBanDialog from "@/components/club/MemberBanDialog";
import MemberExpelDialog from "@/components/club/MemberExpelDialog";
import MemberRoleChangeDialog from "@/components/club/MemberRoleChangeDialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetClubMembers } from "@/lib/api/hooks/clubMemberHook";
import { getTierWithEmojiAndText } from "@/utils/getTier";
import { DialogClose } from "@radix-ui/react-dialog";
import { EllipsisVertical } from "lucide-react";
import { useParams } from "next/navigation";

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

function ClubMember() {
  const { clubId } = useParams();
  const { data, isLoading } = useGetClubMembers(clubId as string);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const members = [
    ...(data.role_owner ?? []),
    ...(data.role_manager ?? []),
    ...(data.role_user ?? []),
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-white">
          <TableHead className="text-center">역할</TableHead>
          <TableHead>회원</TableHead>
          <TableHead className="text-center">티어</TableHead>
          <TableHead className="text-center">전적</TableHead>
          <TableHead className="text-center">정지</TableHead>
          <TableHead className="text-center"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
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
            <TableCell className="text-gray-500 text-center cursor-pointer flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="relative flex cursor-pointer select-none items-center justify-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-zinc-100  focus:bg-accent focus:text-accent-foreground ">
                    <MemberRoleChangeDialog
                      clubId={clubId as string}
                      clubMemberId={member.club_member_id}
                    />
                  </div>
                  <div className="relative flex cursor-pointer select-none items-center justify-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-zinc-100  focus:bg-accent focus:text-accent-foreground ">
                    <MemberBanDialog
                      clubId={clubId as string}
                      clubMemberId={member.club_member_id}
                    />
                  </div>
                  <div className="relative flex cursor-pointer select-none items-center justify-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-zinc-100  focus:bg-accent focus:text-accent-foreground ">
                    <MemberExpelDialog
                      clubId={clubId as string}
                      clubMemberId={member.club_member_id}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ClubMember;
