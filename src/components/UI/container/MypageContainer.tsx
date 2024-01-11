"use client"

import { useMypageTapsStore } from "@/store/store"
import MypageComcernQuoteList from "../list/MypageComcernQuoteList"
import MypageProfileForm from "../form/MypageProfileForm"
import useHasToken from "@/custom/useHasToken";
import { useCallback, useEffect, useState } from "react";


interface UserInfoType {
        nickname: string
        email: string
        profile_image: string
        user_id: number
}
export default function MypageContainer() {

    const tapId = useMypageTapsStore((state) => state.tapId)
    const [userInfo, setUserInfo] = useState<UserInfoType>({
        nickname: '',
        email: '',
        profile_image: '',
        user_id: 0
    })
    const hasToken = useHasToken()

    const token = (hasToken && localStorage.getItem('token')) || ''
    const getUserInfoFromDb = useCallback(async (token: string) => {
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            const result = await response.json()
            const { items: userInfo } = result

            setUserInfo(userInfo)
        } catch (error) {
            console.error(error)
        }
    }, [setUserInfo])

    useEffect(() => {
        getUserInfoFromDb(token)
    }, [token, getUserInfoFromDb])


    return (
        <>
            {tapId === 0 && <MypageProfileForm userInfo={userInfo} />}
            {tapId === 1 && <MypageComcernQuoteList />}
        </>
    )
}