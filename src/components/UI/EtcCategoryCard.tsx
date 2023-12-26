"use client"

import { CategoryType } from "@/app/(category)/general-quotes/page"
import { useRouter } from "next/navigation"
interface PropsType {
    categories: CategoryType[]
}
export default function EtcCategoryCard({ categories }: PropsType) {

    const router = useRouter();
    return (
        <ul className=" mt-[5em] flex justify-center min-h-[300px] max-h-[500px] flex-wrap overflow-y-auto">
            {categories.map((category) => {
                return (
                    <li 
                    onClick={()=>{
                        router.push(`/general-quotes/${category.category}`)
                    }}
                    key={category.id} 
                    className="
                        p-[5em]
                        text-[1.25em]
                        text-[#313131]
                        font-semibold
                        odd:-rotate-2 
                        even:rotate-2 
                        min-h-[230px]  
                        max-h-[300px]  
                        bg-[#FFE5A0] 
                        m-3 max-w-[300px] min-w-[260px] 
                        w-[100%] text-center 
                        transition-all
                        hover:shadow-md
                        hover:translate-y-[-20px]
                        hover:bg-[#fae259]
                        hover:cursor-pointer
                        relative">
                    <div className="w-[20px] h-[45px] bg-[rgba(0,0,0,0.7)] absolute top-[-1em] right-2 "></div>
                        {category.category}</li>
                )
            })}
        </ul>
    )
}