'use client'

import { requestNewAccessToken } from "@/services/user/post"
import { getLoginExp } from "@/utils/session-storage"
import { useCallback, useEffect, useState } from "react"
import { HiClock } from "react-icons/hi2"


const MINUTE_TO_SEC = 60
export default function Timer() {

    const [timeScale, setTimeScale] = useState(0)

    // 토큰 만료 시간 측정
    const checkTokenExp = useCallback(async () => {

        const exp = getLoginExp()

        if (typeof exp !== 'number') return

        const currentTime = Math.floor(Date.now() / 1000)
        const expired60SecondsAgo = exp - (currentTime - MINUTE_TO_SEC) //  현재(sec) - 60(sec) = 1분 전 토큰 만료
        setTimeScale(Number(expired60SecondsAgo))

        if (exp <= currentTime - MINUTE_TO_SEC) {
            const isSuccess = await requestNewAccessToken();
            if (isSuccess) checkTokenExp()
        }
    }, [])

    useEffect(() => {
        const timeId = setInterval(checkTokenExp, 1000)

        return () => { clearTimeout(timeId) }
    }, [checkTokenExp])

    function debounce(){
        let timeId:NodeJS.Timeout

        return function(func:Function,delay:number){
            clearTimeout(timeId)
            timeId = setTimeout(()=>{
                func()
            }, delay)
        }
    }


    const windowBlur = useCallback(() => {
        const  debounceCloser = debounce()
        window.addEventListener('focus', () => {
          debounceCloser(requestNewAccessToken, 1000 * 40)
        })
    }, [])

    useEffect(() => {
        windowBlur()
        return () => removeEventListener('focus', windowBlur)
    }, [windowBlur])
    return (

        <article className="fixed right-[2em] top-[3em] text-white bg-[#00000039] rounded-[10px] p-[8px] font-sans text-[0.95em] ">
            <p>재로그인</p>

            <h2 className="flex items-center justify-center"><HiClock /> <span className="mx-[5px]">{timeScale}</span></h2>
        </article>
    )
}