"use client";

import ClubInfoInputDescription from "@/components/common/clubInfoInput/ClubInfoInputDescription";
import ClubInfoInputImage from "@/components/common/clubInfoInput/ClubInfoInputImage";
import ClubInfoInputName from "@/components/common/clubInfoInput/ClubInfoInputName";
import { Button } from "@/components/ui/Button";
import { usePostClubs, usePostClubsImg } from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Router } from "next/router";
import type React from "react";
import { useState } from "react";

type ClubCreate = components["schemas"]["ClubCreateRequest"];

function CreateClubPage() {
  const [imagePreview, setImagePreview] = useState("/images/dummy-image.jpg");
  const [clubName, setClubName] = useState("");
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState<string>("");

  const { mutate: createClubImg } = usePostClubsImg();
  const { mutate: createClub } = usePostClubs();

  // 이미지 미리보기 설정 함수
  const handleImagePreview = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  // 이미지 업로드 기능
  const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    createClubImg(formData, {
      onSuccess: (data) => {
        setImgUrl(data);
      },
    });
  };

  const onImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImagePreview(file);
      uploadImage(file);
    }
  };

  const handleCreateClub = async () => {
    const newClubData: ClubCreate = {
      club_name: clubName,
      club_description: text,
      club_image: imgUrl,
    };

    createClub(newClubData, {
      onSuccess: () => {
        // TODO(Yejin0O0): 진짜로 수행 되는지 확인해야 함
        redirect("/my-club");
      },
    });
  };

  return (
    <div className="px-14 pt-8 w-full">
      <div className="flex space-x-8 w-full h-[464px] items-center">
        <ClubInfoInputImage
          imagePreview={imagePreview}
          onImageChange={onImageSelect}
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
        <Link href={"/club/1"}>
          <Button variant="outline" size="lg">
            취소
          </Button>
        </Link>
        <Button size="lg" onClick={handleCreateClub}>
          완료
        </Button>
      </div>
    </div>
  );
}

export default CreateClubPage;
