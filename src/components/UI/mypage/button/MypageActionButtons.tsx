import { Session } from "next-auth"
import { MouseEventHandler } from "react"

interface PropsType {
    onClick:MouseEventHandler<HTMLButtonElement>
    session: Session | null
 }
  
export default function MypageActionButtons({onClick, session}:PropsType) {
return (
  <>
         <button
          aria-label="수정하기 버튼으로, 클릭 시 입력된 정보로 패스워드(비밀번호)가 변경"
          className={`${session ? 'hidden' : ''} bg-white text-black font-bold px-3 py-[8px] hover:bg-[#e6e3e3] rounded-[3px] mr-2`}
        >
          수정하기
        </button>
        <button
          aria-label="탈퇴하기 버튼으로, 버튼 클릭 시 회원탈퇴 라고 입력 후 확인을 엔터 혹은 클릭해야 하는 창 생성 "
          type="button"
          onClick={onClick}
          className="bg-[white] text-black font-bold px-3 py-[8px] rounded-[3px] hover:bg-[#e6e3e3] transition-all"
        >
          탈퇴하기
        </button>
</>
)}