import { Button } from "@/components/ui/Button";
import React from "react";
import MyOneGameResult from "./MyOneGameResult";

function My() {
  return (
    <div className="mt-8 px-16 py-8 border-2 border-gray-400 rounded-md">
      <div className="flex justify-evenly">
        <img
          src="/images/dummy-image.jpg"
          alt="userImg"
          className="w-64 h64 rounded-full"
        />
        <div className="flex flex-col w-1/4 gap-8">
          <div className="flex justify-between items-center gap-4">
            <p className="font-bold text-lg">유저이름</p>
            <Button>수정</Button>
          </div>
          <div className="flex justify-between items-center gap-4">
            <p className="font-bold text-lg">소속 동호회 이름</p>
            <Button>탈퇴</Button>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold text-lg">티어</p>
            <img
              src="/images/tier-gold.png"
              alt="userTier"
              className="w-8 h-8"
            />
          </div>
          <div className="flex gap-4">
            <p className="font-bold text-lg">전적</p>
            <p>00전 | 00승 | 00무 | 00패</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-8">
        <p className="font-bold text-xl">경기 결과</p>
        <div className="flex flex-col mt-2 w-full h-64 overflow-scroll px-8 py-4 border-2 border-gray-400 rounded-md gap-4">
          {/* {Array.from({ length: 30 }, (_, index) => (
            <MyOneGameResult key={index} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default My;
