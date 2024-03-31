import { getInfiniteFetcher } from '@/utils/fetcher'
import useSWRInfinite from 'swr/infinite'

/**
 * SWR | 버튼형 무한 스크롤 커스텀 훅
 * @param mainCategory 첫 번째 분기 처리 경로로 사용( authors | topicks )
 * @param subCategory  두 번째 분기처리 경로로 사용( usePathname 등을 사용하여 얻은 params 값 )
 * @returns
 * @example
 * // 사용 예시
 * const { items, size, setSize, isLoadingMore, itemCount } = useInfiniteScroll('authors', '소크라테스);
 */
export default function useInfiniteScroll(
  mainCategory: string,
  subCategory: string,
) {
  //  데이터 식별 키(해당 키를 기반으로 fetch 함수에 url 을 공급하고, 키에 변동 사항이 생기면 서버에서 데이터를 불러온다.)
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // 끝에 도달

    let url = ''
    switch (mainCategory) {
      case 'topics':
      case 'authors': {
        url = `/api/quotes/${mainCategory}/${subCategory}?page=${pageIndex}&limit=30`
        break
      }
      case 'users': {
        url = `/api/quotes/${mainCategory}/post/categories/${subCategory}?page=${pageIndex}&limit=30`
      }
    }
    return url
  }

  // SWR | 인피니티 훅
  const {
    data: itemInfo = [],
    isLoading,
    size,
    setSize,
  } = useSWRInfinite(getKey, getInfiniteFetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // 데이터 후 처리 함수
  // const items = itemInfo ? itemInfo.flatMap((old)=> { return old} ) : null
  const items = itemInfo ? [].concat(...itemInfo) : null
  const itemCount = items?.length || 0 // 현재 로드 중인 아이템 갯수
  const isLoadingMore =
    isLoading ||
    (size > 0 && itemInfo && typeof itemInfo[size - 1] === 'undefined')

  // 중첩 배열의 마지막 배열 요소의 길이가 최대 아이템 갯수 보다 작다면 해당 지점을 마지막 페이지로 판단한다.

  return { items, isLoading, size, setSize, isLoadingMore, itemCount }
}
