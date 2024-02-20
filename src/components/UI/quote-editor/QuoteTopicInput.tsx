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
      <label htmlFor="subject" className="block font-bold">
        주제
      </label>
      <input
        ref={inputRef}
        type="text"
        name={name}
        maxLength={3}
        minLength={0}
        placeholder={placeholder}
        className="min-w-[200px] w-[500px] min-h-[40px] px-[10px] rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)] "
      />
    </article>
  )
}
