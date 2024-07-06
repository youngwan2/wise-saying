import { Method,  getDefaultConfig } from "@/configs/config.api"
import { defaultFetch } from "../fetcher"
import { HTTP_CODE } from "@/app/http-code"


// /api/quotes/today 의 mockData 가짜 데이터 2개
describe('defaultFetch',()=>{

    // GET 요청 테스트
    it('아이템을 정상적으로 반환 한다.',async ()=>{
        const configs = getDefaultConfig(Method.GET,false)
        const url = `/api/quotes/today`
        const {success, meg, items} = await defaultFetch(url, configs)

        expect(success).toBe(HTTP_CODE.OK.success)
        expect(meg).toBe(HTTP_CODE.OK.meg)
        expect(items.length).toBe(2)

    })
})