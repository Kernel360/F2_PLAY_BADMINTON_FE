import Image from "next/image";
import React from "react";

interface ImageProps {
  src: string;
  radius?: "sm" | "md" | "lg" | "round" | "circular";
  width?: number;
  height?: number;
  alt?: string;
  fit?: "cover" | "fill" | "contain";
}

function SImage({
  src = "https://dummyimage.com/400x250/000/ffffff",
  radius = "md",
  width = 400,
  height = 250,
  alt = "",
  fit = "cover",
}: ImageProps): JSX.Element {
  const radiusClass = (() => {
    switch (radius) {
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "round":
      case "circular":
        return "rounded-full";
      default:
        return "rounded-md";
    }
  })();

  return (
    <div className={`${radiusClass} overflow-hidden`} style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="responsive"
        objectFit={fit}
        // TODO(Yejin0O0): 수정 필요
        className="!h-full"
      />
    </div>
  );
}

export default SImage;
