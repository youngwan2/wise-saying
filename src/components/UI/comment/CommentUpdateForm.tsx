import useDraggable from '@/custom/useDraggable'
import useHasToken from '@/custom/useHasToken'
import { MouseEventHandler, useRef } from 'react'

interface PropsType {
  onClickEditCancel: MouseEventHandler<HTMLButtonElement>
  commentId: number
  setEditFormDisplay: (value: boolean) => void
}
export default function CommentUpdateForm({
  onClickEditCancel,
  commentId,
  setEditFormDisplay,
}: PropsType) {
  const hasToken = useHasToken()
  const formRef = useRef<HTMLFormElement>(null)
  useDraggable(formRef, null)

  // PATCH | 유저가 작성한 댓글을 수정하는 요청
  async function commentUpdate(formData: FormData) {
    if (!hasToken) return alert('로그인 해주세요')
    const comment = formData.get('comment')
    const token = sessionStorage.getItem('token')

    const body = {
      comment,
    }
    const response = await fetch(`/api/quotes/${commentId}/comments`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    const { status, meg } = await response.json()

    if (status !== 201) {
      return alert(meg)
    }
    alert(meg + '잠시 후 갱신됩니다.')
    setEditFormDisplay(false)
  }
  return (
    <form
      ref={formRef}
      action={commentUpdate}
      className="flex flex-col w-[500px] mt-[1em] left-[50%] fixed min-h-[200px] bg-[#fdfdfd] z-30 top-[50%] translate-y-[-50%] translate-x-[-50%] backdrop-blur-[4px] rounded-[5px] shadow-[0_0_20px_5px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute w-[90%] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] flex flex-col  ">
        <h2 className="text-[1.25em] my-[5px] font-semibold">댓글 수정</h2>
        <textarea
          name="comment"
          className="bg-[white] w-full max-w-[600px]  max-h-[200px]  rounded-[5px] p-[10px] border-[2px] border-black"
        />{' '}
        <br />
        <div className="flex mt-[10px] justify-end">
          <button className="mr-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] ">
            수정
          </button>
          <button
            onClick={onClickEditCancel}
            className="mx-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] "
            type="reset"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  )
}
