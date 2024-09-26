'use client';
import React from 'react';
import LoginButton from './LoginButton';
import Image from '@/components/ui/Image';
import brand from '@/app/images/main-logo.png';
import Link from 'next/link';

function LoginLayout() {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Image src={brand.src} width={288} height={288} />
      <div className="flex flex-col mt-16 gap-8">
        <Link href={`http://3.38.247.217:8080/oauth2/authorization/naver`}>
          <LoginButton method="naver" />
        </Link>
        <Link href={`http://3.38.247.217:8080/oauth2/authorization/google`}>
          <LoginButton method="google" />
        </Link>
        <Link href={`http://3.38.247.217:8080/oauth2/authorization/kakao`}>
          <LoginButton method="kakao" />
        </Link>
      </div>
    </div>
  );
}

export default LoginLayout;
