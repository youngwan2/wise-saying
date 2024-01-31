import { useRef } from 'react'
import { PostType } from './UpdatePostForm'
import useInitialValueSetter from '@/custom/useInitialValueSetter'

interface PropsType {
  post: PostType
  name:string
}
export default function UpdatePostAuthorInput({ post, name }: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null)
  useInitialValueSetter(inputRef, post.author)

  return (
    <article className="px-[2em]">
      <label htmlFor="content" className="block font-bold">
        작성자
      </label>
      <input
      ref={inputRef}
        name={name}
        type="text"
        className="min-w-[200px] w-[500px]  px-[10px] min-h-[40px]  rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"
        placeholder={'기존내용) ' + post.author}
      />
    </article>
  )
}
