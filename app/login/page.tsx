import Image from "@/components/ui/Image";
import {
  GOOGLE_OAUTH_URL,
  KAKAO_OAUTH_URL,
  NAVER_OAUTH_URL,
} from "@/constants/loginOauthUrl";
import brand from "@/public/images/main-logo.png";
import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";

function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Image src={brand.src} alt="brandLogo" width={288} height={288} />
      <div className="flex flex-col mt-16 gap-8">
        <Link href={NAVER_OAUTH_URL}>
          <LoginButton method="naver" />
        </Link>
        <Link href={GOOGLE_OAUTH_URL}>
          <LoginButton method="google" />
        </Link>
        <Link href={KAKAO_OAUTH_URL}>
          <LoginButton method="kakao" />
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
