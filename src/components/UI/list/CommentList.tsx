"use client"

import { getCommentsFormDb } from "@/api/data/get";
import CommentCard from "../card/CommentCard";
import CommentForm from "../form/CommentForm";
import { Suspense, useState } from "react";
import useSWR from "swr";
import ReplaceMessageCard from "../card/ReplaceMessageCard";

interface PropsType {
    id: string
}
interface ItemType {
    id: number
    email: string
    nickname: string | null
    profile_iamge: string | null
    comment: string
    create_date:string
}
export default function CommentList({ id }: PropsType) {
    const [page, setPage] = useState(0)
    const {data:items, isLoading, error} = useSWR<ItemType[]>(`/api/quotes/${id}/comments?page=${page}`, getCommentsFormDb, {
    refreshInterval:5000
    })

    
    if(isLoading || !items ) return <ReplaceMessageCard childern='데이터를 불러오는 중입니다.'/>
    return (
        <section className="py-[1em] ">
            <h2 className="text-white text-[1.5em] mt-[2em]">댓글({items?.length || 0})</h2>
            <CommentForm />
            <Suspense fallback={<h3>로드 중..</h3>}>
                <ul className="mt-[5em]">
                    {items?.map((item) => {
                        return <CommentCard item={item} key={item.id} />
                    })}
                </ul>
            </Suspense>
            <button className="bg-[tomato] m-[5px] rounded-[5px] p-[5px] mt-[1em]">더보기</button>
        </section>
    )
}