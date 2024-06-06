import Link from "next/link"

interface PropsType {
    quote: string
    author: string
    job?: string
    birth?: string
}

export default function TodayQuoteContent({ quote, author }: PropsType) {

    return (
        <blockquote>
            <div className="pb-[1em]"> 
                {/* 명언 */}
                {quote.split('').map((text, i) => {
                    return <span key={i} className=" today-quote opacity-100 relative sm:text-[1.25em] text-[1.1em] mt-[0.5em] text-white">{text}</span>
                })}
            </div>


            {/* 저자 */}
            <strong
                className=" w-[130px] inline-block mt-[2em] mr-[1em] text-white text-right hover:text-[tomato] hover:cursor-pointer z-[1000000]"
            >
                <Link title={author+' 명언 더보기'} className="right-4 bottom-4 absolute" href={'/quotes/authors/' + author}>-{author}-</Link>
            </strong>
        </blockquote>
    )
}