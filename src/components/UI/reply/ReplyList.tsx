import ReplaceMessageCard from '../common/card/ReplaceMessageCard'
import ReplyCard from './ReplyCard'

import { ReplyInfoType } from '@/types/items.types'

interface PropsType {
  isShowReplies:boolean
  commentId: number
  userEmail: string
  replyInfo?: ReplyInfoType
}

export default function ReplyList({
  isShowReplies,
  commentId,
  userEmail,
  replyInfo,
}: PropsType) {
  if (!replyInfo)
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다." />

  const replies = replyInfo.replies || []
  if(!isShowReplies) return <></>
  return (
    <ul className="flex flex-col items-end">
      {replies.map((reply) => {
        return (
          <ReplyCard
            key={reply.id}
            commentId={commentId}
            userEmail={userEmail}
            reply={reply}
          />
        )
      })}
    </ul>
  )
}
