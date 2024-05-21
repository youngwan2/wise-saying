import { BookmarkType } from "./BookmarkCard"

interface PropsType {
    bookmark: BookmarkType
  }

export default function BookmarkContent({ bookmark }: PropsType) {
    const { id, author, quote } = bookmark
  
    return (
      <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] ">
        {id} / {author||'사용자'}/{quote.slice(0, 25)}...
      </li>
    )
  }