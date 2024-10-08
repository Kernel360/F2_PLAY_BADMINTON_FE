"use client";

import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex space-x-8 w-full h-[464px] items-center">
      <div className="relative w-[400px] h-[400px] flex flex-col items-center box-content rounded-md">
        <Image
          src={imagePreview}
          width={400}
          height={400}
          alt="club image"
          className="rounded-md object-cover w-[400px] h-[400px] "
        />
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <div className="absolute bottom-0 right-0">
          <IconButton radius="sm" size="lg" onClick={handleImageClick}>
            <ImagePlus width={"80%"} height={"80%"} />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-[400px] gap-4">
        <input
          type="text"
          className="text-3xl font-bold text-black border border-gray-300 rounded-md p-1"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />
        <div className="flex flex-col w-full h-full">
          <p className="font-bold text-black text-lg">동호회 소개</p>
          <textarea
            className="rounded-md mt-2 w-full h-full outline-none border border-gray-300 text-gray-600 p-1 overflow:scroll resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button className="place-items-end">변경 저장</Button>
        </div>
      </div>
    </div>
  );
}

export default ClubManagePage;
