import { ReplyInfoType } from "@/types/items.types"
import ReplaceMessageCard from "../common/ReplaceMessageCard"
import ReplyCard from "./ReplyCard"

interface PropsType {
    commentId: number
    userEmail:string
    replyInfo?: ReplyInfoType
}

export default function ReplyList({commentId, userEmail, replyInfo }: PropsType) {
    if (!replyInfo) return <ReplaceMessageCard childern="데이터를 불러오는 중입니다." />

    const replies = replyInfo.replies || []
    return (
        <ul className='flex flex-col items-end'>
            {replies.map((reply) => {
                return <ReplyCard key={reply.id} commentId={commentId} userEmail={userEmail} reply={reply} />
            })}
        </ul>
    )
}