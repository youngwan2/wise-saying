import type { QuoteType } from "@/types/items.types"

interface PropsType {
    children: React.ReactNode
    currentQuoteCount: number
    splitQuotes: QuoteType[]
    onClickPageSwitch: (author: string, id: number) => void
}
export default function SearchQuoteList({ children, currentQuoteCount, splitQuotes, onClickPageSwitch }: PropsType) {
    return (
        <ul>
            {children}
            {currentQuoteCount >= 1 &&
                splitQuotes?.map((item) => {
                    return (
                        <li
                            onClick={() => onClickPageSwitch(item.author, item.id)}
                            key={item.id}
                            className="sm:flex-row flex-col flex p-[5px] py-[10px] min-h-[50px] border-b-[1px] border-dashed text-white items-center hover:bg-[#ffffff3c] hover:cursor-pointer"
                        >
                            <p className="mr-[5px] w-[80%]">{item.quote}</p>
                            <span className="sm:text-center sm:mr-0 sm:mt-0 mt-[1em] sm:w-[20%] w-full text-right mr-[6.8em] ">{item.author}</span>
                        </li>
                    )
                })}
        </ul>
    )
}