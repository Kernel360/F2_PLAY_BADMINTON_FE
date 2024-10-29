import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatchClubMembersRole } from "@/lib/api/hooks/clubMemberHook";
import type { components } from "@/schemas/schema";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";

interface MemberRoleModalProps {
  clubMemberId: number;
  openRoleModal: boolean;
  handleRoleModal: () => void;
}

type ClubMemberRoleUpdate =
  components["schemas"]["ClubMemberRoleUpdateRequest"];

function MemberRoleModal({
  clubMemberId,
  openRoleModal,
  handleRoleModal,
}: MemberRoleModalProps) {
  const pathname = usePathname();
  const clubId = Number(pathname.split("/")[2]);
  const [selectedRole, setSelectedRole] = useState("");
  const { mutate: patchClubMembersRole } = usePatchClubMembersRole(
    clubId,
    clubMemberId,
  );

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
  };

  const roles = [
    {
      id: 2,
      name: "매니저",
    },
    {
      id: 3,
      name: "회원",
    },
  ];

  const changeRoleWord = (role: string) => {
    switch (role) {
      case "매니저":
        return "ROLE_MANAGER";
      case "회원":
        return "ROLE_USER";
      default:
        return "";
    }
  };

  const handleMemberRole = (memberRoll: string) => {
    patchClubMembersRole(
      {
        role: memberRoll as
          | "ROLE_OWNER"
          | "ROLE_MANAGER"
          | "ROLE_USER"
          | undefined,
      },
      {
        onSuccess: () => {
          alert("멤버 역할 변경이 완료되었습니다.");
          handleRoleModal();
        },
      },
    );
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
          <button
            type="button"
            className="bg-primary text-white rounded-md px-6 py-2"
            onClick={() => handleMemberRole(changeRoleWord(selectedRole))}
          >
            교체
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MemberRoleModal;
