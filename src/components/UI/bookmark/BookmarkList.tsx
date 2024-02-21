import { KeyedMutator } from "swr"
import BookmarkCard from "./BookmarkCard"
import { BookmarkListType } from "./BookmarkModal"

interface PropsType {
    isLoading: boolean
    bookmarkList: BookmarkListType[],
    page: number
    mutate: KeyedMutator<any>
}
export default function BookmarkList({ bookmarkList, isLoading, page, mutate }: PropsType) {

    return (
        <div className="px-[1em] mt-[2em] overflow-y-auto overflow-x-hidden min-h-[400px]  p-[1em] w-[90%] mx-auto flex flex-col justify-center items-center">
            {!isLoading ? (
                bookmarkList?.map((bookmark: BookmarkListType) => {
                    return <BookmarkCard bookmark={bookmark} key={bookmark.id} page={page} mutate={mutate} />
                })
            ) : (
                <span>데이터를 가져오는 중입니다.</span>
            )}
        </div>
    )
}