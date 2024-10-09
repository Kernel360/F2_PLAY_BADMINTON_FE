import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type React from "react";
import { useState } from "react";

interface MemberRollChange {
  openRollChange: boolean;
  handleRollDialog: () => void;
}

function MemberRollChange({
  openRollChange,
  handleRollDialog,
}: MemberRollChange) {
  const [selectedRole, setSelectedRole] = useState("");

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
      id: 1,
      name: "멤버",
    },
  ];

  return (
    <Dialog open={openRollChange}>
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
          <DialogClose asChild>
            <Button type="button" className="w-1/3" onClick={handleRollDialog}>
              교체
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MemberRollChange;
