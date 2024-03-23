import { CommentType } from '@/types/items.types'

interface PropsType extends CommentType { }
export default function CommentContent({ comment }: PropsType) {
  const { nickname, email, created_at, comment: content } = comment
  const id = email.split('@')[0]
  return (
    <div className="ml-[2.15em] break-words w-[87%] font-sans">
      <p className="sm:text-[13px] text-[12px] mt-[0.2em]">
        {nickname || '익명'}(
        {id.replace(id.slice(2,4 ), '**').replace(id.slice(6,7),'*')}){' '}
        {created_at.substring(0, 10)}
      </p>
      <p className="sm:text-[14px] sm:pt-[5px] text-[12.5px] pt-[3px]  ">
        {content}
      </p>
      <span className="inline-block mt-[4px] text-[14px]"></span>
    </div>
  )
}
