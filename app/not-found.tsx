import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <img src="/images/logo.png" alt="Logo" className="h-24 w-24 mr-2" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600 mt-2">
          요청하신 페이지를 찾을 수 없습니다.
          <br />
          홈으로 돌아가주세요.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
