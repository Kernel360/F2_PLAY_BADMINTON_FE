import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";

interface TextProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "light" | "regular" | "bold";
  underline?: boolean;
  block?: boolean;
  transform?: "capitalize" | "uppercase" | "lowercase";
  align?: "left" | "center" | "right";
  lineClamp?: number;
  color?: "primary" | "black" | "gray" | "white";
  inherit?: boolean;
  className?: string;
}

interface LinkProps extends TextProps {
  link: string;
}

function Text({
  children,
  size = "md",
  weight = "regular",
  underline = false,
  block = false,
  transform,
  align,
  lineClamp,
  color = "black",
  inherit = false,
  className = "",
}: TextProps): JSX.Element {
  // 말줄임 설정 위한 코드
  let displayStyle = "inline";
  if (lineClamp) {
    displayStyle = "-webkit-box";
  } else if (block) {
    displayStyle = "block";
  }

  const colorClass =
    {
      primary: "text-primary", // #007BFF
      black: "text-black",
      gray: "text-gray-500",
      white: "text-white",
    }[color] || "text-black"; // 기본값

  const sizeClass =
    {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl",
      xl: "text-2xl",
    }[size] || "text-base";

  const weightClass =
    {
      light: "font-extralight",
      regular: "font-medium",
      bold: "font-extrabold",
    }[weight] || "regular";

  const baseStyles: React.CSSProperties = {
    display: displayStyle,
    textDecoration: underline ? "underline" : "none",
    textTransform: transform,
    textAlign: align,
    color: inherit ? "inherit" : color || "black",
    WebkitLineClamp: lineClamp,
    overflow: lineClamp ? "hidden" : "visible",
    WebkitBoxOrient: lineClamp ? "vertical" : undefined,
  };

  return (
    <span
      style={{ ...baseStyles }}
      className={cn([colorClass, sizeClass, weightClass].join(" "), className)}
    >
      {children}
    </span>
  );
}

function LinkText({
  children,
  size = "md",
  weight = "regular",
  underline = false,
  block = false,
  transform,
  align,
  lineClamp,
  color = "black",
  inherit = false,
  link = "",
  className = "",
}: LinkProps): JSX.Element {
  // 말줄임 설정 위한 코드
  let displayStyle = "inline";
  if (lineClamp) {
    displayStyle = "-webkit-box";
  } else if (block) {
    displayStyle = "block";
  }

  const colorClass =
    {
      primary: "text-primary", // #007BFF
      black: "text-black",
      gray: "text-gray-500",
      white: "text-white",
    }[color] || "text-black"; // 기본값

  const sizeClass =
    {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl",
      xl: "text-2xl",
    }[size] || "text-base";

  const weightClass =
    {
      light: "font-extralight",
      regular: "font-medium",
      bold: "font-extrabold",
    }[weight] || "regular";

  const baseStyles: React.CSSProperties = {
    display: displayStyle,
    textDecoration: underline ? "underline" : "none",
    textTransform: transform,
    textAlign: align,
    color: inherit ? "inherit" : color || "black",
    WebkitLineClamp: lineClamp,
    overflow: lineClamp ? "hidden" : "visible",
    WebkitBoxOrient: lineClamp ? "vertical" : undefined,
  };

  return (
    <Link
      style={{ ...baseStyles }}
      className={cn([colorClass, sizeClass, weightClass].join(" "), className)}
      href={link}
    >
      {children}
    </Link>
  );
}

export { Text, LinkText };
