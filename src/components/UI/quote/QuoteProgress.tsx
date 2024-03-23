import { useEffect, useRef } from "react"

interface PropsType {
    progress: number
}
export default function QuoteProgress({ progress }: PropsType) {
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!divRef.current) return
        divRef.current.style.cssText = `
            width:${progress}%
        `
    }, [progress])

    return (
        <article aria-label='TTS 프로그래스 바'>
            <div className="w-full h-[5px] bg-white mt-[1em] rounded-[10px] relative">
                <div ref={divRef} className="transition-all absolute w-0 bg-[tomato] top-0 left-0 h-[5px]"></div>
            </div>
        </article>
    )
}