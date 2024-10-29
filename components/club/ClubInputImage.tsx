import IconButton from "@/components/ui/IconButton";
import { ImagePlusIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface ClubInputImageProps {
  imagePreview: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ClubInputImage = ({
  imagePreview,
  onImageChange,
}: ClubInputImageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-[400px] h-[400px] flex flex-col items-center box-content rounded-md">
      <Image
        src={imagePreview}
        width={400}
        height={400}
        alt="club image"
        className="rounded-md object-cover w-[400px] h-[400px] "
      />
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={onImageChange}
      />
      <div className="absolute bottom-0 right-0">
        <IconButton radius="sm" size="lg" onClick={handleImageClick}>
          <ImagePlusIcon width={"80%"} height={"80%"} />
        </IconButton>
      </div>
    </div>
  );
};

export default ClubInputImage;
