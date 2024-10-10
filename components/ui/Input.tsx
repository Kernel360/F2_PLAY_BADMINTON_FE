import * as React from "react";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const inputVariants = cva("", {
  variants: {
    size: {
      sm: "h-8 w-full px-2",
      md: "h-10 w-full px-2",
      lg: "h-12 w-full px-2",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      round: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    radius: "md",
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
  search?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      radius,
      type,
      placeholder = "placeholder",
      icon,
      search,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "flex flex-row border border-solid items-center",
          inputVariants({ size, radius }),
        )}
      >
        {icon && (
          <span className={cn("inset-y-0 left-0 flex items-center")}>
            {icon}
          </span>
        )}
        {search && (
          <span className={cn("inset-y-0 left-0 flex items-center")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search"
            >
              <title>Search Icon</title>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
        )}
        <input
          placeholder={placeholder}
          type={type}
          className={cn(
            "outline-none bg-background text-black",
            inputVariants({ size }),
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
