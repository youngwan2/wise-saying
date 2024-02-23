import Link from 'next/link'
import BookmarkDeleteButton from './BookmarkDeleteButton'
import { HiLink } from 'react-icons/hi2'

interface ContentPropsType {
  bookmark: BookmarkType
}
interface BookmarkType {
  id: number
  quote: string
  author: string
  url: string
}
interface PropsType {
  bookmark: BookmarkType
  isDeleting: boolean
  onClickDelete: (bookmarkId: number) => void
}

export default function BookmarkCard({
  bookmark,
  isDeleting,
  onClickDelete,
}: PropsType) {
  const { id, url } = bookmark
  return (
    <ul
      className="shadow-[inset_-3px_-3px_5px_0_rgba(0,0,0,0.5)]  hover:shadow-[0_0_0_5px_tomato] flex flex-col bg-[white] max-w-[900px] w-full p-[1em] pt-[2em] m-[5px] rounded-[10px] subpixel-antialiased relative"
      key={id}
    >
      <BookmarkContent bookmark={bookmark} />
      <BookmarkLink url={url} />
      <BookmarkDeleteButton
        id={id}
        isDeleting={isDeleting}
        onClickDelete={onClickDelete}
      />
    </ul>
  )
}

function BookmarkContent({ bookmark }: ContentPropsType) {
  const { id, author, quote } = bookmark

  return (
    <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] ">
      {id} / {author}/{quote.slice(0, 25)}...
    </li>
  )
}

function BookmarkLink({ url }: { url: string }) {
  return (
    <li className="text-[#f77b65] text-[1.5em] absolute right-[2em] top-[3px] hover:shadow-[0_0_1px_1px_tomato] ">
      <Link href={`${url}`}>
        <HiLink />
      </Link>
    </li>
  )
}
