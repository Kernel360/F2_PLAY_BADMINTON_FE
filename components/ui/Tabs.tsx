import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 mb-4 items-center justify-center rounded-full bg-white p-1 text-gray-500",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabTriggerVariants = cva("", {
  variants: {
    color: {
      gray: "data-[state=active]:bg-muted data-[state=active]:text-black",
      purple:
        "data-[state=active]:bg-purple-200 data-[state=active]:text-purple-500",
      blue: "data-[state=active]:bg-blue-200 data-[state=active]:text-blue-500",
      red: "data-[state=active]:bg-red-200 data-[state=active]:text-red-500",
    },
  },
  defaultVariants: {
    color: "gray",
  },
});

export interface TabTriggerProps
  extends VariantProps<typeof tabTriggerVariants> {
  color?: "gray" | "purple" | "blue" | "red";
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & TabTriggerProps
>(({ className, color = "gray", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // 'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-md',
      "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-black font-medium text-gray-500",
      className,
      tabTriggerVariants({ color }),
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn(className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, tabTriggerVariants };
