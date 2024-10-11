"use client";

import ClubInfoInputDescription from "@/components/common/clubInfoInput/ClubInfoInputDescription";
import ClubInfoInputImage from "@/components/common/clubInfoInput/ClubInfoInputImage";
import ClubInfoInputName from "@/components/common/clubInfoInput/ClubInfoInputName";
import { Button } from "@/components/ui/Button";
import type { components } from "@/schemas/schema";
import type React from "react";
import { useRef, useState } from "react";

function CreateClubPage() {
  const [imagePreview, setImagePreview] = useState("/images/dummy-image.jpg");
  const [clubName, setClubName] = useState("");
  const [text, setText] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO(iamgyu): 서버로 이미지 업로드 로직 추가
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="px-14 pt-8 w-full">
      <div className="flex space-x-8 w-full h-[464px] items-center">
        <ClubInfoInputImage
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
        />
        <div className="flex flex-col flex-1 h-[400px] gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-black font-bold text-lg">동호회 이름</p>
            <ClubInfoInputName
              clubName={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 h-full">
            <p className="text-black font-bold text-lg">동호회 소개</p>
            <ClubInfoInputDescription
              description={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button variant="outline" size="lg">
          취소
        </Button>
        <Button size="lg">완료</Button>
      </div>
    </div>
  );
}

export default CreateClubPage;
