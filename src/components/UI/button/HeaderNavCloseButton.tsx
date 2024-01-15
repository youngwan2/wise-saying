"use client"

import { HiXCircle } from "react-icons/hi2";
import { useNavDisplayStateStore } from "@/store/store";

export default function HeaderNavCloseButton(){

    const setIsDisplay = useNavDisplayStateStore((state)=> state.setIsDisplay)
    const isDisplay = useNavDisplayStateStore((state)=> state.isDisplay)
    return (
        <div className={ `${isDisplay? 'visible opacity-100 scale-100':'invisible opacity-0 scale-0'} fixed left-0 top-0 right-0 bottom-0 rounded-[10px] bg-[#0000005c]`} >
        <button onClick={()=>{
          setIsDisplay(!isDisplay)
        }} className="absolute right-[10px] top-[10px] text-[3em] text-[#ededed] hover:border"><HiXCircle/></button>
      </div>
    )
}