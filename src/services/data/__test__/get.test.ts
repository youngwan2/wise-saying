import { getTodayQuotesFromDb } from "../get"

//  http://localhost:3000/api/quotes/today 경로로 반환하는 가짜 아이템은 2개로 설정함
describe('GET | getTodayQuotesFromDb',()=>{

    it('오늘의 명언 항목을 정확한 수로 반환한다.',async ()=>{
        const items = await getTodayQuotesFromDb(`/api/quotes/today`)

        expect(items.length).toBe(2)
    })
})