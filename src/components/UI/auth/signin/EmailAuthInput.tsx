"use client"

import { HiXMark } from "react-icons/hi2"
import Overlay from "../../common/Overlay"

interface PropsType {
    isShowEmailAuthForm: boolean
    isComplete:boolean
    onClickCloseInput: () => void
    reqEmailAuth: (value:string) => void
}
export default function EmailAuthInput({ isShowEmailAuthForm, isComplete, reqEmailAuth, onClickCloseInput }: PropsType) {

    if (!isShowEmailAuthForm || isComplete) return <></>
    return (
        <>
        <article className="z-[10000000] absolute left-[50%] translate-x-[-50%] top-[30%] max-w-[280px] bg-white w-full flex flex-col p-[10px] h-[130px] rounded-[10px]" >
            <div className="flex">
                <h2 className="w-full font-bold mt-[0.25em]">📩 이메일 본인인증</h2>
                <button type="button" onClick={onClickCloseInput} className="hover:border hover:border-[tomato] rounded-full px-[5px]"><HiXMark /> </button>
            </div>
            <div className="flex mt-[1em]">
                <input className="p-[10px] w-full min-w-[200px] border " name="input" type="number" minLength={4} maxLength={4} required />
                <button onClick={(e) => {
                    const inputEl = e.currentTarget.previousElementSibling
                    if (inputEl instanceof HTMLInputElement) {
                        const value = inputEl.value;
                         reqEmailAuth(value)
                    }

                }} className="min-w-[60px] hover:bg-[#dcdada] border-l">인증</button>
            </div>
        </article>
        <Overlay isDisplay={!isComplete}/>
        </>

         
    )
}