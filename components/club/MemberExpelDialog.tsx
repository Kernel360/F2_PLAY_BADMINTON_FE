"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePatchClubMembersExpel } from "@/lib/api/hooks/clubMemberHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface MemberExpelModalProps {
  clubId: string;
  clubMemberId: number;
}

const expelSchema = z.object({
  expel_reason: z
    .string()
    .min(2, "제재 사유는 최소 2자 이상이어야 합니다.")
    .max(100, "제재 사유는 최대 100자까지 입력할 수 있습니다."),
});

type ExpelFormValues = z.infer<typeof expelSchema>;

function MemberExpelDialog({ clubId, clubMemberId }: MemberExpelModalProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: patchClubMembersExpel } = usePatchClubMembersExpel(
    clubId as string,
    clubMemberId,
    () => {
      alert("회원 내보내기가 완료되었습니다");
      setDialogOpen(false);
    },
  );

  const form = useForm<ExpelFormValues>({
    resolver: zodResolver(expelSchema),
    defaultValues: {
      expel_reason: "",
    },
  });

  const onSubmit = (values: ExpelFormValues) => {
    patchClubMembersExpel(values);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>회원 내보내기</DialogTrigger>
      <DialogContent className="text-black max-w-md p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-900">
            회원 내보내기
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            이 회원을 강제로 탈퇴시키려면 사유를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="expel_reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제재 사유</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="제재 사유를 입력하세요 (최소 2자, 최대 100자)"
                      className="mt-1 w-full rounded-md border p-2 resize-none text-black focus:ring-1 focus:ring-primary-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end space-x-2 mt-6 gap-2">
              <DialogClose asChild>
                <Button variant="secondary">취소</Button>
              </DialogClose>
              <Button variant="default" type="submit">
                내보내기
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default MemberExpelDialog;
