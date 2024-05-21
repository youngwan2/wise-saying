import { ItemsType } from "@/types/items.types"
import { MouseEventHandler } from "react"

interface PropsType {

    item:ItemsType
    onClick:MouseEventHandler<HTMLLIElement>
 }

export default function SearchQuoteCard({item, onClick}:PropsType) {
    return (
        <li
            onClick={onClick}
            key={item.quote_id}
            className="sm:flex-row flex-col flex p-[5px] py-[10px] min-h-[50px] border-b-[1px] border-dashed text-white items-center hover:bg-[#ffffff3c] hover:cursor-pointer"
        >
            <p className="mr-[5px] w-[80%]">{item.quote}</p>
            <span className="sm:text-center sm:mr-0 sm:mt-0 mt-[1em] sm:w-[20%] w-full text-right mr-[6.8em] ">
                {item.author}
            </span>
        </li>
    )
}