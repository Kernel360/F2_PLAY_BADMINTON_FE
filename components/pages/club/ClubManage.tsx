"use client";

import ClubInfoInputDescription from "@/components/club/ClubInputDescription";
import ClubInfoInputImage from "@/components/club/ClubInputImage";
import ClubInfoInputName from "@/components/club/ClubInputName";
import { Button } from "@/components/ui/Button";
import {
  useGetClubsById,
  usePatchClubs,
  usePostClubsImg,
} from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type ClubUpdate = components["schemas"]["ClubUpdateRequest"];

function ClubManage() {
  const { clubId } = useParams();

  const { data, isLoading } = useGetClubsById(clubId as string);
  const { mutate: patchClub } = usePatchClubs(clubId as string);
  const { mutate: patchClubImg } = usePostClubsImg();

  const [imgUrl, setImgUrl] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ClubUpdate>({
    defaultValues: { club_name: "", club_description: "", club_image: "" },
    mode: "onBlur",
  });

  useEffect(() => {
    if (data) {
      setValue("club_name", data.club_name || "");
      setValue("club_description", data.club_description || "");
      setValue("club_image", data.club_image || "");
      setImgUrl(data.club_image || "/images/dummy-image.jpg");
    }
  }, [data, setValue]);

  const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    patchClubImg(formData, {
      onSuccess: (data) => {
        setImgUrl(data.data);
        setValue("club_image", data.data);
        clearErrors("club_image");
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
    }
  };

  const handleUpdateClub = (data: ClubUpdate) => {
    patchClub(
      {
        club_name: data.club_name,
        club_description: data.club_description,
        club_image: imgUrl,
      },
      {
        onSuccess: () => {
          alert("동호회 정보가 성공적으로 업데이트되었습니다!");
        },
      },
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateClub)}
      method="post"
      className="px-14 pt-8 w-full"
    >
      <div className="flex space-x-8 w-full h-[464px] items-center">
        <div className="flex flex-col gap-1 justify-center">
          <input
            type="text"
            className="hidden"
            {...register("club_image", {
              required: "이미지를 선택해주세요",
            })}
          />
          <ClubInfoInputImage
            imagePreview={imgUrl || "/images/dummy-image.jpg"}
            onImageChange={onImageSelect}
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
          변경 저장
        </Button>
      </div>
    </form>
  );
}

export default ClubManage;
