"use client"

import CategoryCard from "@/components/UI/card/CategoryCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiXCircle } from "react-icons/hi2";

export default function Home() {


  const router = useRouter()
  const [toggleDisplay, setToggleDisplay] = useState(true)
  return <section className="w-[100%]">
    <div className={ `${toggleDisplay? 'visible opacity-100 scale-100':'invisible opacity-0 scale-0'} fixed left-0 top-0 right-0 bottom-0 rounded-[10px] bg-[#0000005c]`} >
      <button onClick={()=>{
        setToggleDisplay(!toggleDisplay)
        router.push('')
      }} className="absolute right-[10px] top-[10px] text-[3em] text-[#ededed] hover:border"><HiXCircle/></button>
    </div>
    <CategoryCard toggle={toggleDisplay} setToggle ={setToggleDisplay} />

  </section>
}
