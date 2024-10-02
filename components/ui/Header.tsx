import type { UserStateProps } from "@/types/layoutTypes";
import { UserRound } from "lucide-react";
import React from "react";
import { Input } from "./Input";
import { LinkText } from "./Text";

const personalSection = (isLogin: boolean, isJoined: boolean) => {
  if (!isLogin) {
    return (
      <div className="flex w-44 justify-evenly">
        <LinkText
          color="gray"
          size="sm"
          align="center"
          className="cursor-pointer leading-6"
          link="/"
        >
          동호회 새로 만들기
        </LinkText>
        <LinkText
          color="primary"
          size="sm"
          className="cursor-pointer leading-6"
          link="/"
        >
          Login
        </LinkText>
      </div>
    );
  }
  if (!isJoined) {
    return (
      <div className="flex w-40 justify-evenly">
        <LinkText
          color="gray"
          size="sm"
          align="center"
          className=" cursor-pointer leading-6"
          link="/"
        >
          동호회 새로 만들기
        </LinkText>
        <UserRound
          size={24}
          className="text-black cursor-pointer group-hover:text-white transition-colors"
        />
      </div>
    );
  }
  return <UserRound size={24} cursor-pointer color="#000000" />;
};

function Header(props: UserStateProps) {
  const { isLogin, isJoined } = props;
  return (
    <div className="flex items-center justify-between space-x-4 w-full max-w-5xl h-16 sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="text-xl font-semibold cursor-pointer">LOGO</div>
      <div className="flex items-center justify-end space-x-2 w-1/2">
        <div className="w-1/2">
          <Input search radius="round" placeholder="" size="sm" />
        </div>
        {personalSection(isLogin, isJoined)}
      </div>
    </div>
  );
}

export default Header;
