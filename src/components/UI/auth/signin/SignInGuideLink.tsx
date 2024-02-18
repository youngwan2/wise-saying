import Link from 'next/link'
export default function SignInGuideLink() {

  return (
    <div
      aria-label="회원가입 안내 메시지 및 페이지 이동 링크 박스"
      className="p-[10px] text-center mb-[0.5em]"
    >
      <span>혹시.. 첫 방문 이신가요?</span>
      <Link
        className="m-[10px] underline hover:bg-[orange] text-[white]"
        href={'/signin'}
      >
        회원가입
      </Link>
    </div>
  )
}