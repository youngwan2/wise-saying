import { PostType } from '../form/UpdateForm'

interface PropsType {
  setPost: (p: PostType) => void
  post: PostType
}
export default function UpdateContentInput({ setPost, post }: PropsType) {
  console.log(post)
  return (
    <article className="px-[2em]">
      <label htmlFor="content" className="block font-bold">
        내용
      </label>
      <textarea
        name="content"
        id="content"
        className="min-w-[200px] w-[500px] p-[10px] min-h-[150px]  rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"
        onInput={(e) => {
          const quote = e.currentTarget.value
          setPost({ ...post, quote })
        }}
        placeholder={'기존내용) ' + post.quote || '없음'}
      ></textarea>
    </article>
  )
}
