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
import React, { useState } from "react";

interface MemberRoleChangeDialogProps {
  clubId: string;
  clubMemberId: number;
}

function MemberRoleChangeDialog({
  clubId,
  clubMemberId,
}: MemberRoleChangeDialogProps) {
  const [selectedRole, setSelectedRole] = useState<string>("ROLE_USER");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <Dialog>
      <DialogTrigger>역할 변경</DialogTrigger>
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
                동호회 관리자
              </label>
            </div>
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
          </RadioGroup>
        </div>
        <DialogFooter className="flex justify-end space-x-2 mt-6 gap-2">
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button
            variant="default"
            onClick={() => console.log("Selected Role:", selectedRole)}
          >
            변경
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MemberRoleChangeDialog;
