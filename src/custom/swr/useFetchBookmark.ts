import { toast } from "react-toastify"
import useSWR from "swr"
import apiRoute from "@/configs/config.api-route"
import useHasToken from "../useHasToken"
import { getBookmarkList } from "@/services/bookmark/bookmark.service"


export const useFetchBookmarkQuery = (page: number, limit: number = 5) => {
    const hasToken = useHasToken();
    const url = hasToken ? apiRoute.BOOKMARK.BOOKMARK_LIST({ page, limit }) : null

    return useSWR(url, getBookmarkList, {
        errorRetryCount: 2,
        onError: (error) => {
            toast.error('데이터 가져오기 실패:', error.message)
        },
        refreshInterval: 300000,
        revalidateOnMount: true,
        revalidateIfStale: false,
        revalidateOnFocus: true,
        onErrorRetry: ({ retryCount }) => {
            if (retryCount >= 3) return
        }
    })
}
