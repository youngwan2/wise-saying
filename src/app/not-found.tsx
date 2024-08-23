import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#234491]  fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-6xl font-bold text-[#ffc700] mb-4">404</h1>
      <p className="text-xl  text-[white] mb-8">페이지를 찾을 수 없습니다</p>
      <Link
        href={'/'}
        className="px-4 py-2 bg-white text-[#234491] rounded transition-colors active:bg-slate-50"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};
