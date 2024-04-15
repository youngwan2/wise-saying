"use client"

import { useNavDisplayStateStore } from "@/store/store"

interface PropsType {
  isDisplay:boolean
}
export default function Overlay({isDisplay}:PropsType) {

  const setIsDisplay = useNavDisplayStateStore((state) => state.setIsDisplay)

  if(!isDisplay) return <></>
  return (
    <div onClick={() => {
      setIsDisplay(isDisplay)
    }} className=" z-[100] fixed left-0 right-0 bottom-0 top-0 bg-[#00000061] rounded-[10px]"></div>
  )
}
