"use client"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function useFormStateToaster(state: { message: string, success?: boolean }) {


    // 폼 상태 처리
    useEffect(() => {
        if (!state) return
        if (state.message === '') return

        if (state.message && state.message.length > 1) {
            if (state.success === true) {
                toast.success(state.message);
            } else {
                toast.error(state.message);
            }
        }
    }, [state.message, state.success]);
}