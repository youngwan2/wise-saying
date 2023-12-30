"use client"

import useHasToken from "@/custom/useHasToken"
import { ItemsType } from "@/types/items.types"
import { useEffect, useState } from "react"
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"
import { HiArchive, HiScissors } from 'react-icons/hi'
import { useUserPostIdStore } from "@/store/store"
import { pageSwitch, quotesSelector } from "@/utils/commonFunctions"

type UserItemsType = {
    email: string
}

type CombinePropsType = { items: (UserItemsType & ItemsType)[] }

export default function UserQuotesCard({ items }: CombinePropsType) {
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
            }
            )
                .then(async (response) => {
                    const { status, success } = await response.json()
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
        <ul className="flex justify-center flex-wrap overflow-y-auto max-h-[80vh]">
            {items.map((item) => {
                return <li className="
                group 
                p-[2em]
                odd:-rotate-2 
                even:rotate-2 
                min-h-[230px]  
                max-h-[490px]  
                bg-[#FFE5A0] 
                m-[2em] max-w-[400px] min-w-[200px] 
                w-[100%] text-center 
                text-[#222222]
                transition-all
                hover:shadow-md
                hover:translate-y-[-20px]
                hover:bg-[#fae259]
                relative" key={item.id}>
                    {/* 식별 번호 */}
                    <span className=" absolute top-2 left-2 rounded-[5em] bg-[white] p-[3px] px-[6px] mb-[1em] inline-block">{item.id}</span>
                    {/* 콘텐츠 */}
                    <blockquote className="mt-[1em]">
                        <p>{item.wise_sayings}</p>
                        <span className="block font-bold mt-[1.5em]">{item.author}</span>
                        <span className="absolute bottom-1 left-2">창작자: {item.email.split('@')[0]}</span>
                    </blockquote>
                    <div className="w-[20px] h-[45px] bg-[rgba(0,0,0,0.7)] absolute top-[-1em] right-2 "></div>

                    {/* 버튼 컨테이너 */}
                    <span
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
                        <button className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] " aria-label='명언 담기 버튼'><HiArchive /></button>
                    </span>
                </li>
            })}
        </ul>
    )
}