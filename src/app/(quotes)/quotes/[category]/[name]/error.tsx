'use client'
import { useRouter } from 'next/navigation'

export default function Error() {
  const router = useRouter()
  return (
    <article className="hover:bg-[#3d3d3d3e] border shadow-[10px_30px_5px_rgba(0,0,0,0.5)] flex flex-col bg-[#0000002f] max-w-[500px] w-full absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] p-[1em] rounded-[10px]">
      <h2 className="text-white text-[1.15em]">
        죄송합니다. 데이터를 요청하던 중 서버 측에서 문제가 발생 하였습니다.
        일시적인 문제일 수 있으므로 나중에 다시시도 해주세요 (에러 코드: 500).
      </h2>
      <button
        className="border text-white mt-[0.8em] p-[5px] rounded-[5px] hover:bg-[#f06951]"
        onClick={() => {
          router.back()
        }}
      >
        이전 페이지
      </button>
    </article>
  )
}
