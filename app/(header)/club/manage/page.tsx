"use client";

import { Button } from "@/components/ui/Button";
import type React from "react";
import { useRef, useState } from "react";

function ClubManagePage() {
  const [imagePreview, setImagePreview] = useState("/images/dummy-image.jpg");
  const [clubName, setClubName] = useState("기존 동호회 이름");
  const [text, setText] = useState(
    "안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.",
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO(iamgyu): 서버로 이미지 업로드 로직 추가
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleImageDelete = () => {
    setImagePreview("/images/dummy-image.jpg");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-4">
      <Button className="absolute right-0 top-0">변경 저장</Button>
      <div className="flex space-x-8 w-full">
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-400">동호회 사진</p>
              <img
                src={imagePreview}
                alt="preview"
                className="object-cover w-80 h-56 rounded-md"
              />
            </div>
            <div className="flex ml-8 gap-4">
              <div>
                <Button onClick={handleImageClick}>사진 교체</Button>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
              <Button
                onClick={handleImageDelete}
                className="border border-red-500 text-red-500 bg-white hover:bg-white"
              >
                사진 삭제
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-gray-400">동호회 이름</p>
            <input
              type="text"
              className="border border-gray-400 rounded-md text-full px-1 py-2 text-black outline-none"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-gray-400">동호회 소개</p>
            <textarea
              className="border border-gray-400 rounded-md w-full p-1 outline-none text-black overflow:scroll resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubManagePage;
