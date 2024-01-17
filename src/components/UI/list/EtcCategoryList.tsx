"use client"

import EtcCategoryCard from "../card/EtcCategoryCard";
import { CategoryType } from "@/app/(category)/etc-quotes/page";
interface PropsType {
    categories: CategoryType[]
}
export default function EtcCategoryList({ categories }: PropsType) {

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