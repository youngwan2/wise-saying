import Link from "next/link";
import BookmarkDeleteButton from "../button/BookmarkDeleteButton";
import { HiLink } from "react-icons/hi2";

interface PropsType {
    bookmark: {
        id: number
        category: string
        wise_sayings: string
        author: string
        url: string
    }
}
export default function BookmarkCard({ bookmark }: PropsType) {
    
    return (
        <ul className="shadow-[inset_-3px_-3px_5px_0_rgba(0,0,0,0.5)]  hover:shadow-[0_0_0_5px_tomato] flex flex-col bg-[white] max-w-[900px] w-full p-[1em] pt-[2em] m-[10px] rounded-[10px] subpixel-antialiased relative" key={bookmark.id}>
            <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] "><span className="inline-block min-w-[50px] tracking-[6px]"></span>{bookmark.id} / {bookmark.author} / {bookmark.wise_sayings.slice(0,25)}...</li>
            <li className="text-[#f77b65] text-[1.5em] absolute right-[2em] top-[3px] hover:shadow-[0_0_1px_1px_tomato] " ><Link href={`${bookmark.url}`}><HiLink /></Link></li>
            <li><BookmarkDeleteButton id={bookmark.id} /></li>
        </ul>
    )
}