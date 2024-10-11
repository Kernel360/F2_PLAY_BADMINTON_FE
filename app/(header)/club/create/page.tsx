"use client";

import ClubInfoInputDescription from "@/components/common/clubInfoInput/ClubInfoInputDescription";
import ClubInfoInputImage from "@/components/common/clubInfoInput/ClubInfoInputImage";
import ClubInfoInputName from "@/components/common/clubInfoInput/ClubInfoInputName";
import { Button } from "@/components/ui/Button";
import { usePostClubs } from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

type ClubCreate = components["schemas"]["ClubCreateRequest"];

function CreateClubPage() {
  const [imagePreview, setImagePreview] = useState("/images/dummy-image.jpg");
  const [clubName, setClubName] = useState("");
  const [text, setText] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const { mutate: createClub, isError, error } = usePostClubs();

  const handleCreateClub = async () => {
    const newClubData: ClubCreate = {
      club_name: clubName,
      club_description: text,
      club_image: imagePreview,
    };

    createClub(newClubData);
    console.log(isError);
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
