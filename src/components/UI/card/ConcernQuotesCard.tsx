import { useBookmarkStore } from "@/store/store"
import BookmarkDeleteButton from "../button/BookmarkDeleteButton"
import Link from "next/link"
import { HiLink } from "react-icons/hi2"


interface BookmarkType {
    id: number
    category: string
    wise_sayings: string
    author: string
    url: string
}

export default function ConcernQuotesCard() {
    const bookmarkList: BookmarkType[] = useBookmarkStore((state) => state.bookmarkList)

    return (
        <article className="overflow-y-auto overflow-x-hidden max-h-[700px]">
            {bookmarkList.map((bookmark) => {
                return (
                <ul className="flex flex-col bg-[white] max-w-[1200px] w-full p-[1em] pt-[2em] m-[5px] rounded-[10px] subpixel-antialiased  relative " key={bookmark.id}>
                    <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] "><span className="inline-block min-w-[50px] tracking-[6px]">식별| </span>{bookmark.id}</li>
                    <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] "><span className="inline-block min-w-[50px] tracking-[5px]">구분| </span>{bookmark.category}</li>
                    <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] "><span className="inline-block min-w-[50px] tracking-[5px]">저자| </span>{bookmark.author}</li>
                    <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] "><span className="inline-block min-w-[50px] tracking-[5px]">명언| </span>{bookmark.wise_sayings}</li>
                    <li className="text-[#f77b65] text-[1.5em] absolute right-[2em] top-[3px] hover:shadow-[0_0_1px_1px_tomato] " ><Link href={`${bookmark.url}`}><HiLink /></Link></li>
                    <li><BookmarkDeleteButton id={bookmark.id} /></li>
                </ul>
                )
            })}
        </article>
    )
}