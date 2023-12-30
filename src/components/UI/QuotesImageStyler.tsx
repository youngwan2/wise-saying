"use client"

import { useEffect, useRef, useState } from "react"

export default function QuotesImageStyler() {

    const liRefs = useRef<HTMLLIElement[]>([])
    const [images, setImages] = useState(["white","blue","#088A85","black","tomato","green","gold","yellow"])

    useEffect(()=>{
        
    },[])
    return (
        <>
            <ul className="flex overflow-x-auto overflow-y-hidden max-w-[1000px] px-[3em] pb-[5em] mt-[5em]">
                    {images.map((bg, i)=>{
                    return <li  onClick={()=>{
                    }} className={`flex-none w-[300px] min-h-[200px] m-[5px] border`} key={i}>이미지{i+1}</li>
                })}
            </ul>
        </>
    )
}