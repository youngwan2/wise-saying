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
        <label
          className=" bg-transparent text-[white] p-[0.8em] text-center inline-block min-w-[50px]  "
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
          className="pl-[8px] min-w-[230px]  w-[100%] bg-transparent shadow-[inset_0_0_0_2px_white] text-white focus:bg-white focus:outline-none focus:text-black focus:font-bold" 
          type="password"
          id="user-password"
          name="user-password"
          placeholder="패스워드"
        />
      </div>
      {isPassword ? (
      <span className="font-sans block px-[5px] text-[#56e146] ml-[0.5em] text-[14.3px]">
          - 패스워드 형식과 일치합니다.
        </span>
      ) : (
        <>
          <span className="font-sans text-[#837f7f] block ml-[0.5em] text-[14.3px] ">
            - 특수문자 1개 이상, 문자 및 숫자 1개 이상 포함한 8자 이상
          </span>
          <span className=" font-sans text-[red] block  ml-[0.5em] text-[14.3px]">
            - 패스워드 형식과 일치시키세요
          </span>
        </>
      )}
    </article>
  )
}
