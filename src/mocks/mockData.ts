import { HTTP_CODE } from "@/app/http-code"

// GET |  오늘의 명언 데이터
export const mockToday = {
    ...HTTP_CODE.OK, items: [
        {
            quote_id: 1,
            quote: "똥은 더러워서 피한다.",
            author: "테스터",
            job: "사이트 관리자",
            birth: ''
        },
        {
            quote_id: 2,
            quote: "너도 그렇냐? 나도 그렇다.",
            author: "테스터",
            job: "사이트 관리자",
            birth: ''
        },

    ]
}

// POST | AI 명언 해설 데이터
export const mockAiCommentation = {
    ...HTTP_CODE.CREATED, commentationInfo: [
        {
            commentation :'AI 명언 해설 입니다.'
        }

    ]
}