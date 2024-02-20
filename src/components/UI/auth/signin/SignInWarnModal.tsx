import { MouseEventHandler } from 'react'

interface PropsType {
  isShow: boolean
  onClickModalClose: MouseEventHandler<HTMLButtonElement>
}
export default function SignInWarnModal({
  isShow,
  onClickModalClose,
}: PropsType) {
  if (!isShow) return <></>
  return (
    <article className="bg-[white] absolute rounded-[10px] p-[15px] w-full max-w-[450px] left-[50%] top-[20px] z-50 translate-x-[-50%] shadow-[0_0_100px_1000px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between">
        <span className="bg-[#f55353] text-white inline-block rounded-[10px] p-[2px] px-[5px] mr-[0.5em] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.3)]">
          {'체험 전 주요사항'}{' '}
        </span>
      </div>
      <p className="text-red  text-start px-[5px] my-[5px]">
        회원가입에 사용되는{' '}
        <b className="underline">
          아이디와 비밀번호는 절대 타 사이트에서 사용하는 것을 사용하지 마세요
        </b>
        . 저장된 회원정보는 1일 1회 전체 삭제 처리합니다. <br></br> <br />
        <b className="underline">
          {' '}
          Please do not use the same ID and password for registration as you do
          on other sites
        </b>
        . All stored member information will be deleted completely once a day.
      </p>
      <button
        className="font-bold hover:text-blue-700 p-[5px] px-[10px]"
        onClick={onClickModalClose}
      >
        확인
      </button>
    </article>
  )
}
