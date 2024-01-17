"use client"

import { useMypageTapsStore } from "@/store/store"
import MypageConcernQuoteList from "../list/MypageConcernQuoteList"
import MypageProfileForm from "../form/MypageProfileForm"
import useHasToken from "@/custom/useHasToken";
import useSWR from "swr";
import MypageMyQuoteList from "../list/MypageMyQuoteList";
import { useState } from "react";
import ReplaceMessageCard from "../card/ReplaceMessageCard";

export default function MypageContainer() {

    const tapId = useMypageTapsStore((state) => state.tapId)
    const hasToken = useHasToken()
    const [page, setPage] = useState(0)

    const token = (hasToken && localStorage.getItem('token')) || ''

    // 유저 정보 GET
    const getUserInfoFromDb = async (url: string, token: string) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        const result = await response.json()
        const { items: userInfo } = result
        
        return userInfo
    }

    // 유저 명언 목록 GET
    const getUserQuotesFromDb = async (url: string) => {
        const response = await fetch(url, {
            method: 'GET',
        })
        const { items: userInfo, count } = await response.json()

        return { userInfo, count }
    }

    const { data: userInfo, error, isLoading } = useSWR(['/api/users/', token], ([url, token]) => getUserInfoFromDb(url, token), { refreshInterval: 5000 })
    const { data: userQuotesInfo } = useSWR(() => tapId === 2 ? '/api/users/mypage/posts/?userId=' + userInfo.user_id + '&page=' + page : null, getUserQuotesFromDb)

    if (isLoading && !userInfo) return <ReplaceMessageCard childern={"게시글을 불러오는 중입니다. 잠시만 기다려주세요."} />
    if (error) return <ReplaceMessageCard childern={"게시글 조회에 실패하였습니다. 나중에 다시 시도 해주세요."} />

    return (
        <>
            {tapId === 0 && <MypageProfileForm userInfo={userInfo} />}
            {tapId === 1 && <MypageConcernQuoteList />}
            {tapId === 2 && <MypageMyQuoteList userQuotes={userQuotesInfo?.userInfo} setPage={setPage} page={page} count={userQuotesInfo?.count} />}
        </>
    )
}