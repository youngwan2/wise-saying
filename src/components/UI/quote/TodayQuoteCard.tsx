import { SlEarphones } from 'react-icons/sl'
import type { MouseEventHandler } from 'react'

interface PropsType {
    author: string
    id: number
    quote: string
    onPrefetch: MouseEventHandler<HTMLButtonElement>
    onPush: MouseEventHandler<HTMLElement>
    onSetText: MouseEventHandler<HTMLButtonElement>
}

export default function TodayQuoteCard({
    id,
    author,
    quote,
    onPrefetch,
    onPush,
    onSetText,
}: PropsType) {
    return (
        <li
            className="shadow-[inset_0_0_0_3px_white] rounded-[10px]  my-[1em] max-w-[600px] bg-transparent  px-[15px] py-[35px] mx-auto relative hover:bg-[#d5d5d533] "
            key={id}
        >
            {/* 명언 듣기 버튼 */}
            <button
                aria-label="명언 듣기"
                onClick={onSetText}
                className="absolute top-2 right-2 hover:border hover:border-[tomato] text-white p-[5px]"
            >
                <SlEarphones />
            </button>
            
            {/* 명언 */}
            {quote.split('').map((text, i) => {
                return <span key={i} className=" today-quote opacity-100 relative sm:text-[1.25em] text-[1.1em] mt-[0.5em] text-white">{text}</span>
            })}

            {/* 저자 */}
            <strong
                onMouseEnter={onPrefetch}
                onClick={onPush}
                className="inline-block mt-[2em] mr-[1em] text-white text-right w-full hover:text-[tomato] hover:cursor-pointer"
            >
                {author}
            </strong>
            <div className="max-w-[100px] border-t-[20px] border-b-[20px] absolute  right-0 z-[1] top-0"></div>
        </li>
    )
}
