import Link from 'next/link'
export default function ForgotLink() {
  return (
    <Link
      href={'/forgot'}
      className="text-[15px] hover:hover:bg-[#162557]  text-white px-[2px]  rounded-[5px] hover:font-semibold absolute bottom-[9.4em] right-[1em]"
    >
      이메일/비밀번호 찾기
    </Link>
  )
}
