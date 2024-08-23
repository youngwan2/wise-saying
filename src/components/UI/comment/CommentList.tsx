import EmptyMessage from '../message/EmptyMessage'
import { CommentsInfoType } from './Comment'
import CommentCard from './CommentCard'

interface PropsType extends CommentsInfoType {}
export default function CommentList({ comments }: PropsType) {
  if (comments.length < 1) return <EmptyMessage title='아직 댓글이 없습니다.' message='해당 명언/속담/글귀에 대한 의견을 공유해주세요!' />
  return (
    <ul className="mt-[2em] min-h-[350px]">
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </ul>
  )
}

