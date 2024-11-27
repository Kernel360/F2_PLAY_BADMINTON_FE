import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  usePostMembersProfileImage,
  usePutMembersProfile,
} from "@/lib/api/hooks/memberHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Edit } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "닉네임은 2자 이상 10자 이내로 입력하세요.")
    .max(10, "닉네임은 2자 이상 10자 이내로 입력하세요."),
  profileImage: z.string().optional(),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
  initialName: string;
  initialProfileImage: string;
}

function EditProfileDialog({
  initialName,
  initialProfileImage,
}: EditProfileDialogProps) {
  const DEFAULT_IMAGE = process.env.NEXT_PUBLIC_DEFAULT_IMAGE;

  const { mutate: postProfileImage } = usePostMembersProfileImage();
  const { mutate: putProfile } = usePutMembersProfile(() => {
    setOpen(false);
    setUploadedImageFile(null);
  });

  const [profileImage, setProfileImage] = useState<string>(initialProfileImage);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialName,
      profileImage: initialProfileImage,
    },
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setUploadedImageFile(file);
    }
  };

  const handleImageRemove = () => {
    // 이미지 삭제 후 기본 이미지 설정
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    setProfileImage(DEFAULT_IMAGE!); // 기본 이미지 설정
    setUploadedImageFile(null); // 업로드된 파일 정보 초기화
    form.setValue("profileImage", DEFAULT_IMAGE); // 폼 값도 기본 이미지로 설정
  };

  const onSubmit: SubmitHandler<ProfileFormInputs> = (data) => {
    const { name } = data;
    let profileImageUrl: string;

    // 이미지 삭제 후, 수정할 때 기본 이미지를 설정하는 부분
    if (uploadedImageFile) {
      profileImageUrl = profileImage; // 업로드된 이미지 사용
    } else if (profileImage === DEFAULT_IMAGE) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      profileImageUrl = DEFAULT_IMAGE!; // 기본 이미지 사용
    } else {
      profileImageUrl = initialProfileImage; // 이름만 수정 시 기존 이미지 그대로 사용
    }

    if (uploadedImageFile) {
      const formData = new FormData();
      formData.append("multipartFile", uploadedImageFile);

      postProfileImage(formData, {
        onSuccess: (response) => {
          if (response.data) {
            form.setValue("profileImage", response.data);
            putProfile({
              name,
              profile_image_url: response.data,
            });
          }
        },
        onError: (error) => {
          console.error("이미지 업로드 실패:", error);
        },
      });
    } else {
      putProfile({
        name,
        profile_image_url: profileImageUrl, // 선택된 이미지로 업데이트
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-5 w-full text-black hover:bg-white hover:text-black"
        >
          <Edit className="mr-1 h-4 w-4 text-blue-600" />
          프로필 수정
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80">
        <DialogTitle className="text-center text-black">
          프로필 수정
        </DialogTitle>
        <DialogDescription className="text-center mt-2">
          닉네임과 프로필 이미지를 수정할 수 있습니다.
        </DialogDescription>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4 mt-6"
          >
            <FormField
              name="profileImage"
              control={form.control}
              render={() => (
                <FormItem className="w-full flex flex-col gap-2 justify-center items-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24 rounded-full">
                      <AvatarImage src={profileImage} alt="프로필" />
                      <AvatarFallback />
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-full p-1 cursor-pointer">
                      <label htmlFor="file-input" className="cursor-pointer">
                        <Camera className="text-white h-5 w-5" />
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png, image/gif"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                  {profileImage !== DEFAULT_IMAGE && (
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className="text-sm text-gray-500 mt-2"
                    >
                      이미지 삭제
                    </button>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2 justify-center items-start">
                  <Label htmlFor="name" className="text-gray-700">
                    닉네임
                  </Label>
                  <FormControl className="w-full">
                    <input
                      id="name"
                      {...field}
                      placeholder="닉네임을 입력하세요"
                      className="mt-1 px-2 h-10 rounded-sm text-black border border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4 w-full">
              <Button type="submit" variant="default" className="w-full">
                저장
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;
