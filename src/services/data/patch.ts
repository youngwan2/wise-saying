/**
 * PATCH | 조회수 계산
 * @param quoteId 명언 식별자(id)
 */
export async function viewCounter(quoteId: number | string) {
    try {
        const response = await fetch('/api/quotes/' + Number(quoteId) + '/views',{
            method:'PATCH'
        })
        if (!response.ok) throw new Error(response.statusText)

    } catch (error) {
        console.error("조회수 집계 실패:", error)
    }
}