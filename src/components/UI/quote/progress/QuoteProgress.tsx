import { useEffect, useRef } from "react"

interface PropsType {
    progress: number
}
export default function QuoteProgress({ progress }: PropsType) {
    const divRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!(divRef.current && circleRef.current)) return
        divRef.current.style.cssText = `
            width:${progress}%
        `
        circleRef.current.style.cssText = `
            left:${progress}%
        `
    }, [progress])

    return (
        <article aria-label='TTS 프로그래스 바'>
            <div className="w-full h-[3px] bg-[#ffffff48] mt-[1em] rounded-[10px] relative">
                <div ref={circleRef} className="transition-all max-w-[12px] w-full h-[12px] rounded-[30%] absolute top-[-0.3em] left-0 bg-[#91919179]"></div>
                <div ref={divRef} className="transition-all absolute w-0 bg-[#b2b0b094] top-0 left-0 h-[3px]"></div>
            </div>
        </article>
    )
}