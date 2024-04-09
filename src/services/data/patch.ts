/**
 * PATCH | 조회수 계산
 * @param quoteId 명언 식별자(id)
 * @param path views: 관리자 관리 명언 카드, user-card-views: 사용자 관리 명언 카드
 */
export async function viewCounter(quoteId: number | string, path:"user-card-views"|"views") {
    try {
        const response = await fetch('/api/quotes/' + Number(quoteId) + path,{
            method:'PATCH'
        })
        if (!response.ok) throw new Error(response.statusText)

    } catch (error) {
        console.error("조회수 집계 실패:", error)
    }
}