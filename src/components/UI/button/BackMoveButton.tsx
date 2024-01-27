"use client"

import { HiArrowLeftCircle } from "react-icons/hi2"
import { useRouter } from "next/navigation"
export default function BackMoveButton(){

    const router= useRouter()
    return (
        <button onClick={()=>{
            router.back()
        }} className="text-[1.8em] absolute top-[0.5em]"> <HiArrowLeftCircle color="gold" /></button>
    )
}