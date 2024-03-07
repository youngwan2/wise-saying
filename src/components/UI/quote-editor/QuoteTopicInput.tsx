import { useRef } from 'react'
import { PostType } from './QuoteEditForm'
import useInitialValueSetter from '@/custom/useInitialValueSetter'

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
    <article className="px-[2em]">
      <label htmlFor="subject" className="block pb-[7px] pl-[2px]">
        주제
      </label>
      <input
        autoComplete="on"
        ref={inputRef}
        type="text"
        name={name}
        maxLength={3}
        minLength={0}
        placeholder={placeholder}
        className="placeholder:text-[#a1a1a1] bg-transparent min-w-[200px] max-w-[500px] w-full min-h-[40px] px-[10px] rounded-[5px] shadow-[inset_0_0_0_1px_white]  outline-none focus:bg-[#ffffff26] "
      />
    </article>
  )
}
