'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react';

function ClubManagePage() {
  const [imagePreview, setImagePreview] = useState('/images/dummy-image.jpg');
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
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex space-x-8 w-full">
        <div className="flex flex-col items-center gap-4">
          <form>
            <button
              type="button"
              onClick={handleImageClick}
              className="focus:outline-none"
            >
              <img
                src={imagePreview}
                alt="preview"
                className="object-cover w-96 h-96 rounded-md"
              />
            </button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </form>
          <input
            type="text"
            className="rounded-md w-full text-black"
            placeholder="기존 동호회 이름"
          />
        </div>
        <textarea
          placeholder="기존 소개글"
          className="rounded-md flex-1 outline-none text-black overflow:scroll placeholder-gray-400"
        />
      </div>
      <button
        type="button"
        className="px-8 py-3 bg-primary rounded-md font-bold"
      >
        수정
      </button>
    </div>
  );
}

export default ClubManagePage;
