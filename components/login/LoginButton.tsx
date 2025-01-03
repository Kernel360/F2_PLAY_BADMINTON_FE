import Image from "@/components/ui/Image";
import google from "@/public/images/google-logo.png";
import kakao from "@/public/images/kakao-logo.png";
import naver from "@/public/images/naver-logo.png";

interface LoginButtonProps {
  method?: "naver" | "kakao" | "google";
}

function LoginButton(props: LoginButtonProps) {
  const { method } = props;

  let color: string | null = null;
  let imgSrc: string | null = null;

  switch (method) {
    case "naver":
      color = "bg-[#03C75A] text-white";
      imgSrc = naver.src;
      break;
    case "kakao":
      color = "bg-[#FEE500] text-black";
      imgSrc = kakao.src;
      break;
    case "google":
      color = "bg-[#f2f2f2] text-gray-500";
      imgSrc = google.src;
      break;
    default:
      break;
  }

  return (
    <div
      className={`h-12 w-56 rounded-lg flex justify-center items-center ${color}`}
    >
      {imgSrc && <Image src={imgSrc} alt={method} width={30} height={30} />}
      <span className="text-sm font-medium ml-2">로그인 하기</span>
    </div>
  );
}

export default LoginButton;
