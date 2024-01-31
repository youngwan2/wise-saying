"use client"

import { getCommentsFormDb } from "@/services/data/get";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { Suspense, useState } from "react";
import useSWR from "swr";
import ReplaceMessageCard from "../common/ReplaceMessageCard";
import CommentLoadMoreButtons from "./CommentSwitchButtons";
import CommentSortSelect from "./CommentSortSelect";

interface PropsType {
    id: string
}
interface CommentsInfoType {
    items: {
        id: number
        email: string
        nickname: string | null
        profile_iamge: string | null
        comment: string
        create_date: string
    }[],
    totalCount: number
}

const MIN_PAGE = 0
export default function CommentList({ id }: PropsType) {
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState('DESC')
    const { data: commentsInfo, isLoading, error } = useSWR<CommentsInfoType>(`/api/quotes/${id}/comments?page=${page}&sort=${sort}`, getCommentsFormDb, {
        refreshInterval: 5000
    })

    const items = commentsInfo && commentsInfo.items || []
    const totalCount = commentsInfo && commentsInfo.totalCount || 1
    const MAX_PAGE = Math.ceil(totalCount / 5)

    if (isLoading || !commentsInfo) return <ReplaceMessageCard childern='데이터를 불러오는 중입니다.' />
    return (
        <section className="py-[1em] ">
            <h2 className="text-white text-[1.5em] mt-[2em]">댓글({items.length})</h2>
            <CommentForm />
            <CommentSortSelect setSort={setSort} />
            <Suspense fallback={<h3>로드 중..</h3>}>

                {items.length > 0
                    ? <ul className="mt-[2em] min-h-[550px]">
                        {items?.map((item) => {
                            return <CommentCard item={item} key={item.id} />
                        })}
                    </ul>
                    : <p className="text-white text-[1.25em] text-center mx-auto mt-[2em]">해당 명언/속담/글귀에 대한 의견을 공유해주세요!</p>}

            </Suspense>

            <CommentLoadMoreButtons
                page={page}
                maxPage={MAX_PAGE}
                minPage={MIN_PAGE}
                onClickPrev={() => {
                    setPage(Math.max(page - 1, MIN_PAGE))
                }}
                onClickNext={() => {
                    setPage(Math.min(page + 1, MAX_PAGE))
                }}
            />
        </section>
    )
}