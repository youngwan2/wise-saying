"use client"

import useHasToken from "@/custom/useHasToken"
import { ItemsType } from "@/types/items.types"
import { useEffect, useState } from "react"
import { HiOutlinePencil, HiOutlineTrash, HiTrash } from "react-icons/hi"

type UserItemsType = {
    email: string
}

type CombinePropsType = { items: (UserItemsType & ItemsType)[] }

export default function UserQuotesCard({ items }: CombinePropsType) {
    const hasToken = useHasToken()
    const [isUpdateItem, setIsUpdateItem] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [isUser, setIsUser] = useState(false)

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
            ).then(async(response)=>{
                const {status, success} = await response.json()
                if(success === true) location.reload()
                if(success === false) {
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


    const updateItem = (id: number) => {
        if (hasToken) {
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            const url = `http:localhost:3000/api/user-quotes/${id}`
            fetch(url, {
                method: "PUT",
                headers
            }
            ).catch((console.error))
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
        <ul className="flex justify-center flex-wrap overflow-y-auto  max-h-[500px]">
            {items.map((item) => {
                return <li className="
                group 
                p-[3em]
                odd:-rotate-2 
                even:rotate-2 
                min-h-[230px]  
                max-h-[490px]  
                bg-[#FFE5A0] 
                m-[5em] max-w-[400px] min-w-[200px] 
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
                        aria-label="수정 및 삭제 버튼의 컨테이너"
                        className={`invisible opacity-0 bg-[#14131328] absolute left-0 right-0 top-0 bottom-0 p-[5em] group-hover:visible group-hover:opacity-100 transition-all group-hover:backdrop-blur-[1px] ${userEmail === item.email? 'block':'hidden'} `}>
                        <button className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.5em]" onClick={() => {
                            setIsUpdateItem(true)
                        }} aria-label="수정버튼"><HiOutlinePencil></HiOutlinePencil></button>
                        <button className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em]" onClick={() => {
                            deleteItem(item.id)
                        }} aria-label="삭제버튼"><HiOutlineTrash></HiOutlineTrash></button>
                    </span>
                </li>
            })}
        </ul>
    )
}