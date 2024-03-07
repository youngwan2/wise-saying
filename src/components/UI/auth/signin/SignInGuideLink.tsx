import Link from 'next/link'
export default function SignInGuideLink() {
  return (
    <Link
      className="text-[15px] hover:hover:bg-[#162557]  text-white px-[2px]  hover:font-semibold border-b mr-[2em] "
      href={'/signin'}
    >
      회원가입
    </Link>
  )
}
