interface PropsType {
    [key: string]: string
}

const MIN_TEXT_LENGTH = 1
export default function QuoteContent({ readText, author, quote }: PropsType) {
    return (
        <blockquote className="mt-[1em] text-white relative">
            <p className='p-[1em] '>
                <span className="text-[1.11em]">{readText.length > MIN_TEXT_LENGTH ? readText : quote}</span>
            </p>

            <span className="block font-bold mt-[1em] text-right bg-gradient-to-r from-[rgba(255,255,255,0.15)] from-35% to-[rgba(255,255,255,0.05)] px-2">
                - {author} -
            </span>
        </blockquote>

    )
}
