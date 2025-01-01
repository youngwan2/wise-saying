import { getNotices } from "@/services/notices/notices-client.service"
import { toast } from "react-toastify"
import { config } from "@/configs/config.url"
import useSWR from "swr"


export const useFetchNoticesQuery = (page: number, category: string) => {
    const url = config.apiPrefix + config.apiHost + '/api/notices?page=' + page + '&category=' + category
    const { data, isLoading, error, mutate } = useSWR(url, getNotices, {
        errorRetryCount: 2,
        onError: (error) => {
            toast.error('데이터 가져오기 실패:', error.message)
        },
    })
    return { data, isLoading, error, mutate }
}
