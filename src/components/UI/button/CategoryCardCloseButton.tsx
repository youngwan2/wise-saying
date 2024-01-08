"use client"

import { HiXCircle } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface PropsType {
    toggleDisplay: boolean
    setToggleDisplay : (p: boolean) => void
}
export default function CategoryCloseButton({toggleDisplay, setToggleDisplay}:PropsType){

    const router = useRouter()
    return (
        <div className={ `${toggleDisplay? 'visible opacity-100 scale-100':'invisible opacity-0 scale-0'} fixed left-0 top-0 right-0 bottom-0 rounded-[10px] bg-[#0000005c]`} >
        <button onClick={()=>{
          setToggleDisplay(!toggleDisplay)
          router.push('')
        }} className="absolute right-[10px] top-[10px] text-[3em] text-[#ededed] hover:border"><HiXCircle/></button>
      </div>
    )
}