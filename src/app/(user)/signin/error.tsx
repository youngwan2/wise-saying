'use client'
import { useRouter } from "next/navigation"

export default function Error() {

  const router = useRouter()
  return (
    <article className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
      <h2>회원가입 페이지를 불러오던 중 문제가 발생하였습니다.</h2>
      <button className="border p-[4px] mt-[8px]" onClick={() => {
        router.back()
      }}>이전 페이지</button>
    </article>)
}
