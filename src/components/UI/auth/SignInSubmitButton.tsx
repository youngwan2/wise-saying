import { MouseEventHandler } from "react"

interface PropsType {
  isVaildForm: boolean
  existsEmail: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}
export default function SignInSubmitButton({
  isVaildForm,
  existsEmail,
  onClick
}: PropsType) {
  return (
    <>
      {isVaildForm && existsEmail ? (
        <button
          onClick={onClick}
          className={`rounded-[5px] my-[2.5em] text-[black] bg-[#FFFFFF] max-w-[150px] py-[0.5em] min-w-[150px] mx-auto hover: cursor-pointer hover:bg-[#ffd9d9] font-bold ${
            isVaildForm && existsEmail ? 'visible' : 'invisible'
          }`}
          type="submit"
        >
          가입
        </button>
      ) : (
        <span className="p-[30px] text-center text-white">
          - 조건 충족시 버튼이 활성화 됩니다.
        </span>
      )}
    </>
  )
}
