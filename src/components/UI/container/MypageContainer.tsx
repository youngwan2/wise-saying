"use client"

import { useMypageTapsStore } from "@/store/store"
import MypageConcernQuoteList from "../list/MypageConcernQuoteList"
import MypageProfileForm from "../form/MypageProfileForm"
import useHasToken from "@/custom/useHasToken";
import useSWR from "swr";
import MypageMyQuoteList from "../list/MypageMyQuoteList";
import { useState } from "react";

export default function MypageContainer() {

    const tapId = useMypageTapsStore((state) => state.tapId)
    const hasToken = useHasToken()
    const [page, setPage] = useState(0)

    const token = (hasToken && localStorage.getItem('token')) || ''

    const getUserInfoFromDb = async (url:string, token: string) => {
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

    const getUserQuotesFromDb = async (url:string) => {
        const response = await fetch(url, {
            method:'GET',
            headers:{
                'dataType':'mypage'
            }
        })

        const {items:userInfo, count} = await response.json()
        return {userInfo,count}
    }

    const {data:userInfo,error,isLoading} = useSWR(['/api/users/',token],([url, token])=> getUserInfoFromDb(url,token), {
        refreshInterval:5000
    })

    const {data:userQuotesInfo} = useSWR(()=> tapId ===2 ? '/api/users/mypage/posts/?userId='+userInfo.user_id+'&page='+page: null, getUserQuotesFromDb)
    if(error) return <div>에러발생...</div>

    return (
        <>
            {tapId === 0 && <MypageProfileForm userInfo={userInfo} />}
            {tapId === 1 && <MypageConcernQuoteList />}
            {tapId === 2 && <MypageMyQuoteList userQuotes={userQuotesInfo?.userInfo} setPage={setPage} page={page} count={userQuotesInfo?.count} />}
        </>
    )
}