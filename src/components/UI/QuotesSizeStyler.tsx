"use client"
import { useQuotesCardSizeStore } from "@/store/store"
import { useEffect, useState } from "react"
import { HiScissors } from "react-icons/hi"
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
            <div className="flex">
            <input aria-label="카드 넓이 사용자 입력창" className="px-[1em] py-[0.5em] mb-[0.5em] max-w-[30%]" type="number" placeholder="넓이(기본: 300px)" onChange={(e) => {
                const width = Number(e.currentTarget.value)
                setSize({ ...size, width })
            }}></input>
            <input aria-label="카드 눂이 사용자 입력창"  className=" ml-[5px] px-[1em] py-[0.5em] mb-[0.5em] max-w-[30%]" type="number" placeholder="높이(기본: 300px)" onChange={(e) => {
                const height = Number(e.currentTarget.value)
                setSize({ ...size, height })
            }}></input>
            </div>
        </>
    )
}