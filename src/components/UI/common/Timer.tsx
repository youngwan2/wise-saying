'use client'

import { requestNewAccessToken } from "@/services/user/post"
import { getLoginExp } from "@/utils/session-storage"
import { useCallback, useEffect, useState } from "react"
import { HiClock } from "react-icons/hi2"


const MINUTE_TO_SEC = 60
export default function Timer() {

    const [timeScale, setTimeScale] = useState(100)
    const checkTokenExp = useCallback(async () => {
        
        const exp = getLoginExp()

        if (typeof exp !== 'number') return
        const currentTime = Math.floor(Date.now() / 1000)
        const timeScale = Math.floor((exp - currentTime) / 900 * 100).toFixed(0)

        setTimeScale(Number(timeScale))

        if (exp <= currentTime - MINUTE_TO_SEC) {
            const isSuccess = await requestNewAccessToken();
            if (isSuccess) {
                checkTokenExp()
                console.log("재발급 성공")
            }
        }
    }, [])

    useEffect(() => {
        const timeId = setInterval(checkTokenExp, 1000)

        return () => { clearTimeout(timeId) }
    }, [checkTokenExp])
    return (

        <article className="fixed right-[2em] top-[3em] text-white bg-[#00000039] rounded-[10px] p-[8px] font-sans text-[0.95em] ">
            <p>자동 로그인 간격</p>

            <h2 className="flex items-center justify-center"><HiClock /> <span className="mx-[5px]">{timeScale}</span></h2>
        </article>
    )
}