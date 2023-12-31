"use client"
import useSWR from "swr"
import useHasToken from "@/custom/useHasToken"
import { getBookmarkListFormDB } from "@/services/item.get"
import { useBookmarkStore } from "@/store/store"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { HiBookmarkSquare } from "react-icons/hi2"
import { logoutUser } from "@/utils/commonFunctions"

import BookmarkCloseButton from "../button/BookmarkCloseButton"
import BookmarkCard from "../card/BookmarkCard"


interface BookmarkListType {
    id: number
    author: string
    wise_sayings: string
    category: string
    url: string
}

export default function BookmarkList() {
    const toggleState = useBookmarkStore((state) => state.toggleState)
    const setBookmarkList = useBookmarkStore((state) => state.setBookmarkList)
    const bookmarkList = useBookmarkStore((state) => state.bookmarkList)
    const setListCount = useBookmarkStore((state) => state.setListCount)

    const hasToken = useHasToken()
    const token = hasToken ? localStorage.getItem('token')! : ''

    const router = useRouter()

    // fetcher 함수는 key 파라미터를 그대로 받아들이며, 캐시 키도 전체 key 인수와 연관됩니다. 위의 예에서 url과 token은 둘 다 캐시 키에 들어맞습니다.
    const { data, isLoading } = useSWR(['/api/bookmark', token], ([url, token]) => getBookmarkListFormDB(url, token), {
        refreshInterval: 5000
    })
    const hasData = !!data

    const bookmarkListUpdate = useCallback(() => {
        if(hasData) {
            const count = data.totalCount 
                        const items = data.items
            setBookmarkList(items)
             setListCount(count)
        }
    }, [data, hasData, setListCount, setBookmarkList])

    useEffect(() => {
        if (data && (data.status === 401)) {
            router.push('/login')
            logoutUser()
        }
    }, [router, data, isLoading])

        useEffect(() => {
        bookmarkListUpdate()
    }, [bookmarkListUpdate])


    return (
        <article className={`${toggleState ? 'z-40 fixed left-0 right-0 top-0 bottom-0 bg-[#000000a4] visible opacity-100' : 'invisible opacity-0'}`}>
            <BookmarkCloseButton />
            <div className="px-[2em] mt-[2em] absolute left-[50%] translate-x-[-50%] top-[2em] overflow-y-auto overflow-x-hidden max-h-[800px] p-[1em] w-[90%]">
                <h2 className="text-white text-[2em] mb-[1em] pl-[10px] flex items-center"><HiBookmarkSquare className="pr-[5px]" />북마크 리스트</h2>
                {!isLoading  ? bookmarkList.map((bookmark: BookmarkListType) => {
                    return <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                }) : <span>데이터를 가져오는 중입니다.</span>}

            </div>
        </article>
    )
}