'use client'
import { postComment } from '@/services/user/post'
import { TextareaAutoResize, clearTextarea } from '@/utils/textarea'
import { useParams } from 'next/navigation'
import { useRef } from 'react'

export default function CommentForm() {
  const { id } = useParams()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  async function addComment(formData: FormData) {
    const comment = formData.get('comment')?.valueOf().toString() || ''
    await postComment(comment, id)
    clearTextarea(textareaRef)
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
        placeholder='댓글 추가'
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
