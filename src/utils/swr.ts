import useSWR from 'swr'
import { getFetcher } from './fetcher'
import {toast} from 'react-toastify'

// reference : https://swr.vercel.app/ko/docs/data-fetching
export const useSwrFetch = (url: string, refreshTimer:number|undefined, isActRefresh?:boolean) => {
  const { data, isLoading, error, mutate } = useSWR(url, getFetcher, {
    errorRetryCount: 2,
    refreshInterval: isActRefresh? (refreshTimer || 60000) : 60000,
    onError: (error) => {
      toast.error('데이터 가져오기 실패:', error.message)
    },
  })
  return { data, isLoading, error, mutate }
}

/**
 * 토큰 인증 유무에 따른 GET 분기처리 Fetch
 * @param url 요청 주소
 * @param isTokenVertify 토큰 인증 필요 유무
 */
export const useSwrFetchWithToken = (
  url: string | null,
  isTokenVertify: boolean,
) => {
  const { data, isLoading, error, mutate } = useSWR(
    [url, isTokenVertify],
    ([url, isTokenVertify]) => getFetcher(url, isTokenVertify),
    {
      errorRetryCount: 2,
      refreshInterval: 60000,
    },
  )
  return { data, isLoading, error, mutate }
}
