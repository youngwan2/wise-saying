import { useRef } from 'react'
import { PostType } from './UpdatePostForm'
import useInitialValueSetter from '@/custom/useInitialValueSetter'

interface PropsType {
  post: PostType
  name:string
}
export default function UpdatePostContentInput({ post,name }: PropsType) {

const textareaRef = useRef<HTMLTextAreaElement>(null)
useInitialValueSetter(textareaRef, post.quote)
  return (
    <article className="px-[2em]">
      <label htmlFor="content" className="block font-bold">
        내용
      </label>
      <textarea
       ref={textareaRef}
        name={name}
        id="content"
        className="min-w-[200px] w-[500px] p-[10px] min-h-[150px]  rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"
        placeholder={'기존내용) ' + post.quote || '없음'}
      ></textarea>
    </article>
  )
}
