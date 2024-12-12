"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  usePatchClubs,
  usePostClubs,
  usePostClubsImg,
} from "@/lib/api/hooks/clubHook";
import type { GetClubDetailData } from "@/types/clubTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const clubCreateSchema = z.object({
  club_name: z
    .string({
      required_error: "동호회 이름을 입력해주세요",
    })
    .min(2, "2자 이상 입력해주세요")
    .max(20, "20자 이하로 입력해주세요"),
  club_description: z
    .string({
      required_error: "동호회 설명을 입력해주세요",
    })
    .min(2, "2자 이상 입력해주세요")
    .max(1000, "공백 포함 1000자 이하로 입력해주세요"),
  club_image: z
    .string({
      required_error: "동호회 사진을 선택해주세요",
    })
    .min(1, "이미지를 업로드하세요"),
});

type ClubForm = z.infer<typeof clubCreateSchema>;

interface ClubFormProps {
  initialData?: GetClubDetailData;
}

function ClubForm(props: ClubFormProps) {
  const { initialData } = props;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string | undefined>(
    initialData?.club_image,
  );
  const { mutate: createClubImg } = usePostClubsImg();
  const { mutate: createClub } = usePostClubs((clubId) => {
    router.push(`/club/${clubId}`);
  });

  const patchClubsOnSuccess = () => alert("동호회 수정이 완료되었습니다");

  const { mutate: patchClub } = usePatchClubs(
    initialData?.club_token as string,
    patchClubsOnSuccess,
  );

  const form = useForm<ClubForm>({
    resolver: zodResolver(clubCreateSchema),
    defaultValues: {
      club_name: initialData?.club_name,
      club_description: initialData?.club_description,
      club_image: initialData?.club_image,
    },

    mode: "onBlur",
  });

  const uploadImage = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setImgUrl(previewUrl);

    const formData = new FormData();
    formData.append("multipartFile", file);

    createClubImg(formData, {
      onSuccess: (data) => {
        if (data.data) {
          form.setValue("club_image", data.data);
          form.clearErrors("club_image");
        }
      },
      onError: () => {
        form.setError("club_image", {
          type: "manual",
          message: "이미지 업로드에 실패했습니다",
        });
      },
    });
  };

  const onImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
      uploadImage(file);
    } else {
      setImgUrl(undefined);
      form.setError("club_image", {
        type: "manual",
        message: "이미지를 다시 업로드하세요",
      });
    }
  };

  const handleImageRemove = () => {
    setImgUrl(undefined);
    form.setValue("club_image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 파일 입력 값 초기화
    }
  };

  const handleClub = (data: ClubForm) => {
    if (!imgUrl) {
      form.setError("club_image", {
        type: "manual",
        message: "이미지를 업로드하세요",
      });
      return;
    }

    if (!data.club_name) {
      form.setError("club_name", {
        type: "manual",
        message: "동호회 이름을 입력하세요",
      });
    }

    if (!data.club_description) {
      form.setError("club_name", {
        type: "manual",
        message: "동호회 소개를 입력하세요",
      });
    }

    const newClubData: ClubForm = {
      club_name: data.club_name,
      club_description: data.club_description,
      club_image: imgUrl,
    };

    if (initialData) return patchClub(newClubData);
    createClub(newClubData);
  };

  return (
    <Form {...form}>
      <div className="max-w-5xl mx-auto space-y-8 my-4">
        <div className="relative w-full h-[448px] bg-gray-100 overflow-hidden flex justify-center items-center">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <Camera className="h-10 w-10 mb-2" />
              <p className="text-sm">이미지를 업로드하세요</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={onImageSelect}
            ref={fileInputRef}
          />
        </div>

        <div className="w-full flex justify-center items-center">
          {imgUrl && (
            <button
              type="button"
              onClick={handleImageRemove}
              className="text-sm text-gray-500 mt-2"
            >
              이미지 삭제
            </button>
          )}
        </div>

        {form.formState.errors.club_image && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.club_image.message}
          </p>
        )}

        <form
          onSubmit={form.handleSubmit(handleClub)}
          method="post"
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="club_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-bold">
                  동호회 이름
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="w-full text-black border-b border-gray-300 focus:outline-none focus:border-black p-2"
                    placeholder="동호회 이름을 입력하세요"
                    defaultValue={initialData?.club_name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="club_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-bold">
                  동호회 설명
                </FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full text-black resize-none h-44 border-b border-gray-300 focus:outline-none focus:border-black p-2"
                    rows={4}
                    defaultValue={initialData?.club_description}
                    placeholder="동호회의 목적, 활동 내용 등을 입력하세요"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button size="lg" type="submit">
              {initialData ? "수정" : "생성"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}

export default ClubForm;
