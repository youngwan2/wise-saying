"use server"

import { openDB } from "@/utils/connect"

// 초기값 | 공지사항 목록
export async function getNotices() {
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
export async function getNoticeCategories() {
    "use server"

    const db = await openDB()

    try {
        return (await db.query(`SELECT * FROM notice_categories`)).rows
    } catch (error) {
        console.error(error)
        return []
    }
}



/** 특정 공지사항 조회 */
export async function getNoticeWithId(id: string) {

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