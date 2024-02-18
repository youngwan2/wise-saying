import { HiOutlineLockClosed } from 'react-icons/hi2'

interface PropsType {
  isReconfirmPassword: boolean
  password: string
  setReConfirmPw: (p: string) => void
  setIsReconfirmPassword: (p: boolean) => void
}
export default function SignInPasswordReConfirmInput({
  isReconfirmPassword,
  password,
  setReConfirmPw,
  setIsReconfirmPassword,
}: PropsType) {
  /** 패스워드 재확인 */
  function passwordReConfirmChecker(confirmPw: string) {
    // 8자 이상 (a-z, 0-9 무조건 1개 이상 포함, 특수문자 1개 이상 포함)
    const test = confirmPw.includes(password)
    if (test) return setIsReconfirmPassword(true)
    return setIsReconfirmPassword(false)
  }

  return (
    <article className="mx-[10px]">
      <div className="flex">
        <label
          className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]"
          htmlFor="user-repassword"
        >
          <span className="inline-block">
            <HiOutlineLockClosed />
          </span>
        </label>
        <input
          onInput={(e) => {
            const password = e.currentTarget.value
            passwordReConfirmChecker(password)
            setReConfirmPw(password)
          }}
          className="pl-[8px] rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]"
          type="password"
          id="user-repassword"
          name="user-repassword"
          placeholder="패스워드 재확인"
        />
      </div>
      {isReconfirmPassword ? (
        <span className="block px-[5px] text-[#292997] ml-[0.5em]">
          - 패스워드 형식과 일치합니다.
        </span>
      ) : (
        <>
          <span className="text-[red] block  ml-[0.5em]">
            - 앞서 작성한 패스워드와 일치시키세요
          </span>
        </>
      )}
    </article>
  )
}
