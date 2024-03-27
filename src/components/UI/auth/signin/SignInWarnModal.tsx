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
    <article className="bg-[#eeecec] absolute rounded-[10px] p-[15px] w-full max-w-[450px] left-[50%] top-[20%] z-50 translate-x-[-50%] shadow-[0_0_100px_1000px_rgba(0,0,0,0.5)] font-sans text-[0.95em]">
      <div className="flex justify-between mb-[0.25em]">
        <span className="bg-[#f55353] text-white inline-block rounded-[10px] p-[2px] px-[5px] mr-[0.5em] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.3)]">
          {'체험 전 주요사항'}{' '}
        </span>
      </div>
      <p className=" text-start px-[5px] my-[8px]">현재는 회원가입 시 이메일 형식만 일치하면 회원가입이 가능한 상태입니다. 가입 후 북마크, 글쓰기 등의 기능을 이용하는 데 큰 지장은 없으나, 개인정보를 활용해야 하는 비밀번호 찾기 등의 일부 기능 이용이 불가능할 수 있습니다. 실제 운영 및 사이트 정책 시행 이전에는 가입된 회원정보가 불시에 삭제될 수 있습니다. 보다 안전한 보안을 위한 조치이오니 양해 부탁드립니다.</p>
      <button
        className="font-bold hover:text-blue-700 p-[5px] px-[10px]"
        onClick={onClickModalClose}
      >
        확인
      </button>
    </article>
  )
}
