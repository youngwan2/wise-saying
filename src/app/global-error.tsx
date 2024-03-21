'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2 className="text-white text-[1.15em]">
          죄송합니다. 사이트 접속중 서버 측에서 문제가 발생 하였습니다.
          일시적인 문제일 수 있으므로 나중에 다시시도 해주세요 (에러 코드: 500).
        </h2>
        <button
          className="border text-white mt-[0.8em] p-[5px] rounded-[5px] hover:bg-[#f06951]"
          onClick={() => {
            reset()
          }}
        >
          새로고침
        </button>
      </body>
    </html>
  )
}