"use client";

import { Button } from "@/components/ui/Button";
import type React from "react";
import { useRef, useState } from "react";

function CreateClubPage() {
  const [imagePreview, setImagePreview] = useState("/images/dummy-image.jpg");
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
    <div className="px-14 pt-8 w-full">
      <div className="flex flex-col gap-4">
        <p className="text-gray-400">동호회 이름</p>
        <input
          type="text"
          className="w-full text-gray-400 text-2xl bg-transparent outline-none border-gray-300 border-b-[1px] focus:border-gray-800"
          placeholder="동호회 이름을 작성해주세요"
        />
      </div>
      <div className=" w-full pt-8 flex flex-col gap-4 text-gray-400">
        <p>동호회 사진</p>
        <div>
          <form className="border-gray-400 rounded-md h-[400px] w-[400px]">
            <button
              type="button"
              className="h-full w-full"
              onClick={handleImageClick}
            >
              <img
                alt="previewImg"
                src={imagePreview}
                className="object-contain border-2 border-gray-400 rounded-md w-full h-full"
              />
            </button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </form>
        </div>
      </div>
      <div className="flex flex-col pt-8 gap-4">
        <p className="text-gray-400">동호회 소개</p>
        <textarea
          placeholder="동호회 소개를 작성해주세요!"
          className="w-full rounded-md border-2 border-gray-400 resize-none"
        />
      </div>
      <div className="flex justify-center items-center pt-8 gap-4">
        <Button variant="outline" size="lg">
          취소
        </Button>
        <Button size="lg">완료</Button>
      </div>
      <div className="m-12" />
    </div>
  );
}

export default CreateClubPage;
