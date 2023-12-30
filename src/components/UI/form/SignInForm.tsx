'use client'
import { HiOutlineLockClosed, HiOutlineLockOpen, HiOutlineMail, HiOutlineX } from "react-icons/hi"
import { useRouter } from "next/navigation"
import { gsap } from "gsap/all"
import { Draggable } from "gsap/Draggable"
import { useEffect, useRef, useState } from "react"
export default function SignInForm() {
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isReconfirmPassword, setIsReconfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reConfirmPw, setReConfirmPw] = useState('')
    const [isSuccess, setisSuccessState] = useState(false)
  
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const isVaildForm = isEmail && isPassword && isReconfirmPassword

    useEffect(() => {

        if (formRef.current) {
            gsap.registerPlugin(Draggable)
            const form = formRef.current

            Draggable.create(form, {
                dragClickables: false,
                bounds: document.querySelector('body')
            })
        }
    }, [])

    useEffect(()=>{
        if(isSuccess) return router.push('/')
    },[isSuccess,router])

    function emailChecker(email: string) {
        const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,}/g
        const test = regex.test(email)
        if (test) return setIsEmail(true)
        return setIsEmail(false)
    }

    function passwordChecker(password: string) {
        // 8자 이상 (a-z, 0-9 무조건 1개 이상 포함, 특수문자 1개 이상 포함)
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/g
        const test = regex.test(password)
        if (test) return setIsPassword(true)
        return setIsPassword(false)
    }

    function passwordReConfirmChecker(ps: string) {
        // 8자 이상 (a-z, 0-9 무조건 1개 이상 포함, 특수문자 1개 이상 포함)
        const test = ps.includes(password)
        if (test) return setIsReconfirmPassword(true)
        return setIsReconfirmPassword(false)
    }

    function userInfoPostFetch(email: string, password: string) {
        const body = {
            email,
            password,
            reConfirmPw
        }
        fetch('http://localhost:3000/api/signin', {
            method: 'POST',
            body: JSON.stringify(body),
        }).catch((error) => {
            console.error(error)
        }).then(async (response) => {
            const {success : isSuccess} = await response.json()
            setisSuccessState(isSuccess)
        })
    }

    return (
        <>
            <div className=" hover:cursor-pointer fixed left-0 right-0 bottom-0 top-0 bg-[#0000009c] rounded-[10px]"
            >
            </div>
            <form
                ref={formRef}
                className="shadow-2xl  rounded-[10px] flex flex-col fixed max-w-[430px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] bg-[#E76F51]"
                onSubmit={(e) => {
                    e.preventDefault()
                }} >
                <h2 className="rounded-t-[10px]  p-[10px] font-bold text-[1.25em] bg-[#413A3A] text-[white]">회원가입</h2>
                <button className="fixed top-[0.73em] right-[7px] text-[1.2em] text-[white]"
                    onClick={() => {
                        router.back()
                    }}
                ><HiOutlineX></HiOutlineX></button>

                {/* 이메일 */}
                <article className="mt-[3.5em] mb-[1em] mx-[10px]">
                    <div className="flex">
                        <label className="rounded-s-lg bg-[#3F3F3F] text-[white] text-center p-[0.8em] inline-block min-w-[50px]" htmlFor="user-email">
                            <span className=" inline-block"><HiOutlineMail /></span></label>
                        <input onInput={(e) => {
                            const email = e.currentTarget.value
                            emailChecker(email)
                            setEmail(email)
                        }} className="pl-[8px]  rounded-e-lg min-w-[230px] w-[100%] bg-[#ffffffce]" type="email" id="user-email" name="user-email" placeholder="이메일" />
                    </div>
                    {isEmail ? <span className="block px-[5px] text-[#292997] ml-[0.5em]">- 이메일 형식과 일치합니다.</span> :
                        <>
                            <span className="text-[#444141] block ml-[0.5em] ">- ex. email@naver.com</span>
                            <span className="text-[red] block  ml-[0.5em]">- 이메일 형식과 일치시키세요</span>
                        </>
                    }
                </article>
                {/* 패스워드 */}
                <article className="mx-[10px]  mb-[1em]">
                    <div className="flex">
                        <label className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]" htmlFor="user-password">
                            <span className="inline-block"><HiOutlineLockOpen /></span></label>
                        <input onInput={(e) => {
                            const password = e.currentTarget.value
                            setPassword(password)
                            passwordChecker(password)
                        }} className="pl-[8px]  rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]" type="password" id="user-password" name="user-password" placeholder="패스워드" />
                    </div>
                    {isPassword ? <span className="block px-[5px] text-[#292997] ml-[0.5em]">- 패스워드 형식과 일치합니다.</span> :
                        <>
                            <span className="text-[#444141] block ml-[0.5em] ">- 특수문자 1개 이상, 문자 및 숫자 1개 이상 포함한 8자 이상</span>
                            <span className="text-[red] block  ml-[0.5em]">- 패스워드 형식과 일치시키세요</span>
                        </>
                    }

                </article>
                {/* 패스워드 재검증 */}
                <article className="mx-[10px]">
                    <div className="flex">
                        <label className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]" htmlFor="user-repassword">
                            <span className="inline-block"><HiOutlineLockClosed /></span></label>
                        <input onInput={(e) => {
                            const password = e.currentTarget.value
                            passwordReConfirmChecker(password)
                            setReConfirmPw(password)
                        }} className="pl-[8px] rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]" type="password" id="user-repassword" name="user-repassword" placeholder="패스워드 재확인" />
                    </div>
                    {isReconfirmPassword ? <span className="block px-[5px] text-[#292997] ml-[0.5em]">- 패스워드 형식과 일치합니다.</span> :
                        <>
                            <span className="text-[red] block  ml-[0.5em]">- 앞서 작성한 패스워드와 일치시키세요</span>
                        </>
                    }
                </article>
                {/* 전송버튼 */}
                <button
                    disabled={!isVaildForm}
                    onClick={() => {
                        userInfoPostFetch(email, password)
                    }} 
                    className={`rounded-[5px] my-[2.5em] text-[black] bg-[#FFFFFF] max-w-[150px] py-[0.5em] min-w-[150px] mx-auto hover: cursor-pointer hover:bg-[#ffd9d9] font-bold`}
                    type="submit">
                    {isVaildForm? "가입 가능":"가입 불가능"}</button>
            </form>
        </>


    )
}