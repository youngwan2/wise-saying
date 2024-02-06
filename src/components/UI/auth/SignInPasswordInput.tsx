import { PASSWORD_REGEXP } from '@/const'
import { HiOutlineLockOpen } from 'react-icons/hi2'

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
  
  /** 패스워드 체크 */
  function passwordChecker(password: string) {
    // 8자 이상 (a-z, 0-9 무조건 1개 이상 포함, 특수문자 1개 이상 포함)
    const test = PASSWORD_REGEXP.test(password)
    if (test) return setIsPassword(true)
    return setIsPassword(false)
  }

  return (
    <article className="mx-[10px]  mb-[1em]">
      <div className="flex">
        <label
          className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]"
          htmlFor="user-password"
        >
          <span className="inline-block">
            <HiOutlineLockOpen />
          </span>
        </label>
        <input
          onInput={(e) => {
            const password = e.currentTarget.value
            setPassword(password)
            passwordChecker(password)
          }}
          className="pl-[8px]  rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]"
          type="password"
          id="user-password"
          name="user-password"
          placeholder="패스워드"
        />
      </div>
      {isPassword ? (
        <span className="block px-[5px] text-[#292997] ml-[0.5em]">
          - 패스워드 형식과 일치합니다.
        </span>
      ) : (
        <>
          <span className="text-[#444141] block ml-[0.5em] ">
            - 특수문자 1개 이상, 문자 및 숫자 1개 이상 포함한 8자 이상
          </span>
          <span className="text-[red] block  ml-[0.5em]">
            - 패스워드 형식과 일치시키세요
          </span>
        </>
      )}
    </article>
  )
}
