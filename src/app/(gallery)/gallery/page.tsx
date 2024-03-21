"use client"

import ReplaceMessageCard from "@/components/UI/common/ReplaceMessageCard"

export default function GalleryPage() {

  return (
    <section >
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        명언 전시관
      </h2>
      <ReplaceMessageCard childern='현재 준비중인 서비스 입니다.'/>
    </section>
  )
}
