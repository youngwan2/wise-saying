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
    <article className="bg-[#eeecec] absolute rounded-[10px] p-[15px] w-full max-w-[450px] left-[50%] top-[20%] z-50 translate-x-[-50%] shadow-[0_0_100px_1000px_rgba(0,0,0,0.5)] text-[1em]">
      <div className="flex justify-between mb-[0.25em]">
        <span className=" bg-[#f55353] text-white inline-block rounded-[10px] p-[2px] px-[5px] mr-[0.5em] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.3)]">
          {'체험 전 참고사항'}{' '}
        </span>
      </div>
      <p className=" text-start px-[5px] my-[8px]">회원가입은 이메일 형식만 갖춰지면 승인됩니다. 다만 실제 도메인이 아닌 경우 일부 기능을 사용하기 제한이 될 수 있습니다. 이 경우에는 하단 풋터의 구글폼으로 문제 상황을 알려주세요. 정식 호스팅까지 가입 정보 불시 삭제 할 수 있습니다.</p>
      <button
        className="font-bold hover:text-blue-700 p-[5px] px-[10px]"
        onClick={onClickModalClose}
      >
        확인
      </button>
    </article>
  )
}
