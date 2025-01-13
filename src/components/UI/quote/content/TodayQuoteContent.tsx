import Link from "next/link"

interface PropsType {
    quote: string
    author: string
    job?: string
    birth?: string
}

export default function TodayQuoteContent({ quote, author }: PropsType) {

    return (
        <blockquote className="mt-[0.5em]">
            <div className="pb-[1em]">
                {/* 명언 */}
                <span className="relative sm:text-[1.15em] text-[1.05em] mt-[0.5em] text-white">{quote}</span>
            </div>


            {/* 저자 */}
            <strong
                className="w-[130px] inline-block mt-[2em] mr-[1em] text-white text-right hover:text-[tomato] hover:cursor-pointer z-[1000000]"
            >
                <Link title={author + ' 명언 더보기'} className="right-4 bottom-4 absolute" href={'/quotes/authors/' + author}>-{author}-</Link>
            </strong>
        </blockquote>
    )
}