import { useBookmarkStore } from '@/store/store'
import BookmarkDeleteButton from '../button/BookmarkDeleteButton'
import Link from 'next/link'
import { HiLink } from 'react-icons/hi2'

interface BookmarkType {
  id: number
  category: string
  wise_sayings: string
  author: string
  url: string
}

export default function ConcernQuotesCard() {
  const bookmarkList: BookmarkType[] = useBookmarkStore(
    (state) => state.bookmarkList,
  )
  if (bookmarkList.length < 1)
    return (
      <h2 className="border inline-block p-[2em] relative left-[50%] translate-x-[-50%] mt-[8em] text-[1.25em] rounded-[10px] shadow-[5px_10px_10px_0_rgba(0,0,0,0.5)] bg-gradient-to-tr from-orange-50 to-white">
        추가된 게시글이 없습니다.
      </h2>
    )

  return (
    <article className="mt-[3em] text-start min-h-[630px]">
      {bookmarkList.map((bookmark) => {
        return (
          <ul
            className="border shadow-[inset_-3px_-3px_5px_0_rgba(0,0,0,0.5)] p-[10px] rounded-[10px] my-[5px] max-w-[700px] mx-auto hover:bg-gradient-to-r from-white to-gray-200 relative "
            key={bookmark.id}
          >
            <li className="flex">
              <span className="rounded-[5px] mr-[10px] min-w-50px text-center max-w-[50px] inline-block w-full px-[3px] m-[3px] font-semibold">
                구분{' '}
              </span>
              {bookmark.id}
            </li>
            <li className="flex">
              <span className="rounded-[5px] mr-[10px] min-w-50px text-center max-w-[50px] inline-block w-full px-[3px] m-[3px] font-semibold">
                인물{' '}
              </span>
              {bookmark.author}
            </li>
            <li className="flex">
              <span className="rounded-[5px] mr-[10px] min-w-50px text-center max-w-[50px] inline-block w-full px-[3px] m-[3px] font-semibold">
                명언{' '}
              </span>
              {bookmark.wise_sayings}
            </li>
            <li className="flex">
              <span className="rounded-[5px] mr-[10px] min-w-50px text-center max-w-[50px] inline-block w-full px-[3px] m-[3px] font-semibold">
                분류{' '}
              </span>
              {bookmark.category}
            </li>
            <li className="text-[#f77b65] text-[1.5em] absolute right-[2em] top-[3px] hover:shadow-[0_0_1px_1px_tomato] ">
              <Link href={`${bookmark.url}`}>
                <HiLink />
              </Link>
            </li>
            <li>
              <BookmarkDeleteButton id={bookmark.id} />
            </li>
          </ul>
        )
      })}
    </article>
  )
}
