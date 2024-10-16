import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type React from "react";
import { useState } from "react";

interface MemberRoleModalProps {
  clubMemberId: number;
  openRoleModal: boolean;
  handleRoleModal: () => void;
}

function MemberRoleModal({
  openRoleModal,
  handleRoleModal,
}: MemberRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState("");

  console.log(selectedRole);
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
  };

  const roles = [
    {
      id: 1,
      name: "회장",
    },
    {
      id: 2,
      name: "매니저",
    },
    {
      id: 3,
      name: "멤버",
    },
  ];

  const changeRoleWord = (role: string) => {
    switch (role) {
      case "회장":
        return "ROLE_OWNER";
      case "매니저":
        return "ROLE_MANAGER";
      case "회원":
        return "ROLE_MANAGER";
      default:
        return "";
    }
  };

  return (
    <Dialog open={openRoleModal} onOpenChange={handleRoleModal}>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>멤버 역할 교체</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full items-center">
          <div className="flex pb-4 gap-8">
            {roles.map((role) => (
              <div key={role.id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={role.name}
                    checked={selectedRole === role.name}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  {role.name}
                </label>
              </div>
            ))}
          </div>
          <DialogClose className="bg-primary text-white rounded-md px-6 py-2">
            교체
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MemberRoleModal;
