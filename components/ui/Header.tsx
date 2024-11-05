"use client";

import SImage from "@/components/ui/Image";
import { Input } from "@/components/ui/Input";
import { usePostLogout } from "@/lib/api/hooks/SessionHook";
import { useGetMembersMyPage } from "@/lib/api/hooks/memberHook";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const { data, isLoading } = useGetMembersMyPage();

  const { mutate: logout } = usePostLogout();

  const handleLogout = () => {
    if (confirm("정말로 로그아웃 하시겠습니까?")) {
      logout(undefined, {
        onSuccess: () => {
          router.push("/");
        },
      });
    }
  };

  const getActiveStyle = (linkPath: string) => {
    let baseClass =
      "cursor-pointer hover:text-primary transition-colors duration-300 ";
    if (
      path === linkPath ||
      (linkPath === "/club" && path.startsWith("/club"))
    ) {
      baseClass += "text-primary";
      return baseClass;
    }
    baseClass += "text-gray-400";
    return baseClass;
  };

  let userMenu: ReactNode;
  if (isLoading) {
    userMenu = null;
  } else if (data) {
    userMenu = (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:ring-2 rounded-full">
          <SImage
            src={data.profile_image || "/images/dummy-image.jpg"}
            radius="circular"
            width={36}
            height={36}
            alt="profile"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="w-full flex justify-center items-center cursor-pointer">
            <Link href="/my-page">마이페이지</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full flex justify-center items-center cursor-pointer"
            onClick={handleLogout}
          >
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    userMenu = (
      <Link href="/login">
        <p className="rounded-full h-fit text-gray-500 text-sm">로그인</p>
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-between w-full max-w-6xl h-16 px-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <div className="text-2xl cursor-pointer">LOGO</div>
        </Link>
        <nav className="flex space-x-4">
          <Link href="/">
            <p className={getActiveStyle("/")}>오늘의경기</p>
          </Link>
          <Link href="/club">
            <p className={getActiveStyle("/club")}>동호회</p>
          </Link>
        </nav>
      </div>
      <div className="flex items-center justify-end space-x-4 w-1/2 gap-2">
        <div className="w-1/2">
          <Input search radius="round" placeholder="동호회 검색" size="sm" />
        </div>
        {userMenu}
      </div>
    </div>
  );
}
export default Header;
