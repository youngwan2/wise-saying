'use client'
import {  HiOutlineLockClosed,HiOutlineLockOpen, HiOutlineMail, HiOutlineX } from "react-icons/hi"
import { useRouter } from "next/navigation"
import { gsap } from "gsap/all"
import { Draggable } from "gsap/Draggable"
import { useEffect,useRef } from "react"
export default function SignInForm() {

    const formRef = useRef<HTMLFormElement>(null)
    useEffect(()=>{

    if(formRef.current) {
        gsap.registerPlugin(Draggable)        
        const form = formRef.current

        Draggable.create(form,{
            dragClickables:false,
            bounds: document.querySelector('main')
        })
    }
    },[])

    const router = useRouter()
    return (
        <>
            <div className=" hover:cursor-pointer fixed left-0 right-0 bottom-0 top-0 bg-[#0000009c] rounded-[10px]"
            >
            </div>
            <form
                ref={formRef}
                className="shadow-2xl  rounded-[10px] flex flex-col fixed max-w-[400px] min-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] bg-[#E76F51]"
                onSubmit={(e) => {
                    e.preventDefault()
                    console.log(11)
                }} >
                <h2 className="rounded-t-[10px]  p-[10px] font-bold text-[1.25em] bg-[#413A3A] text-[white]">회원가입</h2>
                <button className="fixed top-[0.73em] right-[7px] text-[1.2em] text-[white]"
                    onClick={() => {
                        router.back()
                    }}
                ><HiOutlineX></HiOutlineX></button>

                {/* 이메일 */}
                <div className="mt-[3.5em] mb-[1em] mx-[10px]">
                    <div className="flex">
                        <label className="rounded-s-lg bg-[#3F3F3F] text-[white] text-center p-[0.8em] inline-block min-w-[50px]" htmlFor="user-email">
                        <span className=" inline-block"><HiOutlineMail /></span></label>
                        <input className="pl-[8px]  rounded-e-lg min-w-[230px] w-[100%] bg-[#ffffffce]" type="email" id="user-email" name="user-email" placeholder="이메일" />
                    </div>
                    <span>안내메시지</span>
                   
                </div>
                {/* 패스워드 */}
                <div className="mx-[10px]  mb-[1em]">
                    <div className="flex">
                        <label className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]" htmlFor="user-password">
                            <span className="inline-block"><HiOutlineLockOpen /></span></label>
                        <input className="pl-[8px]  rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]" type="password" id="user-password" name="user-password" placeholder="패스워드" />
                    </div>
                    <span>안내 메시지</span>

                </div>
                {/* 패스워드 재검증 */}
                <div className="mx-[10px]">
                    <div className="flex">
                    <label className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]" htmlFor="user-password">
                        <span className="inline-block"><HiOutlineLockClosed /></span></label>
                    <input className="pl-[8px] rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]" type="password" id="user-password" name="user-password" placeholder="패스워드 재확인" />
                    </div>
                    <span>안내메시지</span>
                </div>

                <input className="rounded-[5px] my-[2.5em] text-[black] bg-[#FFFFFF] max-w-[150px] py-[0.5em] min-w-[150px] mx-auto hover: cursor-pointer hover:bg-[#ffd9d9] font-bold" type="submit" value={"회원가입"} />
            </form>
        </>


    )
}