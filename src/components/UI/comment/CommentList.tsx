import { CommentsInfoType } from "./Comment";
import CommentCard from "./CommentCard";

interface PropsType extends CommentsInfoType {
}
export default function CommentList({ comments }: PropsType) {
    if (comments.length < 1) return <EmptyMessage/>
    
    return (
        <ul className="mt-[2em] min-h-[350px]">
            {comments.map((comment) => <CommentCard comment={comment} key={comment.id} />)}
        </ul>
    )
}

function EmptyMessage() {
    return (
        <p className="text-white text-[1.25em] text-center mx-auto mt-[2em]">
            해당 명언/속담/글귀에 대한 의견을 공유해주세요!
        </p>
    )
}