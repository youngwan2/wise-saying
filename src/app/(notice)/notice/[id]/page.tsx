import NoticeDetailEditor from "../../_components/NoticeDetailEditor";
import ErrorMessage from "@/components/UI/message/ErrorMessage";

import { openDB } from "@/utils/connect";



export default async function NoticeDetailPage({ params }: { params: { id: string } }) {

    const notice = await getNoticeWithId(params.id)
    if(!notice) return <ErrorMessage/>
    return (
        <div>
            <NoticeDetailEditor notice={notice} />
        </div>
    )
}



async function getNoticeWithId(id: string) {

    const db = await openDB()

    try {
        const notice = await db.query(`
            SELECT notice_id, content, created_at, name  
            FROM notices A INNER JOIN notice_categories B
            ON A.notice_category_id = B.notice_category_id
            WHERE notice_id = $1
            `
            , [id])
        return notice.rows[0]
    } catch (error) {
        console.error(error)
        return []
    }
}