import { useRef } from 'react'

import Label from '../common/Label'
import TextArea from '../common/TextArea'
import Container from '../common/container/Container'

import type { PostType } from './QuoteEditForm'

interface PropsType {
  post?: PostType
  name: string
  placeholder?: string
}
export default function QuoteContentTextarea({
  post,
  name,
  placeholder,
}: PropsType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const quote = post?.quote
  return (
    <Container elementName='div' className='px-[2em] my-[1.25em]'>
      <Label htmlFor="content" className="block pb-[7px] pl-[2px]">
        내용
      </Label>
      <TextArea
        autoComplete='on'
        ref={textareaRef}
        name={name}
        id="content"
        defaultValue={quote}
        placeholder={placeholder}
        className="hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] bg-transparent min-w-[200px] max-w-[500px] w-full p-[10px] min-h-[150px]  rounded-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] outline-none focus:bg-[#ffffff0e] "
      />
    </Container>
  )
}
