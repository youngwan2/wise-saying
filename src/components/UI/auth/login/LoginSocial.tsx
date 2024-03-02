"use client"
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect } from 'react'
import { setUserInfo } from '@/utils/session-storage'

export default function LoginGoogle() {

    const { data: session } = useSession()

    async function reqGoolgeRogin() {
        await signIn()
    }

    const reqLogin = useCallback(() => {
        fetch('/api/auth/general-auth/oauth2')
            .then(() => {
                const { email: dbEmail, image, name: nickname } = session?.user ?? { email: '', image: '', name: '익명의 시인' }
                const userInfo = { dbEmail, profile: { nickname, image } }
                setUserInfo(userInfo)
            })
    }, [session])

    useEffect(() => {
        session && reqLogin()
    }, [session, reqLogin])

    return (
        <article className='mt-[2em] mb-[1.25em] flex flex-col max-w-[430px] w-full mx-auto'>
            <h2 className='text-[1.25em] mb-[0.25em] text-white text-center'>간편 로그인</h2>
            <button onClick={reqGoolgeRogin} className=' text-[1em] font-semibold flex items-center mx-auto bg-white justify-center p-[12px] my-[8px] hover:bg-[#dadada] hover:font-bold rounded-[5px] max-w-[200px] w-full'>
                <FcGoogle className={'text-[1.5em] mr-[1em]'} /> 구글 로그인
            </button>
        </article>

    )
}