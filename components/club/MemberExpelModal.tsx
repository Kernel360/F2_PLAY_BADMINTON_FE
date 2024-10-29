import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatchClubMembersExpel } from "@/lib/api/hooks/clubMemberHook";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MemberExpelModalProps {
  clubMemberId: number;
  openExpelModal: boolean;
  handleExpelModal: () => void;
}

function MemberExpelModal({
  clubMemberId,
  openExpelModal,
  handleExpelModal,
}: MemberExpelModalProps) {
  const pathname = usePathname();
  const clubId = Number(pathname.split("/")[2]);
  const [expelReason, setExpelReason] = useState("");
  const { mutate: patchClubMembersExpel } = usePatchClubMembersExpel(
    clubId,
    clubMemberId,
  );

  const handleMemberExpel = (expelReason: string) => {
    patchClubMembersExpel(
      {
        expel_reason: expelReason,
      },
      {
        onSuccess: () => {
          alert("멤버 내보내기가 정상적으로 완료되었습니다.");
          handleExpelModal();
        },
      },
    );
  };

  return (
    <Dialog open={openExpelModal} onOpenChange={handleExpelModal}>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>멤버 내보내기</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full items-center">
          <input
            type="text"
            className="w-full px-2 py-2 mb-4 border border-gray-400 rounded-md"
            placeholder="내보내는 이유"
            onChange={(e) => setExpelReason(e.target.value)}
          />
          <button
            type="button"
            className="bg-primary text-white rounded-md px-6 py-2"
            onClick={() => handleMemberExpel(expelReason)}
          >
            내보내기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MemberExpelModal;
