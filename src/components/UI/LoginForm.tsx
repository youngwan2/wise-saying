"use client"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineX } from "react-icons/hi"
import {useLoginStateStore} from "@/store/store"
import { useEffect, useState } from "react"
import useHasToken from "@/custom/useHasToken"
export default function LoginForm() {

    const router = useRouter()
    const { data: session } = useSession()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const setLoginState = useLoginStateStore((state) => state.setLoginState)
    const validToken = useHasToken()

    const reqLogin = async () => {
        const user = {
            email,
            password
        }
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify(user)
        }).then(async (response) => {
            if (response.status === 200) {
                const { success, accessToken, user } = await response.json()

                if (success) {
                    localStorage.setItem('user', user)
                    localStorage.setItem('token', accessToken)
                }
            }
            location.reload()
        }).catch((error) => {
            console.error(error)
        })
    }


    useEffect(() => {
        if (!session) setLoginState(false)
        else setLoginState(true)
    }, [session, setLoginState])

    useEffect(() => {
        const clear = setTimeout(() => {
            if (session || validToken) {
                router.push('/')
            }
        }, 500)
        return (() => {
            clearTimeout(clear)
        })

    }, [session, router, validToken])

    if (!session) {
        return (
            <>
                <div className=" hover:cursor-pointer fixed left-0 right-0 bottom-0 top-0 bg-[#0000009c] rounded-[10px]"
                    onClick={() => {
                        router.push('/')
                    }}
                >
                </div>
                <form
                    className="shadow-2xl  rounded-[10px] flex flex-col fixed max-w-[400px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] bg-[#E76F51]"
                    onSubmit={(e) => {
                        e.preventDefault()
                    }} >
                    <h2 className="rounded-t-[10px]  p-[10px] font-bold text-[1.25em] bg-[#413A3A] text-[white]">로그인</h2>
                    <button className="fixed top-[0.73em] right-[7px] text-[1.2em] text-[white]"
                        onClick={() => {
                            router.back()
                        }}
                    ><HiOutlineX></HiOutlineX></button>

                    {/* 이메일 */}
                    <div className="flex mt-[3.5em] mb-[1em] mx-[10px]">
                        <label className="rounded-s-lg bg-[#3F3F3F] text-[white] text-center p-[0.8em] inline-block min-w-[50px]" htmlFor="user-email">
                            <span className=" inline-block"><HiOutlineMail /></span></label>
                        <input onInput={(e) => {
                            const email = e.currentTarget.value
                            setEmail(email)
                        }} className="pl-[5px] rounded-e-lg min-w-[230px] w-[100%] bg-[#ffffffce]" type="email" id="user-email" name="user-email" />
                    </div>
                    {/* 패스워드 */}
                    <div className="flex  mx-[10px]">
                        <label className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]" htmlFor="user-password">
                            <span className="inline-block"><HiOutlineLockClosed /></span></label>
                        <input onInput={(e) => {
                            const password = e.currentTarget.value
                            setPassword(password)
                        }} className="pl-[5px] rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]" type="password" id="user-password" name="user-password" />
                    </div>
                    {/* 로그인 요청 */}
                    <input
                        onClick={reqLogin}
                        className="rounded-[5px] my-[2.5em] text-[black] bg-[#FFFFFF] max-w-[150px] py-[0.5em] min-w-[150px] mx-auto hover: cursor-pointer hover:bg-[#ffd9d9] font-bold" type="submit" value={"로그인"} />

                    {/* 소셜 로그인 */}
                    <button onClick={() => {
                        signIn()

                    }}>GitHub</button>
                    {/* 회원가입 안내  */}
                    <div aria-label="회원가입 안내 메시지 및 페이지 이동 링크" className="p-[5px] text-center">
                        <span>혹시.. 첫 방문 이신가요?</span><Link className="m-[10px] underline hover:bg-[orange] text-[white]" href={'/signin'}>회원가입</Link>
                    </div>
                </form>
            </>
        )
    }


}