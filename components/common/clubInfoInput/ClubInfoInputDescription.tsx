import { Textarea } from "@/components/ui/textarea";

interface ClubInfoInputDescriptionProps {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ClubInfoInputDescription = ({
  description,
  onChange,
}: ClubInfoInputDescriptionProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Textarea
        className="rounded-md w-full h-full outline-none border border-gray-300 text-gray-600 p-1 overflow:scroll resize-none"
        value={description}
        onChange={onChange}
        placeholder={"동호회 설명을 입력하세요."}
      />
    </div>
  );
};

export default ClubInfoInputDescription;
