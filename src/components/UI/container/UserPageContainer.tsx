"use client"

import { HiUsers } from "react-icons/hi2";
import QuotesCard from "../card/QuotesCard";

interface PropsType {
    items : {
        id: number
        author:string
        wise_sayings:string;
    }[]
}
export default function UserPageContainer({items}:PropsType) {

        const itemCount = items.length

    return (
        <section >
            <h2 className="flex items-center text-[1.5em] p-[10px] ">
                <span className="bg-[#ffae00] p-[2.5px] rounded-[5px] mx-[5px] mr-[10px]"><HiUsers /></span> 사용자 명언({itemCount})</h2>
            <QuotesCard items={items} category="유저" />
        </section >
    )
}