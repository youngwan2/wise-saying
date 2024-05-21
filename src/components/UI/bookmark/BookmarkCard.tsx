import BookmarkDeleteButton from './button/BookmarkDeleteButton'
import BookmarkContent from './BookmarkContent'
import BookmarkLink from './BookmarkLink'


export interface BookmarkType {
  id: number
  quote: string
  author: string
  url: string
}
interface PropsType {
  bookmark: BookmarkType
  isDeleting: boolean
  onClickDelete: () => void
}

export default function BookmarkCard({
  bookmark,
  isDeleting,
  onClickDelete,
}: PropsType) {
  const { id, url } = bookmark
  return (
    <ul
      className="shadow-[inset_-3px_-3px_5px_0_rgba(0,0,0,0.5)]  hover:shadow-[0_0_0_2px_tomato] flex flex-col bg-[white] max-w-[900px] w-full p-[1em] pt-[2em] m-[5px] rounded-[10px] subpixel-antialiased relative"
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




