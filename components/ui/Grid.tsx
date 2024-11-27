import type React from "react";

interface GridProps {
  children: React.ReactNode;
  columns?: 3 | 4 | 5 | 6;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  placeContent?: "start" | "center" | "end";
  placeItems?: "start" | "center" | "end";
}

function Grid(props: GridProps) {
  const {
    children,
    columns = 3,
    spacing = "md",
    placeContent = "start",
    placeItems = "start",
  } = props;

  const columnsClass =
    {
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    }[columns] || 3;
  const spacingClass =
    {
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
      xl: "gap-20",
    }[spacing] || "gap-8";

  const placeContentClass =
    {
      start: "place-content-start",
      center: "place-content-center",
      end: "place-content-end",
    }[placeContent] || "place-content-start";

  const placeItemsClass =
    {
      start: "place-items-start",
      center: "place-items-center",
      end: "place-items-end",
    }[placeItems] || "items-start";

  return (
    <div
      className={`min-h-screen w-full grid ${columnsClass} ${spacingClass} ${placeContentClass} ${placeItemsClass}`}
    >
      {children}
    </div>
  );
}

export default Grid;
