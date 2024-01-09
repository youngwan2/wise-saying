"use client"

import { CategoryType } from "@/app/(category)/general-quotes/page"
import { useRouter } from "next/navigation"
interface PropsType {
    category: CategoryType
}
export default function EtcCategoryCard({ category }: PropsType) {

    const router = useRouter();
    return (
        <li
            tabIndex={0}
            onKeyUp={(e) => {
                const key = e.key
                if(key !=='Enter') return
                router.push(`/general-quotes/${category.category}`)
            }}
            onClick={() => {
                router.push(`/general-quotes/${category.category}`)
            }}
            key={category.id}
            className="
                p-[4em]
                pt-[4em]
                odd:-rotate-2 
                even:rotate-2 
                font-bold
                bg-gradient-to-bl from-white to-[#e0dddd2f]
                text-[1.4em]
                min-h-[230px]  
                max-h-[280px]  
                bg-[white] 
                m-[2.5em] max-w-[300px] min-w-[200px] 
                w-[100%] text-center 
                transition-all
                hover:underline
                hover:decoration-wavy
                hover:decoration-[tomato]
                hover:shadow-[0_10px_5px_0_rgba(0,0,0,0.4)]
                shadow-[1px_10px_5px_0_rgba(0,0,0,0.5)]
                hover:translate-y-[20px]
                hover:bg-[white]
                hover:scale-[1.15]
                hover:z-10
                hover:cursor-pointer
                relative"
        >
            <div className="w-[20px] h-[45px] bg-[rgba(71,69,69,0.7)] absolute top-[-1em] right-[1em] rotate-[30deg] "></div>
            {category.category}</li>
    )
}