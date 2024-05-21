"use client"
import { MouseEvent } from "react"

import Overlay from "../../../common/Overlay"
import ControlButton from "../../../common/button/ControlButton"

import { HiXMark } from "react-icons/hi2"


interface PropsType {
    isShowEmailAuthForm: boolean
    isComplete: boolean
    onClickCloseInput: () => void
    reqEmailAuth: (value: string) => void
}
export default function EmailAuthInput({ isShowEmailAuthForm, isComplete, reqEmailAuth, onClickCloseInput }: PropsType) {

    function handleEmailAuth(e: MouseEvent<HTMLButtonElement>) {
        const inputEl = e.currentTarget.previousElementSibling
        if (inputEl instanceof HTMLInputElement) {
            const value = inputEl.value;
            reqEmailAuth(value)
        }
    }

    if (!isShowEmailAuthForm || isComplete) return <></>
    return (
        <>
            <div className="z-[10000000] absolute left-[50%] translate-x-[-50%] top-[30%] max-w-[280px] bg-white w-full flex flex-col p-[10px] h-[130px] rounded-[10px]" >
                <div className="flex">
                    <h2 className="w-full font-bold mt-[0.25em]">📩 이메일 본인인증</h2>
                    <ControlButton
                        type="button"
                        onClick={onClickCloseInput}
                        className="hover:border hover:border-[tomato] rounded-full px-[5px]"
                        ariaLabel="이메일 인증 닫기 버튼">
                        <HiXMark />
                    </ControlButton>
                </div>
                <div className="flex mt-[1em]">
                    <input className="p-[10px] w-full min-w-[200px] border " name="input" type="number" minLength={4} maxLength={4} required />
                    <ControlButton
                        ariaLabel="이메일 인증 버튼"
                        onClick={handleEmailAuth}>
                    </ControlButton>
                </div>
            </div>
            <Overlay isDisplay={!isComplete} />
        </>


    )
}