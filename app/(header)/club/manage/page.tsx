"use client";

import ClubInput from "@/components/clubInfoInput/ClubInput";
import type React from "react";
import { useState } from "react";

function ClubManagePage() {
  const [imagePreview, setImagePreview] = useState("/images/dummy-image.jpg");
  const [clubName, setClubName] = useState("기존 동호회 이름");
  const [text, setText] = useState(
    "안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.",
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO(iamgyu): 서버로 이미지 업로드 로직 추가
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <ClubInput
      imagePreview={imagePreview}
      onImageChange={handleImageChange}
      clubName={clubName}
      onChangeName={(e) => setClubName(e.target.value)}
      description={text}
      onChangeDescription={(e) => setText(e.target.value)}
    />
  );
}

export default ClubManagePage;
