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
    const [time, setTime] = useState(420); 
    const [isTimeOver, setIsTimeOver] = useState(false)

    function handleEmailAuth(e: MouseEvent<HTMLButtonElement>) {
        const inputEl = e.currentTarget.previousElementSibling
        if (inputEl instanceof HTMLInputElement) {
            const value = inputEl.value;
            reqEmailAuth(value)
        }
    }

    useEffect(() => {
        if (!existsEmail) return // 유효한 이메일 도메인이 아니라면 타이머 실행하지 않음
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
            <section className="z-[10000000] absolute left-[50%] translate-x-[-50%] top-[30%] max-w-[350px] bg-white w-full  h-[200px] flex flex-col p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">📩 이메일 본인인증</h2>
                    <ControlButton
                        type="button"
                        onClick={() => { onClickCloseInput(); setIsTimeOver(false); setTime(180) }}
                        className="hover:bg-red-50 hover:text-red-500 rounded-full p-1"
                        ariaLabel="이메일 인증 닫기 버튼">
                        <HiXMark size={20} />
                    </ControlButton>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <Input
                        disabled={isTimeOver}
                        placeholder="인증번호 입력"
                        className={`${isTimeOver ? 'cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-white'} 
                                    p-2 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:outline-none`}
                        name="input" type="number"
                        minLength={4}
                        maxLength={4}
                        required />
                    {!isTimeOver &&
                        <ControlButton
                            className="w-[60px] h-[40px] text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            ariaLabel="이메일 인증 버튼"
                            onClick={handleEmailAuth}>
                            확인
                        </ControlButton>}
                </div>
                {isTimeOver ? (
                    <p className="text-sm text-red-500">⏳ 제한 시간이 지났습니다. 모달을 닫고 재시도해주세요.</p>
                ) : (
                    <p className="text-sm text-slate-600">남은 시간: <span className="font-bold">{formatTime(time)}</span></p>
                )}
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
