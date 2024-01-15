"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HeaderProfileCard(){

    const router = useRouter()
    const {profile, dbEmail:email} = localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user')!) : {profile:'',dbEmail:'' }

    useEffect
    if( profile)
    return (
        <article aria-label="사용자 프로필 카드" tabIndex={0} className="flex items-center m-[5px] rounded-[10px] hover:cursor-pointer" onClick={()=>{
            router.push('/mypage')
        }}>
            <Image src={profile.image} alt="헤더 프로필 이미지" width={32.5} height={32.5} className="rounded-full w-auto h-auto"/>
            <div className="ml-[8px]">
                <p className="font-semibold mb-[-3px]">{profile.nickname}</p>
                <span className="ml-[-3px]">({email})</span>
            </div>
        </article>

    )
}