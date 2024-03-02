import Link from 'next/link'
export default function ForgotLink() {
  return (
    <Link
      href={'/forgot'}
      className="text-[15px] hover:hover:bg-[#162557]  text-white px-[2px]  hover:font-semibold border-b "
    >
      아이디/비밀번호 찾기
    </Link>
  )
}
