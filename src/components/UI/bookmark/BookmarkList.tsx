import BookmarkCard from './BookmarkCard'
import { BookmarkListType } from './BookmarkModal'

interface PropsType {
  bookmarkList: BookmarkListType[]
  page: number
  isLoading: boolean
  isDeleting: boolean
  onClickDelete: (bookmarkId: number, type:string) => void
}
export default function BookmarkList({
  bookmarkList,
  isLoading,
  isDeleting,
  onClickDelete,
}: PropsType) {
  return (
    <div className="sm:px-[1em] px-[0.2em] sm:text-[1em] text-[0.95em] mt-[2em] overflow-y-auto overflow-x-hidden min-h-[400px]  py-[1em] w-[90%] mx-auto flex flex-col justify-center items-center">
      {!isLoading ? (
        bookmarkList?.map((bookmark: BookmarkListType) => {
          return (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              isDeleting={isDeleting}
              onClickDelete={()=>onClickDelete(bookmark.id, bookmark.author)}
            />
          )
        })
      ) : (
        <span>데이터를 가져오는 중입니다.</span>
      )}
    </div>
  )
}
