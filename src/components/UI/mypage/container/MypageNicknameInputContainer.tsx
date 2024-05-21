import { useRef } from 'react'
import Label from '../../common/Label'
import Input from '../../common/Input'
import Container from '../../common/container/Container'

interface PropsType {
  nickname: string
}
export default function MypageNicknameInput({ nickname }: PropsType) {
  const nicknameRef = useRef<HTMLInputElement>(null)
  return (
    <Container elementName='div' className="mx-auto my-[1.5em]">
      <Label
        htmlFor="nickname"
        className=" mb-[8px] rounded-[5px] min-w-[70px] inline-block text-white">닉네임</Label>
      <Input
        placeholder="최소 2~6 이하 영문/한글"
        id="nickname"
        name="nickname"
        className="border-[1px] border-[rgba(255,255,255,0.1)] bg-[transparent]  rounded-[2px] border-gray min-w-[220px] max-w-[400px] w-full p-[6px] placeholder:text-[gray] bg-[#e2dfdf] focus:outline-none text-white "
        ref={nicknameRef}
        type="text"
        maxLength={6}
        value={nickname}
        title="최소 2자 이상, 최대 6자 이하의 한글 또는 영문자를 입력하세요."
        pattern="[ㄱ-ㅎ가-힣a-zA-Z]{2,6}"
        required={true} minLength={0} autoComplete={''}       
      />
    </Container>
  )
}
