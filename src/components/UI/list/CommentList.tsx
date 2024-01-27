import { getCommentsFormDb } from "@/api/data/get";
import CommentCard from "../card/CommentCard";
import CommentForm from "../form/CommentForm";

interface PropsType {
    id: string
}
interface ItemType {
    id: number
    email: string
    nickname: string | null
    profile_iamge: string | null
    comment: string
}
export default async function CommentList({ id }: PropsType) {
    const items: ItemType[] = await getCommentsFormDb(id)

    return (
        <section className="py-[1em]">
            <h2 className="text-white text-[1.5em] mt-[2em]">댓글({items?.length || 0})</h2>
            <CommentForm />
            <ul>
                {items.map((item) => {
                    return <CommentCard item={item} key={item.id} />
                })}
            </ul>
        </section>
    )
}