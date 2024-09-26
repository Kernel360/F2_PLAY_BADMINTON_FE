import React from 'react';
import google from '@/app/images/google-logo.png';
import naver from '@/app/images/naver-logo.png';
import kakao from '@/app/images/kakao-logo.png';
import Image from '@/components/ui/Image';

interface LoginButtonProps {
  method?: 'naver' | 'kakao' | 'google';
}
function LoginButton(props: LoginButtonProps) {
  const { method } = props;

  let color;
  let imgSrc;

  switch (method) {
    case 'naver':
      color = 'bg-[#03C75A] text-white';
      imgSrc = naver.src;
      break;
    case 'kakao':
      color = 'bg-[#FEE500] text-black';
      imgSrc = kakao.src;
      break;
    case 'google':
      color = 'bg-[#f2f2f2] text-gray-500';
      imgSrc = google.src;
      break;
    default:
      break;
  }
  return (
    <div
      className={`h-16 w-72 rounded-full flex justify-center items-center ${color}`}
    >
      {imgSrc && <Image src={imgSrc} alt={method} width={50} height={50} />}
      <span className="text-md font-bold">Login width {method}</span>
    </div>
  );
}

export default LoginButton;
