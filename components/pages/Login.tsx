import LoginButton from "@/components/login/LoginButton";
import Image from "@/components/ui/Image";
import { NAVER_OAUTH_URL } from "@/constants/loginOauthUrl";
import brand from "@/public/images/main-logo.png";
import Link from "next/link";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Image src={brand.src} alt="brandLogo" width={288} height={288} />
      <div className="flex flex-col mt-16 gap-8">
        <Link href={NAVER_OAUTH_URL}>
          <LoginButton method="naver" />
        </Link>
      </div>
    </div>
  );
}

export default Login;
