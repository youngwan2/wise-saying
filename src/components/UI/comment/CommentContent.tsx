import { CommentType } from '@/types/items.types'

interface PropsType extends CommentType { }
export default function CommentContent({ comment }: PropsType) {
  const { nickname, email, created_at, comment: content } = comment

  return (
    <div className="ml-[2.15em] break-words w-[87%] font-sans">
      <p className="sm:text-[13px] text-[12px] mt-[0.2em]">
        {nickname || '익명'}(
        {email.replace(comment.email.slice(2, 5), '***')}){' '}
        {created_at.substring(0, 10)}
      </p>
      <p className="sm:text-[14px] sm:pt-[5px] text-[12.5px] pt-[3px]  ">
        {content}
      </p>
      <span className="inline-block mt-[4px] text-[14px]"></span>
    </div>
  )
}
