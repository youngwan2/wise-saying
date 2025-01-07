import { toast } from "react-toastify"
import { config } from "@/configs/config.url"
import useSWR from "swr"
import { getPopularityQuote } from "@/services/quotes/quotes.service"



export const useFetchPopularityQuoteQuery = () => {
    const url = config.apiPrefix + config.apiHost + '/api/quotes/populars'
    const { data, isLoading, error, mutate } = useSWR(url, getPopularityQuote, {
        errorRetryCount: 2,
        refreshInterval: 1000 * 60 * 5, // 5 분 간격 리프레쉬
        onError: (error) => {
            toast.error('데이터 가져오기 실패:', error.message)
        },
    })
    return { data, isLoading, error, mutate }
}
