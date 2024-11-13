import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatchClubMembersBan } from "@/lib/api/hooks/clubMemberHook";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

interface MemberSuspendedModalProps {
  clubMemberId: number;
  openSuspendedModal: boolean;
  handleSuspendedModal: () => void;
}

function MemberSuspendedModal({
  clubMemberId,
  openSuspendedModal,
  handleSuspendedModal,
}: MemberSuspendedModalProps) {
  const { clubId } = useParams();
  const [selectedSuspendedDay, setSelectedSuspendedDay] = useState(0);
  const [banReason, setBanReason] = useState("");
  const { mutate: patchClubMembersBan } = usePatchClubMembersBan(
    clubId as string,
    clubMemberId,
  );

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSuspendedDay(Number(e.target.value));
  };

  const days = [
    {
      id: 1,
      day: 3,
    },
    {
      id: 2,
      day: 7,
    },
    {
      id: 3,
      day: 14,
    },
  ];

  const changeBanDay = (days: number) => {
    switch (days) {
      case 3:
        return "THREE_DAYS";
      case 7:
        return "SEVEN_DAYS";
      case 14:
        return "TWO_WEEKS";
      default:
        return "";
    }
  };

  const handleMemberSuspended = (banDay: string, banReason: string) => {
    patchClubMembersBan(
      {
        type: banDay as
          | "THREE_DAYS"
          | "SEVEN_DAYS"
          | "TWO_WEEKS"
          | "PERMANENT"
          | undefined,
        banned_reason: banReason,
      },
      {
        onSuccess: () => {
          alert("멤버 정지가 정상적으로 완료되었습니다.");
          handleSuspendedModal();
        },
      },
    );
  };

  return (
    <Dialog open={openSuspendedModal} onOpenChange={handleSuspendedModal}>
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
            onChange={(e) => {
              setBanReason(e.target.value);
            }}
          />
          <button
            type="button"
            className="bg-primary text-white rounded-md px-6 py-2"
            onClick={() =>
              handleMemberSuspended(
                changeBanDay(selectedSuspendedDay),
                banReason,
              )
            }
          >
            정지
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MemberSuspendedModal;
