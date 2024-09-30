import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/textarea';

function LeagueModal() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="w-[100vw]">
        <DialogHeader>
          <DialogTitle>일정 제목</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <h2>일정 제목</h2>
          <div className="flex gap-4">
            <Button>b1</Button>
            <Button>b2</Button>
            <Button>b3</Button>
          </div>
        </div>
        <Textarea>내용</Textarea>
        <div className="flex gap-4 w-full">
          <span className="flex justify-center w-1/2 px-4 border-2 border-gray-400 rounded-md">
            00월 00일 00시
          </span>
          <span className="flex justify-center w-1/2 px-4 border-2 border-gray-400 rounded-md">
            00체육관
          </span>
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          상/중/하/아무나
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          00월 00일 00시 까지 모집
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          0명 / N명
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          단식/복식
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          대진표 생성
        </div>
        <div>
          <p>경기결과</p>
          <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
            경기결과
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LeagueModal;
