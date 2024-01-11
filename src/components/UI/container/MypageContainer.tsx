"use client"

import { useMypageTapsStore } from "@/store/store"
import MypageConcernQuoteList from "../list/MypageConcernQuoteList"
import MypageProfileForm from "../form/MypageProfileForm"
import useHasToken from "@/custom/useHasToken";
import useSWR from "swr";

export default function MypageContainer() {

    const tapId = useMypageTapsStore((state) => state.tapId)
    const hasToken = useHasToken()

    const token = (hasToken && localStorage.getItem('token')) || ''

    const getUserInfoFromDb = async (url:string, token: string) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            const result = await response.json()
            const { items: userInfo } = result
            return userInfo
        } catch (error) {
            console.error(error)
        }
    }


    const {data:userInfo} = useSWR(['/api/users/',token],([url, token])=> getUserInfoFromDb(url,token), {
        refreshInterval:5000
    })

    return (
        <>
            {tapId === 0 && <MypageProfileForm userInfo={userInfo} />}
            {tapId === 1 && <MypageConcernQuoteList />}
        </>
    )
}