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

interface MemberRollChangeProps {
  openSuspended: boolean;
  handleSuspendedDialog: () => void;
}

function MemberSuspended({
  openSuspended,
  handleSuspendedDialog,
}: MemberRollChangeProps) {
  const [selectedSuspendedDay, setSelectedSuspendedDay] = useState(0);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSuspendedDay(Number(e.target.value));
  };

  const days = [
    {
      id: 1,
      day: 7,
    },
    {
      id: 2,
      day: 15,
    },
    {
      id: 3,
      day: 30,
    },
  ];

  return (
    <Dialog open={openSuspended}>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>정지 기간</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full items-center">
          <div className="flex pb-4 gap-8">
            {days.map((day) => (
              <div key={day.id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={day.day}
                    checked={selectedSuspendedDay === day.day}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  {day.day}일
                </label>
              </div>
            ))}
          </div>
          <input
            type="text"
            className="w-full px-2 py-2 mb-4 border border-gray-400 rounded-md"
            placeholder="정지 사유"
          />
          <DialogClose asChild>
            <Button
              type="button"
              className="w-1/3"
              onClick={handleSuspendedDialog}
            >
              정지
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MemberSuspended;
