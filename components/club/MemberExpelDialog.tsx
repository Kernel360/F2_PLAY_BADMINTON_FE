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
import { useState } from "react";

interface MemberExpelModalProps {
  clubId: string;
  clubMemberId: number;
}

function MemberExpelDialog({ clubId, clubMemberId }: MemberExpelModalProps) {
  const [expelReason, setExpelReason] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger>회원 내보내기</DialogTrigger>
      <DialogContent className="text-black max-w-md p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-900">
            회원 내보내기
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            이 회원을 강제로 탈퇴시키려면 사유를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="expel-reason"
              className="block text-sm font-medium text-gray-700"
            >
              제재 사유
            </label>
            <textarea
              id="expel-reason"
              value={expelReason}
              onChange={(e) => setExpelReason(e.target.value)}
              placeholder="제재 사유를 입력하세요 (최소 2자, 최대 100자)"
              className="mt-1 w-full rounded-md border p-2 resize-none text-black focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-end space-x-2 mt-6 gap-2">
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button variant="default">내보내기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MemberExpelDialog;
