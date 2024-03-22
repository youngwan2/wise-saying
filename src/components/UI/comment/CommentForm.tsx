'use client'
import useHasToken from '@/custom/useHasToken'
import { postComment } from '@/services/user/post'
import { TextareaAutoResize, clearTextarea } from '@/utils/textarea'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import { KeyedMutator } from 'swr'
import { CommentsInfoType } from './Comment'

interface PropsType {
  mutate: KeyedMutator<CommentsInfoType>
}
export default function CommentForm({ mutate }: PropsType) {
  const { id } = useParams()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const hasToken = useHasToken()
  const { data: session } = useSession()

  async function addComment(formData: FormData) {
    if (!hasToken && !session) return toast.error('로그인 후 등록 가능합니다.')
    const comment = formData.get('comment')?.valueOf().toString() || ''
    await postComment(comment, id)
    clearTextarea(textareaRef)
    mutate()
  }

  return (
    <form
      action={addComment}
      className="mt-[1em]"
      aria-label="사용자 댓글 작성 폼"
    >
      <textarea
        aria-label="사용자 댓글 작성 창"
        ref={textareaRef}
        rows={1}
        placeholder="댓글 추가"
        className="sm:text-[14.5px] text-[14px]  text-white resize-none overflow-hidden pb-[3px] pl-[0.25em] font-sans border-none border-b bg-transparent w-full mt-[0.5em] focus:outline-none border-b-[#6a6666] outline-none transition-all border-2 shadow-[inset_0_-1px_0_0_rgba(443,333,553,0.5)]  focus:shadow-[inset_0_-2px_0_0_rgba(443,333,553,0.5)] min-h-[10px] placeholder:text-[gray]"
        onKeyUp={TextareaAutoResize}
        name="comment"
        id="comment"
      ></textarea>
      <div className="flex mt-[10px] justify-end relative">
        <button
          aria-label="댓글 작성 취소"
          className="sm:text-[15px] text-[14px] mx-[5px] min-w-[36px] text-white pb-[3px] hover:font-bold  hover:shadow-[inset_0_-2px_0_0_white] "
          type="reset"
        >
          취소
        </button>
        <button
          aria-label="댓글 등록"
          className="sm:text-[15px] text-[14px] min-w-[36px] text-white pb-[3px] hover:font-bold hover:shadow-[inset_0_-2px_0_0_white] "
        >
          등록
        </button>
      </div>
    </form>
  )
}
