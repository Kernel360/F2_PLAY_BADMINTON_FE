import Header from "@/components/ui/Header";
import type React from "react";

function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header isLogin={false} isJoined={false} />
      {children}
    </>
  );
}

export default HeaderLayout;
