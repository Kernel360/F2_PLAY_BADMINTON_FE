import type React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "sm" | "md" | "lg" | "round";
  color?: "gray" | "primary" | "transparent";
  outline?: boolean;
}

function IconButton(props: IconButtonProps) {
  const {
    children,
    size = "md",
    radius = "md",
    color = "gray",
    outline = false,
  } = props;

  const sizeClass =
    {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-14 h-14",
      xl: "w-16 h-16",
    }[size] || "w-10 h-10";

  const radiusClass =
    {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      round: "rounded-full",
    }[radius] || "rounded-md";

  const colorClass =
    {
      gray: "bg-gray-200",
      primary: "bg-primary",
      transparent: "bg-transparent",
    }[color] || "bg-gray-200";

  const outlineClass = outline ? "outline outline-2" : "";

  return (
    <button
      type="button"
      className={`flex justify-center items-center ${outlineClass} ${sizeClass} ${radiusClass} ${colorClass} hover:filter hover:brightness-90`}
    >
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </button>
  );
}

export default IconButton;
