import LoginButton from "@/components/login/LoginButton";
import Image from "@/components/ui/Image";
import brand from "@/public/images/main-logo.png";
import Link from "next/link";

const NAVER_OAUTH_URL = process.env.NEXT_NAVER_OAUTH_URL || "";
const GOOGLE_OAUTH_URL = process.env.NEXT_GOOGLE_OAUTH_URL || "";
const KAKAO_OAUTH_URL = process.env.NEXT_KAKAO_OAUTH_URL || "";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Image src={brand.src} alt="brandLogo" width={288} height={288} />
      <div className="flex flex-col mt-16 gap-8">
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
