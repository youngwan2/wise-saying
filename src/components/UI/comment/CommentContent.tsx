import { CommentType } from '@/types/items.types'

interface PropsType extends CommentType {}
export default function CommentContent({ comment }: PropsType) {
  return (
    <div className="ml-[3em] break-words w-[87%]">
      <p className="font-semibold  mt-[0.2em] text-[13.5px]">
        {comment.nickname || '무명의 위인'}(
        {comment.email.replace(comment.email.slice(2, 5), '***')}){' '}
        {comment.created_at.substring(0, 10)}
      </p>
      <p className="text-[14px] font-sans pt-[8px]">{comment.comment}</p>
      <span className="inline-block mt-[4px] text-[14px]"></span>
    </div>
  )
}
