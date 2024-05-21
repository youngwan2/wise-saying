import { useRef } from 'react'
import useInitialValueSetter from '@/custom/useInitialValueSetter'

import Input from '../common/Input'
import Label from '../common/Label'
import Container from '../common/container/Container'

import { PostType } from './QuoteEditForm'

interface PropsType {
  post?: PostType
  name: string
  placeholder?: string
}
export default function QuoteTopicInput({
  post,
  name,
  placeholder,
}: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null)
  const category = post?.category
  useInitialValueSetter(inputRef, category)

  return (
    <Container elementName='div' className="px-[2em]">
      <Label htmlFor="subject" className="block pb-[7px] pl-[2px]" >
        주제
      </Label>
      <Input
        autoComplete="on"
        ref={inputRef}
        type="text"
        name={name}
        maxLength={3}
        minLength={0}
        placeholder={placeholder}
        className="placeholder:text-[#a1a1a1] bg-transparent min-w-[200px] max-w-[500px] w-full min-h-[40px] px-[10px] rounded-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] outline-none focus:bg-[#ffffff0e] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] "
      />
    </Container>
  )
}
