import { CommentType } from '@/types/items.types'

interface PropsType extends CommentType {}
export default function CommentContent({ comment }: PropsType) {
  return (
    <div className="ml-[2.15em] break-words w-[87%]">
      <p className="sm:text-[13.5px] text-[12px] font-semibold  mt-[0.2em]">
        {comment.nickname || '익명'}(
        {comment.email.replace(comment.email.slice(2, 5), '***')}){' '}
        {comment.created_at.substring(0, 10)}
      </p>
      <p className="sm:text-[14px] sm:pt-[5px] text-[12.5px] pt-[3px]  font-sans ">{comment.comment}</p>
      <span className="inline-block mt-[4px] text-[14px]"></span>
    </div>
  )
}
