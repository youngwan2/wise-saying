import useSWR from "swr";
import { getFetcher } from "./fetcher";
import toast from "react-hot-toast";

// reference : https://swr.vercel.app/ko/docs/data-fetching
export const useSwrFetch = (url: string) => {
    const { data, isLoading, error, mutate } = useSWR(url, getFetcher, {
        errorRetryCount: 2,
        refreshInterval: 60000,
        onError: (error) => {
            toast.error('데이터 가져오기 실패:', error.message)
        }
    })

    return { data, isLoading, error, mutate }
}

