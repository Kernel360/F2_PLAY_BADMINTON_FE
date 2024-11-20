"use client";

import SImage from "@/components/ui/Image";
import { usePostLogout } from "@/lib/api/hooks/SessionHook";
import { useGetMembersSession } from "@/lib/api/hooks/memberHook";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const { data, isLoading } = useGetMembersSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    if (inputRef.current) {
      const query = inputRef.current.value.replace(/\n/g, "").trim();
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      handleSearch();
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSearch();
  };

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
      <DropdownMenu open={open} onOpenChange={setOpen}>
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
          <DropdownMenuItem
            className="w-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
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
      <Link
        href="/login"
        className="hover:bg-gray-100 px-3 py-2 rounded-md h-fit"
      >
        <p className="rounded-full h-fit text-gray-500 text-sm">로그인</p>
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-between w-full max-w-6xl h-16 px-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <div className="flex gap-2 justify-center items-center text-2xl font-bold cursor-pointer text-black">
            <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
            콕콕
          </div>
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
      <div className="flex items-center justify-end space-x-4 w-1/2 ">
        <div className="w-1/2 flex justify-center items-center gap-1 mr-2">
          <div className="relative flex-grow">
            <input
              ref={inputRef}
              type="text"
              placeholder="동호회 이름을 검색하세요"
              className="p-2 outline-none border-none w-full rounded-lg bg-gray-50 text-gray-500 focus-visible:ring-2"
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={handleButtonClick}
              tabIndex={0}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 h-10 w-10 flex justify-center items-center rounded-lg focus-visible:ring-2"
            >
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {userMenu}
      </div>
    </div>
  );
}
export default Header;
