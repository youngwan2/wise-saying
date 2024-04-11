import { useEffect, useRef } from 'react'

interface PropsType {
  nickname: string
}
export default function MypageNicknameInput({ nickname }: PropsType) {
  const nicknameRef = useRef<HTMLInputElement>(null)
  // 닉네임 초깃값 지정
  useEffect(() => {
    if (!nicknameRef.current) return
    const nicknameInput = nicknameRef.current
    nicknameInput.value = nickname || ''
  }, [nickname])

  return (
    <div className="mx-auto my-[5px]">
      <label
        htmlFor="nickname"
        className=" mb-[8px] rounded-[5px] min-w-[70px] inline-block text-white"
      >
        닉네임
      </label>
      <input
        required
        placeholder="최소 2~6 이하 영문/한글"
        id="nickname"
        name="nickname"
        className="border-[1px] border-[rgba(255,255,255,0.1)] bg-[transparent]  rounded-[2px] border-gray min-w-[220px] max-w-[400px] w-full p-[6px] placeholder:text-[gray] bg-[#e2dfdf] focus:outline-none text-white "
        ref={nicknameRef}
        type="text"
        maxLength={6}
        pattern="[ㄱ-ㅎ가-힣a-zA-Z]{2,6}"
        title="최소 2자 이상, 최대 6자 이하의 한글 또는 영문자를 입력하세요."
      />
    </div>
  )
}
