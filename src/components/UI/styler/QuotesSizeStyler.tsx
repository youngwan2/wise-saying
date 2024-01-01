"use client"
import { useQuotesCardSizeStore } from "@/store/store"
import { useEffect, useState } from "react"
import { HiScissors, HiX } from "react-icons/hi"
export default function QUotesSizeStyler() {

    const setSizeStore = useQuotesCardSizeStore((state) => state.setSize)
    const [size, setSize] = useState({
        width: 350,
        height: 400
    })

    useEffect(() => {
        setSizeStore(size)
        console.log(size)
    }, [setSizeStore, size])

    return (
        <>
            <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiScissors color="white" /> <p className="ml-[0.5em]">카드 크기 변경</p></h2>
            <div className="flex items-center text-center">
                <input aria-label="카드 넓이 사용자 입력창" className="px-[1px] mb-[0.5em] w-[160px] " type="number" placeholder="넓이(기본: 350px)" onChange={(e) => {
                    const width = Number(e.currentTarget.value)
                    setSize({ ...size, width })
                }}></input>
                 <HiX className="text-[1.5em] ml-[5px] pb-[5px]" color="white"/>
                <input aria-label="카드 눂이 사용자 입력창" className=" ml-[5px] px-[1px] mb-[0.5em] w-[160px]" type="number" placeholder="높이(기본: 400px)" onChange={(e) => {
                    const height = Number(e.currentTarget.value)
                    setSize({ ...size, height })
                }}></input>
            </div>
        </>
    )
}