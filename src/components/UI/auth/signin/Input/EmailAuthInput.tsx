"use client"
import { MouseEvent, useEffect, useState } from "react"

import Overlay from "../../../common/Overlay"
import ControlButton from "../../../common/button/ControlButton"
import Input from "@/components/UI/common/Input"

import { HiXMark } from "react-icons/hi2"


interface PropsType {
    existsEmail: boolean
    isComplete: boolean
    onClickCloseInput: () => void
    reqEmailAuth: (value: string) => void
}
export default function EmailAuthInput({ existsEmail, isComplete, reqEmailAuth, onClickCloseInput }: PropsType) {
    const [time, setTime] = useState(180); // 3분 = 180초
    const [isTimeOver, setIsTimeOver] = useState(false)

    function handleEmailAuth(e: MouseEvent<HTMLButtonElement>) {
        const inputEl = e.currentTarget.previousElementSibling
        if (inputEl instanceof HTMLInputElement) {
            const value = inputEl.value;
            reqEmailAuth(value)
        }
    }

    useEffect(() => {
        if (!existsEmail) return // memo: 유효한 이메일 도메인이 아니라면 타이머 실행하지 않게(즉, 모달창이 뜨는 순간에만 타이머 실행)
        if (time > 0) {
            const timerId = setTimeout(() => {
                setTime(time - 1);
            }, 1000);

            return () => clearTimeout(timerId); // 클린업
        } else {
            setIsTimeOver(true)
        }
    }, [time, existsEmail]);


    if (!existsEmail || isComplete) return <></>
    return (
        <>
            <section className="z-[10000000] absolute left-[50%] translate-x-[-50%] top-[30%] max-w-[330px] bg-white w-full  h-[160px] flex flex-col p-[10px] rounded-[10px]" >
                <div className="flex">
                    <h2 className="w-full font-bold mt-[0.25em]">📩 이메일 본인인증</h2>
                    <ControlButton
                        type="button"
                        onClick={() => { onClickCloseInput(); setIsTimeOver(false); setTime(180) }}
                        className="hover:border hover:border-[tomato] rounded-full px-[5px]"
                        ariaLabel="이메일 인증 닫기 버튼">
                        <HiXMark />
                    </ControlButton>
                </div>
                <div className="flex mt-[1em]">
                    <Input
                        disabled={isTimeOver}
                        placeholder="이메일에 발송된 인증번호"
                        className={`${isTimeOver ? 'cursor-not-allowed bg-slate-200' : ''} p-[10px] w-full min-w-[200px] border focus:bg-slate-100 focus:outline-none `}
                        name="input" type="number"
                        minLength={4}
                        maxLength={4}
                        required />
                    {!isTimeOver
                        && <ControlButton
                            className="w-[50px] hover:bg-slate-200 border"
                            ariaLabel="이메일 인증 버튼"
                            onClick={handleEmailAuth}>
                            확인
                        </ControlButton>}
                </div>
                {isTimeOver ? <p className="text-[0.95em] ml-[0.25em] mt-[0.25em]">제한 시간이 지났습니다. 해당 모달을 닫은 후 재시도 해주세요.</p> : <p>{formatTime(time)}</p>}
            </section>
            <Overlay isDisplay={!isComplete} />
        </>
    )
}


/**
 * 초(s)를 받아와서 0:00 형태로 변환
 * @param seconds 초 단위
 * @returns 시간을 0:00 형태로 반환
 */
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
};