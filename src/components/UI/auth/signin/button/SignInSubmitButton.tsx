import { MouseEventHandler } from 'react'

interface PropsType {
  isDisabled: boolean
  isPass: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}
export default function SignInSubmitButton({
  isDisabled,
  isPass,
  onClick,
}: PropsType) {

  // 일치
  if (isPass) return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`rounded-[5px] my-[2.5em] text-[black] bg-[#FFFFFF] max-w-[150px] py-[0.5em] min-w-[150px] mx-auto hover: cursor-pointer hover:bg-[#ffd9d9] font-bold ${isPass ? 'visible' : 'invisible'
        }`}
      type="submit"
    >
      {!isDisabled ? '가입' : '전송중...'}
    </button>
  )
  // 불일치
  else return (
    <span className=" m-[30px] py-[10px] text-center text-white bg-[rgba(255,255,255,0.05)]">
      ❕ 조건 충족시 버튼이 활성화 됩니다.
    </span >)

}
