import LoginButton from "@/components/login/LoginButton";
import Image from "@/components/ui/Image";
import brand from "@/public/images/logo.png";
import Link from "next/link";

const NAVER_OAUTH_URL = process.env.NEXT_NAVER_OAUTH_URL || "";
const GOOGLE_OAUTH_URL = process.env.NEXT_GOOGLE_OAUTH_URL || "";
const KAKAO_OAUTH_URL = process.env.NEXT_KAKAO_OAUTH_URL || "";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      {/* 브랜드 로고 */}
      <div className="flex justify-center items-center mb-8">
        <Image src={brand.src} alt="brandLogo" width={100} height={100} />
      </div>

      {/* 로그인 버튼 섹션 */}
      <div className="flex flex-col gap-4 w-64 justify-center items-center">
        <Link href={GOOGLE_OAUTH_URL}>
          <LoginButton method="google" />
        </Link>
        <Link href={NAVER_OAUTH_URL}>
          <LoginButton method="naver" />
        </Link>
        <Link href={KAKAO_OAUTH_URL}>
          <LoginButton method="kakao" />
        </Link>
      </div>
    </div>
  );
}

export default Login;
