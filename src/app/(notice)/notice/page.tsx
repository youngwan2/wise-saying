import NoticePageContainer from "../_components/NoticePageContainer";
import { NextUIProvider } from "@nextui-org/system";

import { openDB } from "@/utils/connect";


export default async function NoticePage() {
    const notices = await getNotices()
    const categories = await getNoticeCategories()

    return (
        <NextUIProvider className="max-w-[1230px] mx-auto px-2">
            <NoticePageContainer notices={notices} categories={categories} />
        </NextUIProvider>
    )
}



// 초기값 | 공지사항 목록
async function getNotices() {
    "use server"

    const db = await openDB()

    try {
        return (await db.query(`
        SELECT notice_id, content, created_at, name  
        FROM notices A INNER JOIN notice_categories B
        ON A.notice_category_id = B.notice_category_id
        ORDER BY notice_id DESC
        `)).rows

    } catch (error) {
        console.error(error)
        return []

    }
}

// 초기값 | 카테고리 목록
async function getNoticeCategories() {
    "use server"

    const db = await openDB()

    try {
        return (await db.query(`SELECT * FROM notice_categories`)).rows
    } catch (error) {
        console.error(error)
        return []
    }
}