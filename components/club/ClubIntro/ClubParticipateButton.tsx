import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
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
import { usePostClubMembers } from "@/lib/api/hooks/clubMemberHook";
import { useGetMembersSession } from "@/lib/api/hooks/memberHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ClubParticipateButtonProps {
  clubId: string;
}

const schema = z.object({
  applyReason: z
    .string()
    .trim()
    .min(2, "사유는 최소 2자 이상이어야 합니다.")
    .max(20, "사유는 최대 20자까지 입력 가능합니다."),
});

function ClubParticipateButton({ clubId }: ClubParticipateButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: session } = useGetMembersSession();

  const postClubMembersOnSuccess = () => {
    alert("동호회 신청이 완료되었습니다.");
    setOpen(false);
    router.refresh();
  };

  const { mutate: postClubMembers } = usePostClubMembers(
    clubId,
    postClubMembersOnSuccess,
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      applyReason: "",
    },
  });

  const handlePostClubMember = (data: { applyReason: string }) => {
    if (session?.result === "SUCCESS") {
      postClubMembers({ apply_reason: data.applyReason });
    } else {
      router.push("/login");
    }
  };

  if (session?.result === "FAIL") {
    return (
      <button
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        type="button"
        onClick={() => router.push("/login")}
      >
        동호회 참여하기
      </button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          type="button"
        >
          동호회 참여하기
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-black">동호회 참여 신청서</DialogTitle>
          <DialogDescription>
            동호회 참여를 위해 신청서를 작성해야 합니다.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePostClubMember)}
            className="space-y-4"
          >
            <FormField
              name="applyReason"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>신청 사유</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="신청 사유를 입력해주세요."
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">신청</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ClubParticipateButton;
