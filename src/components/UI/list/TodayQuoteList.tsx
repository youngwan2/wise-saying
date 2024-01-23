import TodayQuoteCard from '../card/TodayQuoteCard'

interface PropsType {
  quotes: {
    id: number
    author: string
    quote: string
  }[]
}
export default function TodayQuotelist({ quotes }: PropsType) {
  return (
    <article className=" top-[2em] absolute left-[50%] translate-x-[-50%] w-full max-w-[700px] max-h-[450px]">
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] mt-[2em] mb-[1em] ">
        오늘의 명언
      </h2>
      <ul className="pt-[1em] ">
        {quotes.map((quote, i) => {
          return (
            <TodayQuoteCard
              key={quote.id}
              index={i}
              id={quote.id}
              author={quote.author}
              quote={quote.quote}
            />
          )
        })}
      </ul>
    </article>
  )
}
