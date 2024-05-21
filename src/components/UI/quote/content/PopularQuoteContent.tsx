interface PropsType {
    [key: string]: string

}

export default function PopularQuoteContent({ quote, author, readText }: PropsType) {
    return (
        <blockquote className="text-white mt-[1.8em] ">
            <p className="text-[1.05em]" >{readText || quote}</p>
            <span className="block font-bold mt-[1em] text-right">
                - {author} -
            </span>
        </blockquote>
    )
}