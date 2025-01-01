import { getFetcher } from "@/utils/fetcher";


// GET | 인기 명언 조회
export async function getPopularityQuote(url:string) {
    return getFetcher(url, false)
}