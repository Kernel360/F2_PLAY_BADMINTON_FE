import { Textarea } from "@/components/ui/textarea";
import { forwardRef } from "react";

interface ClubInfoInputDescriptionProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ClubInfoInputDescription = forwardRef<
  HTMLTextAreaElement,
  ClubInfoInputDescriptionProps
>((props, ref) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Textarea
        className="rounded-md w-full h-full outline-none border border-gray-300 text-gray-600 p-1 overflow-scroll resize-none"
        placeholder="동호회 소개를 입력하세요."
        ref={ref}
        {...props}
      />
    </div>
  );
});

ClubInfoInputDescription.displayName = "ClubInfoInputDescription";

export default ClubInfoInputDescription;
