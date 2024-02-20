'use client'
import { postComment } from '@/services/user/post'
import { useParams } from 'next/navigation'
import { useRef } from 'react'

export default function CommentForm() {
  const { id } = useParams()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  async function addComment(formData: FormData) {
    const comment = formData.get('comment')?.valueOf().toString() || ''
    await postComment(comment, id)
    textareaRef.current && (textareaRef.current.value = '')
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
        className="w-full min-h-[70px] rounded-[10px] p-[10px]"
        name="comment"
        id="comment"
      ></textarea>
      <div className="flex mt-[10px] justify-end relative">
        <button
          aria-label="댓글 등록"
          className="mr-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] "
        >
          등록
        </button>
        <button
          aria-label="댓글 작성 취소"
          className="mx-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] "
          type="reset"
        >
          취소
        </button>
      </div>
    </form>
  )
}
