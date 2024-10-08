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
      <p className="font-bold text-black text-lg">동호회 소개</p>
      <textarea
        className="rounded-md mt-2 w-full h-full outline-none border border-gray-300 text-gray-600 p-1 overflow:scroll resize-none"
        value={description}
        onChange={onChange}
      />
    </div>
  );
};

export default ClubInfoInputDescription;
