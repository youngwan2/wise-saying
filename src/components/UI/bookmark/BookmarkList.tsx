"use client"
import useHasToken from "@/custom/useHasToken"
import { getBookmarkListFormDB } from "@/services/item.services"
import { useBookmarkStore } from "@/store/store"
import { useCallback, useEffect } from "react"
import BookmarkCloseButton from "../button/BookmarkCloseButton"
import { HiBookmarkSquare } from "react-icons/hi2"
import { logoutUser } from "@/utils/commonFunctions"
import { useRouter } from "next/navigation"


interface BookmarkListType {
    id: number
    author: string
    wise_sayings: string
    category: string
}

export default function BookmarkList() {
    const toggleState = useBookmarkStore((state) => state.toggleState)
    const setBookmarkList = useBookmarkStore((state) => state.setBookmarkList)
    const setListCount = useBookmarkStore((state) => state.setListCount)
    const bookmarkList: BookmarkListType[] = useBookmarkStore((state) => state.bookmarkList)
    const hasToken = useHasToken()
    const router = useRouter()

    const getBookmarkListFromDb = useCallback(async () => {
        if (hasToken) {
            const token = localStorage.getItem('token')!
            const response = await getBookmarkListFormDB(token)
            const { meg, status, items } = response

            if (status === 200) {
                setBookmarkList(items)
                setListCount(items.length)
                router.refresh()
            }
            if( status === 401) {
                alert(meg)
                logoutUser()
            }
        }

    }, [hasToken, setBookmarkList, setListCount,router])

    useEffect(() => {
        getBookmarkListFromDb()

    }, [getBookmarkListFromDb])

    return (
        <article className={`${toggleState ? 'z-40 fixed left-0 right-0 top-0 bottom-0 bg-[#000000a4] visible opacity-100' : 'invisible opacity-0'}`}>
            <BookmarkCloseButton />
            <div className="px-[2em] mt-[2em] absolute left-[50%] translate-x-[-50%] top-[2em] overflow-y-auto overflow-x-hidden max-h-[800px] p-[1em] w-[90%]">
                <h2 className="text-white text-[2em] mb-[1em] pl-[10px] flex items-center"><HiBookmarkSquare className="pr-[5px]"/>북마크 리스트</h2>

                {bookmarkList.map((bookmark) => {
                    return <ul key={bookmark.id} className="flex flex-col bg-[white] max-w-[1200px] w-full p-[1em] m-[5px] rounded-[10px] subpixel-antialiased ">
                        <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] ">{bookmark.id}</li>
                        <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] ">{bookmark.category}</li>
                        <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] ">{bookmark.author}</li>
                        <li className="mx-[5px] font-bold p-[7px] border border-[#454444a0] ">{bookmark.wise_sayings}</li>

                    </ul>
                })}
            </div>
        </article>
    )
}