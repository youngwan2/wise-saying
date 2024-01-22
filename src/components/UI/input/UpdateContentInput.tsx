import { PostType } from '../form/UpdateForm'

interface PropsType {
  setPost: (p: PostType) => void
  post: PostType
}
export default function UpdateContentInput({ setPost, post }: PropsType) {
  return (
    <article className="px-[2em]">
      <label htmlFor="content" className="block font-bold">
        내용
      </label>
      <textarea
        name="content"
        id="content"
        className="min-w-[200px] w-[500px] p-[10px] min-h-[150px]"
        onInput={(e) => {
          const wise_sayings = e.currentTarget.value
          setPost({ ...post, wise_sayings })
        }}
        placeholder={'기존내용) ' + post.wise_sayings || '없음'}
      ></textarea>
    </article>
  )
}
