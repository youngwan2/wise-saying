import { getQuotesBy } from '@/services/item.get'
import useSWRInfinite from 'swr/infinite'

/**
 * SWR | 버튼형 무한 스크롤 커스텀 훅
 * @param pathname 페이지 경로
 * @param type 타입(각 타입 별로 서로 다른 api 경로로 요청)
 * @returns 
 * @example
 * // 사용 예시
 * const { items, size, isLastPage, setSize, isLoadingMore, itemCount } = useInfiniteScroll('/some/path', 'authors');
 */
export default function useInfiniteScroll(pathname: string | number, type: string) {

  const pathName = pathname

  //  데이터 식별 키(해당 키를 기반으로 fetch 함수에 url 을 공급하고, 키에 변동 사항이 생기면 서버에서 데이터를 불러온다.)
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // 끝에 도달

    let url = ''
    switch (type) {
      case 'authors':
      case 'days':
      case 'users':
      case 'etc':
        url = `/api/items/${type}/${pathName}?page=${pageIndex}&limit=15`
        break;

      case 'weathers': {
        url = `/api/items/weathers?page=${pageIndex}&limit=15`
      }
    }
    return url
  }

  const { data: itemInfo = [],  isLoading, size, setSize } = useSWRInfinite(
    getKey, getQuotesBy
  )

  // 데이터 후 처리 함수
  const items = itemInfo ? [].concat(...itemInfo) : []
  const itemCount = items?.length || 0
  const isLoadingMore = isLoading || (size > 0 && itemInfo && typeof itemInfo[size - 1] === 'undefined')

  // 중첩 배열의 마지막 배열 요소의 길이가 최대 아이템 갯수 보다 작다면 해당 지점을 마지막 페이지로 판단한다.

  return { items, size, setSize, isLoadingMore, itemCount }

}