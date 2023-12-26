"use client"

import { ItemsType } from "@/types/items.types"

type UserItemsType = {
    email: string
}

type CombinePropsType = { items: (UserItemsType & ItemsType)[] }

export default function UserQuotesCard({ items }: CombinePropsType) {

    return (
        <ul className="flex justify-center flex-wrap  overflow-y-auto  max-h-[500px]">
            {items.map((item) => {
                return <li className="
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
                hover:cursor-pointer
                relative" key={item.id}>
                    <span className=" absolute top-2 left-2 rounded-[5em] bg-[white] p-[3px] px-[6px] mb-[1em] inline-block">{item.id}</span>
                    <blockquote className="mt-[1em]">
                        <p>{item.wise_sayings}</p>
                        <span className="block font-bold mt-[1.5em]">{item.author}</span>
                        <span className="absolute bottom-1 left-2">창작자: {item.email.split('@')[0]}</span>
                    </blockquote>
                    <div className="w-[20px] h-[45px] bg-[rgba(0,0,0,0.7)] absolute top-[-1em] right-2 "></div>
                </li>
            })}
        </ul>
    )
}