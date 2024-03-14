interface PropsType {
    [key: string]: string
}

const MIN_TEXT_LENGTH = 1
export default function QuoteContent({ readText, author, quote }: PropsType) {
    return (
        <blockquote className="mt-[1em] text-white ">
            <p className='p-[1em]'>
                <span className=" text-[1.11em]">{readText.length > MIN_TEXT_LENGTH ? readText : quote}</span>
            </p>

            <span className="block font-bold mt-[1em] text-right">
                - {author} -
            </span>
        </blockquote>

    )
}
