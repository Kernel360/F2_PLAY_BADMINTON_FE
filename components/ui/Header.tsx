"use client";
import { useGetLoginState, useLogout } from "@/lib/api/hooks/SessionHook";
import { useGetMyInfo } from "@/lib/api/hooks/membersHook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SImage from "./Image";
import { Input } from "./Input";
import { LinkText } from "./Text";

const PersonalSection = () => {
  const { data: isLogin } = useGetLoginState();
  const [showLogout, setShowLogout] = useState(false);
  const { mutate: logout } = useLogout();
  const { data } = useGetMyInfo(!!isLogin?.loggedIn);
  const isJoined = data?.club_member_my_page_response?.club_id || null;

  console.log(isJoined);
  const handleImageClick = () => {
    setShowLogout(!showLogout);
  };

  if (!isLogin?.loggedIn) {
    return (
      <div className="flex w-44 justify-evenly">
        <LinkText
          color="gray"
          size="sm"
          align="center"
          className="cursor-pointer leading-6 items-center"
          link="/club/create"
        >
          동호회 만들기
        </LinkText>
        <LinkText
          color="primary"
          size="sm"
          className="cursor-pointer leading-6"
          link="/login"
        >
          Login
        </LinkText>
      </div>
    );
  }

  if (!isJoined) {
    return (
      <div className="flex w-40 justify-evenly items-center">
        <LinkText
          color="gray"
          size="sm"
          align="center"
          className="cursor-pointer leading-6"
          link="/club/create"
        >
          동호회 만들기
        </LinkText>
        <div className="relative">
          <button
            onClick={() => handleImageClick()}
            className="cursor-pointer"
            type="button"
          >
            <SImage
              src={data?.profile_image || "/images/dummy-image.jpg"}
              radius="circular"
              width={45}
              height={45}
              alt="profile"
            />
          </button>
          {showLogout && (
            <div className="absolute top-full mt-2 px-10 right-0 bg-white border border-gray-200 shadow-lg p-2 rounded">
              <button onClick={() => logout()} type="button">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => handleImageClick()}
        className="cursor-pointer"
        type="button"
      >
        <SImage
          src={data?.profile_image || "/images/dummy-image.jpg"}
          radius="circular"
          width={45}
          height={45}
          alt="profile"
        />
      </button>
      {showLogout && (
        <div className="absolute top-full mt-2 px-10 right-0 bg-white border border-gray-200 shadow-lg p-2 rounded">
          <button onClick={() => logout()} type="button">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

function Header() {
  const path = usePathname();
  return (
    <div className="flex items-center justify-between space-x-4 w-full max-w-5xl h-16 sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/">
        <div className="text-xl font-semibold cursor-pointer">LOGO</div>
      </Link>
      <div className="flex items-center justify-end space-x-2 w-1/2">
        {path === "/" && (
          <div className="w-1/2">
            <Input search radius="round" placeholder="" size="sm" />
          </div>
        )}
        <PersonalSection />
      </div>
    </div>
  );
}

export default Header;
