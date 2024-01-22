import { PostType } from '../form/UpdateForm'

interface PropsType {
  setPost: (p: PostType) => void
  post: PostType
}
export default function UpdateSubjectInput({ setPost, post }: PropsType) {

  return (
    <article className="px-[2em]">
    <label htmlFor="subject" className="block font-bold">
      주제
    </label>
    <input
      onInput={(e) => {
        const category = e.currentTarget.value
        setPost({ ...post, category })
      }}
      type="text"
      className="min-w-[200px] w-[500px] min-h-[40px] px-[10px]"
      placeholder={'기존내용) ' + post.category || '없음'}
    />
  </article>

  )
}
