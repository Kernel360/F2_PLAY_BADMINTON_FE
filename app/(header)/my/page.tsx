"use client";

import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { ImagePlus, ImageUp, ScanSearch } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import MyOneGameResult from "./MyOneGameResult";

const matches = [
  {
    id: 1,
    opponentName: "a",
    result: "WIN",
    matchDate: "2024-09-15",
  },
  {
    id: 2,
    opponentName: "a",
    result: "WIN",
    matchDate: "2024-09-15",
  },
  {
    id: 3,
    opponentName: "a",
    result: "LOSE",
    matchDate: "2024-09-15",
  },
  {
    id: 4,
    opponentName: "a",
    result: "LOSE",
    matchDate: "2024-09-15",
  },
  {
    id: 5,
    opponentName: "a",
    result: "LOSE",
    matchDate: "2024-09-15",
  },
  {
    id: 6,
    opponentName: "a",
    result: "WIN",
    matchDate: "2024-09-15",
  },
  {
    id: 7,
    opponentName: "a",
    result: "WIN",
    matchDate: "2024-09-15",
  },
];

function My() {
  const [infoUpdate, setInfoUpdate] = useState(false);
  const [userImg, setUserImg] = useState("/images/dummy-image.jpg");
  const [userName, setUserName] = useState("유저이름");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO(iamgyu): 서버로 이미지 업로드 로직 추가
      const imageUrl = URL.createObjectURL(file);
      setUserImg(imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleInfoUpdate = () => {
    setInfoUpdate(!infoUpdate);
    if (infoUpdate === true) {
      alert("내용 수정을 완료하였습니다.");
      /* TODO(iamgyu): UPDATE API 호출*/
    }
  };

  const ImageUpdate = () => {
    if (infoUpdate) {
      return (
        <div className="relative w-64 h-64 rounded-full">
          <img
            alt="previewImg"
            src={userImg}
            className="object-cover w-full h-full rounded-full"
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div className="absolute bottom-2 right-2">
            <IconButton radius="round" size="lg" onClick={handleImageClick}>
              <ImagePlus width={"80%"} height={"80%"} />
            </IconButton>
          </div>
        </div>
      );
    }

    return (
      <img
        src={userImg}
        alt="userImg"
        className="object-cover w-64 h-64 rounded-full"
      />
    );
  };

  return (
    <div className="mt-8 px-16 py-8 border border-gray-400 rounded-md">
      <div className="flex justify-between">
        <div className="flex items-center gap-12">
          <ImageUpdate />
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center gap-4">
              {/* if문 사용 시 useEffect를 사용해야되고 그럴 시 biome 에러로 인해 로직이 복잡해지는 상황 */}
              {infoUpdate ? (
                <input
                  type="text"
                  className="text-black text-lg rounded-md border border-gray-400 px-1"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  maxLength={16}
                />
              ) : (
                <p className="text-black font-bold text-lg">{userName}</p>
              )}
            </div>
            <div className="flex justify-between items-center gap-4">
              <p className="text-black font-bold text-lg">소속 동호회 이름</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-black font-bold text-lg">티어</p>
              <img
                src="/images/tier-gold.png"
                alt="userTier"
                className="w-8 h-8"
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              <p className="text-black font-bold text-lg">전적</p>
              <p className="text-black">00전 | 00승 | 00무 | 00패</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {infoUpdate ? (
            <Button onClick={handleInfoUpdate}>수정 완료</Button>
          ) : (
            <Button onClick={handleInfoUpdate}>정보 수정</Button>
          )}
          <Button
            variant="outline"
            className="border-gray-400 hover:bg-red-500 text-red-500"
          >
            동호회 탈퇴
          </Button>
        </div>
      </div>
      <div className="w-full mt-8">
        <p className="text-black font-bold text-xl">경기 결과</p>
        <div className="flex flex-col mt-2 w-full h-64 overflow-scroll px-8 py-4 border border-gray-400 rounded-md gap-4">
          {matches.map((match) => (
            <MyOneGameResult key={match.id} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default My;
