import { ChangeEvent } from 'react'

import Input from '@/components/UI/common/Input'
import Label from '@/components/UI/common/Label'
import { HiOutlineLockOpen } from 'react-icons/hi2'
import ValidityMessage from '../message/ValidityMessage'

interface PropsType {
  isPassword: boolean
  setPassword: (p: string) => void
  setIsPassword: (p: boolean) => void
}
export default function SignInPasswordInput({
  isPassword,
  setPassword,
  setIsPassword,
}: PropsType) {


  function handlePassword(e: ChangeEvent<HTMLInputElement>) {

    const password = e.target.value
    setPassword(password)
    passwordChecker(password)

  }


  /** 패스워드 체크 */
  function passwordChecker(password: string) {
    // 8자 이상 (a-z, 0-9 무조건 1개 이상 포함, 특수문자 1개 이상 포함)
    const test =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/g.test(
        password,
      )
    if (test) return setIsPassword(true)
    return setIsPassword(false)
  }

  return (
    <article className="mx-[10px]  mb-[1em]">
      <div className="flex">
        <Label
          className=" bg-transparent text-[white] p-[0.8em] text-center inline-block min-w-[50px]  "
          htmlFor="user-password"
        >
          <span className="inline-block">
            <HiOutlineLockOpen />
          </span>
        </Label>

        <Input
          onChange={handlePassword}
          autoComplete="on"
          className="text-white pl-[8px]  min-w-[230px] w-[100%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] bg-transparent focus:bg-white focus:outline-none focus:text-black focus:font-bold hover:bg-[rgba(255,255,255,0.05)]"
          type="password"
          id="user-password"
          name="user-password"
          placeholder="패스워드"
        />
      </div>
      <ValidityMessage
        isPass={isPassword}
      >
        {isPassword ? '패스워드 형식과 일치합니다.' :
          <>
            <span className="font-sans text-[#837f7f]  text-[14.3px] inline-block ">
              특수문자 1개 이상, 문자 및 숫자 1개 이상 포함한 8자 이상
            </span>
            <span className=" font-sans text-[#f25555]  text-[14.3px] inline-block">
              패스워드 형식과 일치시키세요
            </span>
          </>}
      </ValidityMessage>
    </article>
  )
}
