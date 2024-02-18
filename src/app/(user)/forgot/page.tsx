"use client"

import ForgotEmail from "@/components/UI/auth/forgot/ForgotEmail"
import ForgotPassword from "@/components/UI/auth/forgot/ForgotPassword"
import ForgotTaps from "@/components/UI/auth/forgot/ForgotTaps"
import { useState } from "react"

export default function ForgotPage() {

    const [tapNum, setTapNum] = useState(0)

    function onClickSetTap(tapIndex:number) {
        setTapNum(tapIndex)
    }

    return (
        <section className="absolute left-[50%] translate-x-[-50%] top-[30%] max-w-[440px] w-full text-center bg-[#0d0d0d2c] p-[10px] py-[3em] pb-[4em] rounded-[10px]">
            <ForgotTaps tapNum={tapNum} onClickSetTap={onClickSetTap} />
            {tapNum === 0 ? <ForgotEmail /> : <ForgotPassword />}
        </section>
    )
}