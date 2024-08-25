import { openDB } from "@/utils/connect"

// 해당 유저가 관리자인지 확인
export async function verifyAdmin(userId: string) {
    const db = await openDB()

    try {
        const user = await db.query(`SELECT is_admin FROM users WHERE user_id=$1`, [userId])
        if (user.rows[0].is_admin === 'TRUE') {
            return true
        }
        return false
    } catch (error) {
        console.error('verifyAdmin error', error)
        return false
    }
}