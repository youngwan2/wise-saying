import { PropsType } from "./CommentCard";

export default function CommentContent({item}:PropsType) {
    return (
        <>
            <span className="font-semibold inline-block mt-[0.2em] text-[14px]">
                {item.nickname || '무명의 위인'}(
                {item.email.replace(item.email.slice(2, 5), '***')})
            </span>
            <p>{item.comment}</p>
            <span className="inline-block mt-[4px] text-[14px]">
                {item.create_date}
            </span>
        </>
    )
}