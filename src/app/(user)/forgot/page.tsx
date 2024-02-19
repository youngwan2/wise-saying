"use client"

import ForgotEmail from "@/components/UI/auth/forgot/ForgotEmail"
import ForgotPassword from "@/components/UI/auth/forgot/ForgotPassword"
import ForgotTaps from "@/components/UI/auth/forgot/ForgotTaps"
import BackMoveButton from "@/components/UI/common/BackMoveButton"
import { Method, defaultConfig } from "@/configs/config.api"
import { defaultFetch } from "@/utils/fetcher"
import { useId, useState } from "react"
import toast from "react-hot-toast"

export default function ForgotPage() {
    const uId = useId()

    const [tapNum, setTapNum] = useState(0)

    function onClickSetTap(tapIndex: number) {
        setTapNum(tapIndex)
    }

   async function findEmailAction(formData: FormData) {
        const email = formData.get(uId + 'email')?.valueOf().toString() || ''
        const config = defaultConfig(Method.POST, email)
        const url = '/api/auth/forgot/email'
        const { success,meg } = await defaultFetch(url, config)
        if(success) toast.success(meg)
        else toast.error(meg)
    }

    async function findPasswordAction(formData: FormData) {
        const email = formData.get(uId + 'email')?.valueOf().toString() || ''
        const config = defaultConfig(Method.POST, email)
        const url = '/api/auth/forgot/password'
        const { success,meg } = await defaultFetch(url, config)
        if(success) toast.success(meg)
        else toast.error(meg)
    }

    return (
        <>
            <section className="absolute left-[50%] translate-x-[-50%] top-[30%] max-w-[440px] w-full text-center bg-[#0d0d0d2c] p-[10px] py-[3em] pb-[4em] rounded-[10px]">
                <ForgotTaps tapNum={tapNum} onClickSetTap={onClickSetTap} />
                {tapNum === 0
                    ? <ForgotEmail uId={uId} action={findEmailAction} />
                    : <ForgotPassword uId={uId} action={findPasswordAction} />}
            </section>
            <BackMoveButton />
        </>
    )
}