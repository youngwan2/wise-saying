"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface UserType {
    profile: {
        image: string
        nickname:string
    }
    email:string
}
export default function HeaderProfileCard() {
    const [userInfo, setUserInfo] = useState<UserType>()
    const router = useRouter()
 

    useEffect(()=>{
        if(localStorage.getItem('user')) {
            const { profile, dbEmail: email } = JSON.parse(localStorage.getItem('user')!)
            setUserInfo({profile, email})
        }
    },[])

    if (userInfo?.profile)
        return (
            <article aria-label="사용자 프로필 카드" tabIndex={0} className="flex items-center m-[5px] rounded-[10px] hover:cursor-pointer" onClick={() => {
                router.push('/mypage')
            }}>
                <Image src={userInfo.profile.image} alt="헤더 프로필 이미지" width={32.5} height={32.5} className="rounded-full w-auto h-auto" />
                <div className="ml-[8px]">
                    <p className="font-semibold mb-[-3px]">{userInfo.profile.nickname}</p>
                    <span className="ml-[-3px]">({userInfo.email})</span>
                </div>
            </article>

        )
}