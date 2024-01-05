"use client"
import { HiArchiveBox, HiOutlinePencil, HiOutlineTrash, HiScissors } from "react-icons/hi2"
import useHasToken from "@/custom/useHasToken"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserPostIdStore } from "@/store/store"
import { bookmarker, pageSwitch, quotesSelector } from "@/utils/commonFunctions"
import { ItemsType } from "@/types/items.types"

interface PropsType {
    item: ItemsType,
    items: ItemsType[]
}
export default function UserQuotesCardButton({ item, items }: PropsType) {

    const hasToken = useHasToken()
    const [userEmail, setUserEmail] = useState('')
    const router = useRouter()

    const setPostId = useUserPostIdStore((state) => state.setPostId)

    // 명언 삭제
    const deleteItem = (id: number) => {
        if (hasToken) {
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            const url = `/api/posts/${id}`
            fetch(url, {
                method: "DELETE",
                headers
            })
             .then(async (response) => {
                    const { success } = await response.json()
                    if (success === true) location.reload()
                    if (success === false) {
                        localStorage.clear()
                        alert('로그인 가능 시간이 만료되었습니다. 다시 로그인 해주세요.')
                        location.reload()
                    }
                })
                .catch((console.error))
        }
        if (!hasToken) {
            alert("접근 권한이 없습니다.")
        }
    }

    useEffect(() => {
        if (hasToken) {
            const user = localStorage.getItem('user')!
            setUserEmail(user)
        }

    }, [hasToken])

    return (
        <article
            aria-label="수정 및 삭제, 꾸미기,담기 버튼의 컨테이너"
            className={` flex justify-center items-center invisible opacity-0 bg-[#14131328] absolute left-0 right-0 top-0 bottom-0 p-[5em] group-hover:visible group-hover:opacity-100 flex-wrap transition-all group-hover:backdrop-blur-[1px]  `}>
            {/* 수정 */}
            <button className={`p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] m-[0.5em] ${userEmail === item.email ? 'block' : 'hidden'}`} onClick={() => {
                setPostId(Number(item.id))
                router.push('/update-wisesaying')
            }} aria-label="수정버튼"><HiOutlinePencil></HiOutlinePencil></button>
            {/* 삭제 */}
            <button className={`p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] ${userEmail === item.email ? 'block' : 'hidden'} `} onClick={() => {
                deleteItem(item.id)
            }} aria-label="삭제버튼"><HiOutlineTrash></HiOutlineTrash></button>
            <br />
            {/* 꾸미기 */}
            <button onClick={() => {
                const id = item.id
                pageSwitch(router, id)
                quotesSelector(items, id)
            }} className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] m-[0.5em]" aria-label='명언 꾸미기 편집화면 이동 버튼' ><HiScissors /></button>
            {/* 담기 */}
            <button onClick={() => {
                bookmarker(hasToken, item.id, items, '유저')
            }} className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] " aria-label='명언 담기 버튼'><HiArchiveBox /></button>
        </article>
    )
}