"use client";

import ClubInfoInputDescription from "@/components/common/clubInfoInput/ClubInfoInputDescription";
import ClubInfoInputImage from "@/components/common/clubInfoInput/ClubInfoInputImage";
import ClubInfoInputName from "@/components/common/clubInfoInput/ClubInfoInputName";
import { Button } from "@/components/ui/Button";
import { usePostClubs, usePostClubsImg } from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ClubCreate = components["schemas"]["ClubCreateRequest"];

function CreateClubPage() {
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState<string>("/images/dummy-image.jpg");
  const { mutate: createClubImg } = usePostClubsImg();
  const { mutate: createClub } = usePostClubs();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ClubCreate>({
    defaultValues: { club_name: "", club_description: "", club_image: "" },
    mode: "onBlur",
  });

  const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    createClubImg(formData, {
      onSuccess: (data) => {
        setImgUrl(data);
        setValue("club_image", data);
        clearErrors("club_image"); // 업로드 성공 시 에러 메시지 제거
      },
      onError: () => {
        setError("club_image", {
          type: "manual",
          message: "이미지 업로드에 실패했습니다",
        });
      },
    });
  };

  const onImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    } else {
      setImgUrl("/images/dummy-image.jpg");
    }
  };

  const handleCreateClub = (data: ClubCreate) => {
    const newClubData: ClubCreate = {
      club_name: data.club_name,
      club_description: data.club_description,
      club_image: imgUrl,
    };

    createClub(newClubData, {
      onSuccess: () => {
        router.push("/my-club");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateClub)}
      method="post"
      className="px-14 pt-8 w-full"
    >
      <div className="flex space-x-8 w-full h-[464px] items-center">
        <div className="flex flex-col gap-1 justify-center">
          {/* 파일 선택 필드를 register로 관리 */}
          <input
            type="text"
            className="hidden"
            {...register("club_image", {
              required: "이미지를 선택해주세요",
            })}
          />
          <ClubInfoInputImage
            imagePreview={imgUrl || "/images/dummy-image.jpg"}
            onImageChange={(e) => onImageSelect(e)}
          />
          {errors.club_image && (
            <p className="text-red-500">{errors.club_image.message}</p>
          )}
        </div>
        <div className="flex flex-col flex-1 h-[400px] gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-black font-bold text-lg">동호회 이름</p>
            <ClubInfoInputName
              {...register("club_name", {
                required: "동호회 이름을 입력하세요",
              })}
            />
            {errors.club_name && (
              <p className="text-red-500">{errors.club_name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 h-full">
            <p className="text-black font-bold text-lg">동호회 소개</p>
            <ClubInfoInputDescription
              {...register("club_description", {
                required: "동호회 설명을 입력하세요",
              })}
            />
            {errors.club_description && (
              <p className="text-red-500">{errors.club_description.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button size="lg" type="submit">
          완료
        </Button>
      </div>
    </form>
  );
}

export default CreateClubPage;
