import { PostType } from '../form/UpdateForm'

interface PropsType {
  setPost: (p: PostType) => void
  post: PostType
}
export default function UpdateAuthorInput({ setPost, post }: PropsType) {
  return (
    <article className="px-[2em]">
      <label htmlFor="content" className="block font-bold">
        작성자
      </label>
      <input
        onInput={(e) => {
          const author = e.currentTarget.value
          setPost({ ...post, author })
        }}
        type="text"
        className="min-w-[200px] w-[500px]  px-[10px] min-h-[40px]  rounded-[5px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"
        placeholder={'기존내용) ' + post.author}
      />
    </article>
  )
}