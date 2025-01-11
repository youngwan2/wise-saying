import { toast } from "react-toastify"
import useSWR from "swr"
import apiRoute from "@/configs/config.api-route"
import useHasToken from "../useHasToken"
import { getUserProfile } from "@/services/user/mypage.service"


export const useFetchUserProfileQuery = () => {
    const hasToken = useHasToken();
    const url = hasToken ? apiRoute.USER.USER_PROFILE_READ() : null

    return useSWR(url, getUserProfile, {
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
