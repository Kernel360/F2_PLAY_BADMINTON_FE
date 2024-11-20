"use client";

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

interface MemberBanDialogProps {
  clubId: string;
  clubMemberId: number;
}

function MemberBanDialog({ clubId, clubMemberId }: MemberBanDialogProps) {
  const [banReason, setBanReason] = useState<string>("");
  const [banType, setBanType] = useState<string>("");

  const handleBanTypeChange = (type: string) => {
    setBanType(type);
  };

  return (
    <Dialog>
      <DialogTrigger>회원 제재</DialogTrigger>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-900">
            회원 제재
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            회원을 제재하기 위해 사유를 입력하고 정지 유형을 선택하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {/* 제재 사유 입력 */}
          <div>
            <label
              htmlFor="ban-reason"
              className="block text-sm font-medium text-gray-700"
            >
              제재 사유
            </label>
            <textarea
              id="ban-reason"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="제재 사유를 입력하세요 (최소 2자, 최대 100자)"
              className="mt-1 w-full rounded-md border resize-none text-black p-2 focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* 정지 유형 선택 */}
          <div>
            <p className="block text-sm font-medium text-gray-700">정지 유형</p>
            <RadioGroup
              value={banType}
              onValueChange={handleBanTypeChange}
              className="space-y-3 mt-2"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  id="three-days"
                  value="THREE_DAYS"
                  className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
                />
                <label
                  htmlFor="three-days"
                  className="text-gray-800 cursor-pointer"
                >
                  3일 정지
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  id="seven-days"
                  value="SEVEN_DAYS"
                  className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
                />
                <label
                  htmlFor="seven-days"
                  className="text-gray-800 cursor-pointer"
                >
                  7일 정지
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  id="two-weeks"
                  value="TWO_WEEKS"
                  className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
                />
                <label
                  htmlFor="two-weeks"
                  className="text-gray-800 cursor-pointer"
                >
                  14일 정지
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter className="flex justify-end space-x-2 mt-6 gap-2">
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button variant="default">확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MemberBanDialog;
