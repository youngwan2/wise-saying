import dynamic from 'next/dynamic'
import ErrorMessage from "@/components/UI/message/ErrorMessage";
import { openDB } from "@/utils/connect";


const NoticeDetailEditor = dynamic(() => import("../../_components/NoticeDetailEditor").then(mode => mode.default), { ssr: false })
export default async function NoticeDetailPage({ params }: { params: { id: string } }) {

    const notice = await getNoticeWithId(params.id)
    if (!notice) return <ErrorMessage />
    return   <NoticeDetailEditor notice={notice} />
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