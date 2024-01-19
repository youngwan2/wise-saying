import TodayQuoteCard from "../card/TodayQuoteCard"


interface PropsType {
    quotes: {
        id: number
        author: string
        wise_sayings: string
    }[]
}
export default function TodayQuotelist({ quotes }: PropsType) {

    return (
        <article className="lg:left-[50%] lg:translate-x-[-40%]  top-[2em] absolute left-[50%] translate-x-[-50%] px-[1em] w-full max-w-[700px] max-h-[450px]">
            <h2 className="text-[1.25em] my-[10px] font-bold text-center ">오늘의 명언</h2>
            <ul className="pt-[1em] ">
                {quotes.map((quote) => {
                    return <TodayQuoteCard key={quote.id} id={quote.id} author={quote.author} quote={quote.wise_sayings} />
                })}
            </ul>
        </article>

    )
}