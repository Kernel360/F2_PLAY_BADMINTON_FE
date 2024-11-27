import ClubLayout from "@/components/layouts/ClubLayout";
import type { ReactNode } from "react";

function layout({ children }: { children: React.ReactNode }) {
  return <ClubLayout>{children}</ClubLayout>;
}

export default layout;
