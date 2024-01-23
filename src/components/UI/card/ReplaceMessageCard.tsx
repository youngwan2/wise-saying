"use client"

import { useRouter } from "next/navigation"

export default function ReplaceMessageCard({
  childern,
}: {
  childern: React.ReactNode
}) {

  const router = useRouter()


  return (
    <h2
      className="  text-center z-50  border inline-block p-[2em] absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[1.25em] 
        rounded-[10px] shadow-[5px_10px_10px_0_rgba(0,0,0,0.5)] bg-gradient-to-tr from-orange-50 to-white"
    >
      {childern}
      <button className="bg-[#162557] text-white p-[4px] px-[8px] mt-[1em] text-[16px] hover:bg-[tomato]" onClick={() => {
        router.back()
      }}>뒤로가기</button>
    </h2>
  )
}
