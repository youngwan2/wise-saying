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
      <label htmlFor="content" className="block font-bold">
        작성자
      </label>
      <input
        ref={inputRef}
        name={name}
        type="text"
        maxLength={8}
        minLength={2}
        className="min-w-[200px] w-[500px]  px-[10px] min-h-[40px]  rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"
        placeholder={placeholder}
      />
    </article>
  )
}
