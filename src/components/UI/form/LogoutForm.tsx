"use client"
import useHasToken from "@/custom/useHasToken"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function Logout() {

    const {data: session} = useSession()
    const router =useRouter()
    const validToken = useHasToken()
    useEffect(()=>{
        const clear = setTimeout(()=>{
            if(!session && !validToken) {
                router.push('/')
            }
        },1000)
        return (()=>{
            clearTimeout(clear)
        })
     
    },[session, router,validToken])

 if(session || validToken) {
  return (
    <>
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-[#00000052] rounded-[10px]"></div>
    <section className="bg-[#ffffff] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center rounded-[10px]">
        <p className="p-[20px] rounded-[5px]"><strong>{session?.user?.name}</strong> 님! <br />좋은 시간 되셨나요?!  로그아웃 하시려면 아래 버튼을 클릭해주세요.</p>
        <button
            className="bg-[#ff5100] text-[white] m-[5px] p-[10px] rounded-[5px] my-[1em]"
            onClick={()=>{
                router.push('/')
            }}
        >홈으로</button>
        <button
            className="bg-[#ff5100] text-[white] p-[10px] rounded-[5px] my-[1em]"
            onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                signOut()
            }}>로그아웃</button>

    </section>
</>
  )
} 

}
