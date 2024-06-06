import { useRef } from 'react'
import useFocus from '@/custom/useFocus'

import Label from '../../common/Label'
import Input from '../../common/Input'
import Container from '../../common/container/Container'

interface PropsType {
  uId: string
}
export default function EmailInput({ uId }: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null)
  useFocus(inputRef)

  return (
    <Container elementName={'div'} className="mb-4">
      <Label htmlFor="email " className="hidden">
        이메일 주소
      </Label>
      <Input
        ref={inputRef}
        type="email"
        id="email"
        name={uId + 'email'}
        className="bg-transparent w-full  p-[0.65em] rounded-[5px] focus:outline-none text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] "
        placeholder="이메일 주소를 입력하세요"
        required
      />
    </Container>
  )
}
