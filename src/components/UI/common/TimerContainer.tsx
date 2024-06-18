"use client"
import useHasToken from "@/custom/useHasToken";
import Timer from "./Timer";


export default function TimerContainer() {

    const isLogin = useHasToken()
    if(!isLogin) return null
    return (
        <>
            <Timer />
        </>
    )
}