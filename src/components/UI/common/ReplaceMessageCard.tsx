'use client'

import { useRouter } from 'next/navigation'

export default function ReplaceMessageCard({
  childern,
}: {
  childern: React.ReactNode
}) {
  const router = useRouter()

  return (
    <h2
      className="sm:text-[1.25em] text-[1em] sm:p-[2em] p-[1em] text-center z-50  border inline-block  absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]  
        rounded-[10px] shadow-[5px_10px_10px_0_rgba(0,0,0,0.5)] bg-gradient-to-tr from-orange-50 to-white"
    >
      {childern}
      <br />
      <button
        className="bg-[#162557] text-white p-[4px] px-[8px] mt-[1em] text-[16px] hover:bg-[tomato]"
        onClick={() => {
          router.push('/')
        }}
      >
        홈으로
      </button>
    </h2>
  )
}
