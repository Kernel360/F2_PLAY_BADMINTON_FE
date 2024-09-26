import React from 'react';
import Link from 'next/link';
import Image from '@/components/ui/Image';
import brand from '@/app/images/main-logo.png';
import LoginButton from './LoginButton';

function LoginLayout() {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Image src={brand.src} alt="brandLogo" width={288} height={288} />
      <div className="flex flex-col mt-16 gap-8">
        <Link href="http://3.38.247.217:8080/oauth2/authorization/naver`">
          <LoginButton method="naver" />
        </Link>
        <Link href="http://3.38.247.217:8080/oauth2/authorization/google">
          <LoginButton method="google" />
        </Link>
        <Link href="http://3.38.247.217:8080/oauth2/authorization/kakao">
          <LoginButton method="kakao" />
        </Link>
      </div>
    </div>
  );
}

export default LoginLayout;
