"use client"

import useDraggable from "@/custom/useDraggable"
import { defaultFetch } from "@/utils/fetcher"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import {  useRef } from "react"
import { toast } from "react-toastify"

export default function ResetForm(){
    const router = useRouter()
    const path = useSearchParams()
    const tempToken = path.get('temp-token')
    const formRef = useRef<HTMLFormElement>(null)
  
    // Action | 비밀번호 재설정 요청
    async function postResetPassAction(formData: FormData) {
      const pass = formData.get('password')?.valueOf().toString() || ''
      const confirm = formData.get('confirm-password')?.valueOf().toString() || ''
  
      const result = validator(pass, confirm)
      if (!result) return
  
      const url = '/api/auth/general-auth/forgot/reset-pass'
      const config = {
        method: 'POST',
        headers: {
          authorization: 'Bearer ' + tempToken?.trim(),
        },
        body: JSON.stringify({ pass, confirm }),
      }
  
      const { success, meg } = await defaultFetch(url, config)
      if (success) {
        toast.success(meg)
        router.push('/login')
      }
  
      if (!success) {
        toast.error(meg)
      }
    }
    
    useDraggable(formRef, 'free')

    return (
        <form
        ref={formRef}
        className="backdrop-blur-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] bg-transparent max-w-[600px] w-full h-[370px] p-[10px] rounded-[5px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        action={postResetPassAction}
      >
        <h2 className=" text-[1.5em] text-center my-[0.6em] mb-[0.8em] font-bold text-white">
          비밀번호 재설정
        </h2>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white p-[5px]">
            새 비밀번호
          </label>
          <input

            className="placeholder:text-[0.85em] text-[1.05em] bg-[rgba(255,255,255,0.1)]  rounded-[5px] p-[8px] px-[10px] focus:outline-none "
            type="password"
            id="password"
            name="password"
            placeholder="특수문자 1개 이상, 문자 및 숫자 1개 이상 포함한 8자 이상"
          />
        </div>
        <br />
        <div className="flex flex-col">
          <label htmlFor="confirm-password" className="text-white  p-[5px]">
            새 비밀번호 확인
          </label>
          <input
            className="placeholder:text-[0.85em] text-[1.05em] bg-[rgba(255,255,255,0.1)]  rounded-[5px] p-[8px] px-[10px] focus:outline-none "
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="비밀번호 재확인"
          />
        </div>
        <button className=" text-[#162557] hover:bg-[#dfe0e2] bg-white w-[100%] relative left-[50%] translate-x-[-50%] mt-[2em] rounded-[3px] p-[8px] font-bold">
          변경
        </button>
      </form>
    )


      //토큰 유효성 검증
  function valiToken(token: string) {
    const regex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]+$/
    const isValid = regex.test(token)
    return isValid
  }

  // 비밀번호 일치 여부 검증
  function matchPass(pass: string, confirmPass: string) {
    const isMatch = pass === confirmPass ? true : false
    return isMatch
  }
  // 비밀번호 유효성 검증
  function validPass(pass: string) {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/i
    const isValid = regex.test(pass)
    return isValid
  }

  // 비밀번호 검증 함수 래퍼
  function validator(pass: string, confirm: string) {
    if (!tempToken) {
      toast.error('접근 권한이 없습니다.')
      return false
    }

    const isValid = validPass(pass)
    if (!isValid) {
      toast.error('비밀번호 양식에 맞춰 입력해주세요.')
      return false
    }

    const isMatch = matchPass(pass, confirm) ? true : false
    if (!isMatch) {
      toast.error('비밀번호가 서로 일치하지 않습니다.')
      return false
    }

    const isToken = valiToken(tempToken)
    if (!isToken) {
      toast.error('접근 권한이 존재하지 않습니다.')
      return false
    }
    return true
  }
}