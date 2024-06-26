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
    if (password.length < 5) return
    const test = confirmPw.includes(password)
    if (test) return setIsReconfirmPassword(true)
    return setIsReconfirmPassword(false)
  }

  return (
    <article className="mx-[10px]">
      <div className="flex">
        <label
          className="rounded-s-lg  text-[white] p-[0.8em] text-center inline-block min-w-[50px]"
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
          autoComplete="on"
          className="text-white pl-[8px]  min-w-[230px] w-[100%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] bg-transparent focus:bg-white focus:outline-none focus:text-black focus:font-bold hover:bg-[rgba(255,255,255,0.05)]"
          type="password"
          id="user-repassword"
          name="user-repassword"
          placeholder="패스워드 재확인"
        />
      </div>
      {isReconfirmPassword ? (
        <span className="font-sans px-[5px] text-[#56e146] ml-[3.3em] text-[14.3px] inline-block">
          패스워드 형식과 일치합니다.
        </span>
      ) : (
        <>
          <span className="font-sans text-[#f25555] ml-[3.6em] text-[14.3px] inline-block">
            앞서 작성한 패스워드와 일치시키세요
          </span>
        </>
      )}
    </article>
  )
}
