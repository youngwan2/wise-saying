import useSWRInfinite from 'swr/infinite'
import { getInfiniteFetcher } from '@/utils/fetcher'



interface PropsType {
  mainPath?: 'users'| 'topics'|'authors',
  subPath?: string,
  type?: 'category' | 'quote'
}

/** SWR | 버튼형 무한 스크롤 커스텀 훅 */
export default function useInfiniteScroll({ mainPath, subPath, type }: PropsType) {
  
  //  데이터 식별 키(해당 키를 기반으로 fetch 함수에 url 을 공급하고, 키에 변동 사항이 생기면 서버에서 데이터를 불러온다.)
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // 끝에 도달

    let url = ''
    switch (mainPath) {
      case 'topics':
      case 'authors': {
        url = type === 'quote'
          ? `/api/quotes/${mainPath}/category/${subPath}?page=${pageIndex}` // 명언
          : `/api/quotes/${mainPath}/category?page=${pageIndex}` // 카테고리
        break
      }
      case 'users': {
        url = type === 'quote'
          ? `/api/quotes/users/category/${subPath}?page=${pageIndex}` // 명언
          : `/api/quotes/users/category?page=${pageIndex}` // 카테고리
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
    error
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

  return { items, isLoading, size, setSize, isLoadingMore, itemCount, error }
}
