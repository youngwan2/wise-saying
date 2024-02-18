import useFocus from '@/custom/useFocus'
import { useRef } from 'react'
import EmailLabel from '../common/EmailLabel'

export default function LoginEmailInput() {
  const emailInputRef = useRef<HTMLInputElement>(null)

  useFocus(emailInputRef)

  return (
    <article className="flex mt-[3.5em] mb-[1em] mx-[10px]">
      <EmailLabel />
      <input
        aria-label="이메일 입력창"
        ref={emailInputRef}
        placeholder='이메일'
        className="pl-[5px] rounded-e-lg min-w-[230px] w-[100%] bg-[#ffffffce]"
        type="email"
        id="user-email"
        name="email"
      />
    </article>
  )
}
