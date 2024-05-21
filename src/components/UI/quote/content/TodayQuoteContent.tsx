import { MouseEventHandler } from "react"

interface PropsType {
    quote:string
    author:string
    job?:string
    birth?:string
    onPush: MouseEventHandler<HTMLElement>
 }

export default function TodayQuoteContent({quote, author, job, birth, onPush}:PropsType) {
    return (
        <>
            {/* 명언 */}
            {quote.split('').map((text, i) => {
                return <span key={i} className=" today-quote opacity-100 relative sm:text-[1.25em] text-[1.1em] mt-[0.5em] text-white">{text}</span>
            })}

            {/* 저자 */}
            <strong
                onClick={onPush}
                className="inline-block mt-[2em] mr-[1em] text-white text-right w-full hover:text-[tomato] hover:cursor-pointer"
            >
                {author}({job !== '알수없음' ? job : '사이트 운영자'}{birth ? ';' + birth : ''})
            </strong>
        </>
    )
}