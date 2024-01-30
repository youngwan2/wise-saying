import { useRef } from 'react'
import { PostType } from '../form/UpdateForm'
import useInitialValueSetter from '@/custom/useInitialValueSetter'

interface PropsType {
  post: PostType
  name: string
}
export default function UpdateSubjectInput({ post, name }: PropsType) {

  const inputRef = useRef<HTMLInputElement>(null)

  useInitialValueSetter(inputRef, post.category)

  return (
    <article className="px-[2em]">
      <label htmlFor="subject" className="block font-bold">
        주제
      </label>
      <input
        ref={inputRef}
        type="text"
        name={name}
        className="min-w-[200px] w-[500px] min-h-[40px] px-[10px] rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)] "
        placeholder={'기존내용) ' + post.category || '없음'}
      />
    </article>
  )
}
