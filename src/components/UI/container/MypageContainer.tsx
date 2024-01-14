"use client"

import { useMypageTapsStore } from "@/store/store"
import MypageConcernQuoteList from "../list/MypageConcernQuoteList"
import MypageProfileForm from "../form/MypageProfileForm"
import useHasToken from "@/custom/useHasToken";
import useSWR from "swr";
import MypageMyQuoteList from "../list/MypageMyQuoteList";

export default function MypageContainer() {

    const tapId = useMypageTapsStore((state) => state.tapId)
    const hasToken = useHasToken()

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
        console.log(url)
        const response = await fetch(url, {
            method:'GET',
            headers:{
                'dataType':'mypage'
            }
        })

        const userInfo = await response.json()

        return userInfo
    }


    const {data:userInfo,error,isLoading} = useSWR(['/api/users/',token],([url, token])=> getUserInfoFromDb(url,token), {
        refreshInterval:5000
    })

    const {data:userQuotes} = useSWR(()=> tapId ===2 ? '/api/items/users/'+userInfo.user_id: null, getUserQuotesFromDb)
    if(error) return <div>에러발생...</div>

    return (
        <>
            {tapId === 0 && <MypageProfileForm userInfo={userInfo} />}
            {tapId === 1 && <MypageConcernQuoteList />}
            {tapId === 2 && <MypageMyQuoteList userQuotes={userQuotes} />}
        </>
    )
}