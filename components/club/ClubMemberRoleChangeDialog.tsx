import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePatchClubMembersRole } from "@/lib/api/hooks/clubMemberHook";
import type { MemberRole } from "@/types/memberTypes";
import React, { useState } from "react";

interface ClubMemberRoleChangeDialogProps {
  clubId: string;
  clubMemberId: number;
  memberRole: MemberRole;
}

function ClubMemberRoleChangeDialog({
  clubId,
  clubMemberId,
  memberRole,
}: ClubMemberRoleChangeDialogProps) {
  const [selectedRole, setSelectedRole] = useState<MemberRole>(memberRole);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: patchClubMembersRole } = usePatchClubMembersRole(
    clubId as string,
    clubMemberId,
    () => {
      alert("역할 변경이 완료되었습니다");
      setDialogOpen(false);
    },
  );

  const handleRoleChange = (role: MemberRole) => {
    setSelectedRole(role);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-gray-500">
          역할 변경
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-900">
            역할 변경
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            회원의 역할을 변경할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {/* Radio Group */}
          <RadioGroup
            value={selectedRole}
            onValueChange={handleRoleChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                id="role-owner"
                value="ROLE_OWNER"
                className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
              />
              <label
                htmlFor="role-owner"
                className="text-gray-800 cursor-pointer"
              >
                동호회 회장
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                id="role-manager"
                value="ROLE_MANAGER"
                className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
              />
              <label
                htmlFor="role-manager"
                className="text-gray-800 cursor-pointer"
              >
                동호회 매니저
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                id="role-user"
                value="ROLE_USER"
                className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
              />
              <label
                htmlFor="role-user"
                className="text-gray-800 cursor-pointer"
              >
                일반 회원
              </label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter className="flex justify-end space-x-2 mt-6 gap-2">
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button
            variant="default"
            onClick={() => patchClubMembersRole({ role: selectedRole })}
          >
            변경
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ClubMemberRoleChangeDialog;
