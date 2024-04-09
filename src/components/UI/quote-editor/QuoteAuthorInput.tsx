import { useRef } from 'react'
import { PostType } from './QuoteEditForm'
import useInitialValueSetter from '@/custom/useInitialValueSetter'

interface PropsType {
  post?: PostType
  name: string
  placeholder?: string
}
export default function QuoteAuthorInput({
  post,
  name,
  placeholder,
}: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null)
  const author = post?.author
  useInitialValueSetter(inputRef, author)

  return (
    <article className="px-[2em]">
      <label htmlFor="content" className="block pb-[7px] pl-[2px]">
        작성자
      </label>
      <input
        autoComplete="on"
        ref={inputRef}
        name={name}
        type="text"
        maxLength={8}
        minLength={2}
        className="hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] min-w-[200px] bg-transparent max-w-[500px] w-full px-[10px] min-h-[40px] rounded-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] outline-none focus:bg-[#ffffff0e] "
        placeholder={placeholder}
      />
    </article>
  )
}
