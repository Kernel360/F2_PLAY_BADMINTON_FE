"use client";

import SImage from "@/components/ui/Image";
import { usePostLogout } from "@/lib/api/hooks/SessionHook";
import { useGetMembersSession } from "@/lib/api/hooks/memberHook";
import { BadgeAlert, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const handleSearch = () => {
    if (inputRef.current) {
      const query = inputRef.current.value.replace(/\n/g, "").trim();
      if (query) {
        router.push(`/search?search=${encodeURIComponent(query)}`);
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
      "cursor-pointer hover:text-primary transition-colors duration-300 text-sm ";
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
  } else if (data?.result === "SUCCESS") {
    userMenu = (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="focus-visible:ring-2 rounded-full">
          <SImage
            src={data.data?.profile_image || "/images/dummy-image.jpg"}
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
        className="hover:bg-gray-100 flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-500"
      >
        로그인
      </Link>
    );
  }

  return (
    <header className="bg-white flex flex-col w-full max-w-6xl px-4 sticky top-0 z-50">
      {/* 상단: 로고, 검색창, 로그인 버튼 */}
      <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap lg:gap-8 py-2">
        <div className="flex items-center justify-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2 text-2xl font-bold cursor-pointer text-black">
              <img
                src="/images/header-logo.png"
                alt="logo"
                className="w-28 min-w-28 h-12"
              />
            </div>
          </Link>

          {/* 네비게이션 (큰 화면에서 표시) */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link href="/club">
              <p className={getActiveStyle("/club")}>동호회</p>
            </Link>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScw6RdgQyGFMzKhN7yHSXYf20Y2TmnOMhirRU7bD00Eb1uJAw/viewform"
              className="text-gray-400 flex gap-1 items-center text-sm"
            >
              <BadgeAlert className="text-gray-400" size={18} />
              고객의 소리
            </Link>
          </nav>
        </div>

        <div className="flex items-center justify-center flex-end gap-2">
          {/* 검색창 */}
          <div className="relative flex-grow max-w-[400px]">
            <input
              ref={inputRef}
              defaultValue={search || ""}
              type="text"
              placeholder="동호회 이름을 검색하세요"
              className="w-full h-10 pl-4 pr-12 text-sm outline-none border-none rounded-lg bg-gray-50 text-gray-500 focus-visible:ring-2 placeholder-transparent md:placeholder-gray-400"
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={handleButtonClick}
              tabIndex={0}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 h-8 w-8 flex justify-center items-center rounded-lg focus-visible:ring-2"
            >
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* 로그인 버튼 */}
          <div className="flex-shrink-0">{userMenu}</div>
        </div>
      </div>

      {/* 하단: 네비게이션 (작은 화면에서 표시) */}
      <nav className="flex lg:hidden justify-center items-center space-x-4 my-4">
        <Link href="/club">
          <p className={getActiveStyle("/club")}>동호회</p>
        </Link>
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLScw6RdgQyGFMzKhN7yHSXYf20Y2TmnOMhirRU7bD00Eb1uJAw/viewform"
          className="text-gray-400 flex gap-1 items-center text-sm"
        >
          <BadgeAlert className="text-gray-400 text-sm" size={18} />
          고객의 소리
        </Link>
      </nav>
    </header>
  );
}

export default Header;
