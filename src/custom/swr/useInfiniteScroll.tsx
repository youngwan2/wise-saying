import useSWRInfinite from 'swr/infinite'
import { getInfiniteFetcher } from '@/utils/fetcher'



interface PropsType {
  mainPath?: 'users'| 'topics'|'authors',
  subPath?: string,
  type?: 'category' | 'quote'
}

/** SWR | 버튼형 무한 스크롤 커스텀 훅 */export default function useInfiniteScroll({ mainPath, subPath, type }: PropsType) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달

    const baseUrl = `/api/quotes/${mainPath}`;
    const pathSuffix = type === 'quote' ? `/category/${subPath}` : `/category`;

    return `${baseUrl}${pathSuffix}?page=${pageIndex}`;
  }

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
  });

  const items = itemInfo ? [].concat(...itemInfo) : null;  // 평탄화
  const itemCount = items?.length || 0;
  const isLoadingMore =
    isLoading || (size > 0 && itemInfo && typeof itemInfo[size - 1] === 'undefined');

  return { items, isLoading, size, setSize, isLoadingMore, itemCount, error };
}
