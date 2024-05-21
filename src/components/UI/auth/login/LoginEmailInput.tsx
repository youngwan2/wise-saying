"use client"

import useFocus from '@/custom/useFocus'
import { useRef } from 'react'

import Label from '../../common/Label'
import Input from '../../common/Input'

import { HiOutlineMail } from 'react-icons/hi'

export default function LoginEmailInput() {
  const emailInputRef = useRef<HTMLInputElement>(null)

  useFocus(emailInputRef)

  return (
    <div className=" flex mb-[1em] mx-[10px]">
      <Label
        className="rounded-s-lg text-[1.1em] text-[white] text-center p-[0.8em] inline-block min-w-[50px]"
        htmlFor="user-email"
      >
        <span className=" inline-block">
          <HiOutlineMail />
        </span>
      </Label>
      <Input
        ref={emailInputRef}
        autoComplete="on"
        aria-label="이메일 입력창"
        placeholder="이메일"
        type="email"
        name="email"
        id="user-email"
        className="pl-[10px]  min-w-[230px] w-[100%] bg-transparent border border-[rgba(255,255,255,0.1)] text-white focus:bg-white focus:outline-none focus:text-black focus:font-bold hover:bg-[rgba(255,255,255,0.1)]"
      />
    </div>
  )
}
