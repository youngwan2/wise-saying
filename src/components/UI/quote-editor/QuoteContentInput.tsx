import { useRef } from 'react'
import { PostType } from './QuoteEditForm'
import useInitialValueSetter from '@/custom/useInitialValueSetter'

interface PropsType {
  post?: PostType
  name: string
  placeholder?: string
}
export default function QuoteContentInput({
  post,
  name,
  placeholder,
}: PropsType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const quote = post?.quote
  useInitialValueSetter(textareaRef, quote)
  return (
    <article className="px-[2em] my-[1.25em]">
      <label htmlFor="content" className="block font-bold">
        내용
      </label>
      <textarea
        ref={textareaRef}
        name={name}
        id="content"
        placeholder={placeholder}
        className="min-w-[200px] w-[500px] p-[10px] min-h-[150px]  rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"
      ></textarea>
    </article>
  )
}
