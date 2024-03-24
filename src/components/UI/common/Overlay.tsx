"use client"

import { useNavDisplayStateStore } from "@/store/store"

export default function Overlay() {


  const isDisplay = useNavDisplayStateStore((state) => state.isDisplay)
  const setIsDisplay = useNavDisplayStateStore((state) => state.setIsDisplay)

  if(!isDisplay) return <></>
  return (
    <div onClick={() => {
      setIsDisplay(false)
    }} className=" z-[1] fixed left-0 right-0 bottom-0 top-0 bg-[#0000004a] rounded-[10px]"></div>
  )
}
