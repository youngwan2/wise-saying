"use client"

import { CategoryType } from "@/app/(category)/general-quotes/page"
import { useRouter } from "next/navigation"
import EtcCategoryCard from "../card/EtcCategoryCard";
interface PropsType {
    categories: CategoryType[]
}
export default function EtcCategoryList({ categories }: PropsType) {

    const router = useRouter();
    return (
        <ul className=" mt-[5em] flex justify-center max-h-[100vh] flex-wrap overflow-y-auto">
            {categories.map((category) => {
                return (
                    <EtcCategoryCard key={category.id} category={category}/>
                )
            })}
        </ul>
    )
}