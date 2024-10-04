"use client";

import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import MyOneGameResult from "./MyOneGameResult";

function My() {
  const [infoUpdate, setInfoUpdate] = useState(false);
  const [userName, setUserName] = useState("유저이름");
  const handleInfoUpdate = () => {
    setInfoUpdate(!infoUpdate);
    if (infoUpdate === true) {
      alert("내용 수정을 완료하였습니다.");
      /* TODO(iamgyu): UPDATE API 호출*/
    }
  };

  return (
    <div className="mt-8 px-16 py-8 border-2 border-gray-400 rounded-md">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <img
            src="/images/dummy-image.jpg"
            alt="userImg"
            className="w-64 h64 rounded-full"
          />
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center gap-4">
              {infoUpdate ? (
                <input
                  type="text"
                  className="text-black text-lg rounded-md"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  maxLength={16}
                />
              ) : (
                <p className="font-bold text-lg">{userName}</p>
              )}
            </div>
            <div className="flex justify-between items-center gap-4">
              <p className="font-bold text-lg">소속 동호회 이름</p>
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
        <div className="flex gap-4">
          <Button onClick={handleInfoUpdate}>정보 수정</Button>
          <Button
            variant="outline"
            className="border-red-500 hover:bg-red-500/80"
          >
            동호회 탈퇴
          </Button>
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
