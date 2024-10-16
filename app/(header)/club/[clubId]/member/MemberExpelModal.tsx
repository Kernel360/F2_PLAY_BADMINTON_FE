import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type React from "react";
import { useState } from "react";

interface MemberExpelModalProps {
  openExpelModal: boolean;
  handleExpelModal: () => void;
}

function MemberExpelModal({
  openExpelModal,
  handleExpelModal,
}: MemberExpelModalProps) {
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
          />
          <DialogClose className="bg-primary text-white rounded-md px-6 py-2">
            내보내기
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MemberExpelModal;
