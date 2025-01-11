import { useState, useEffect } from 'react';

interface PaginationState {
  pageList: number[];
  limit: number;
  firstPage: number;
  lastPage: number;
}

interface UsePaginationProps {
  page: number;
  totalCount: number;
  maxSize: number;
}

export function usePagination({ page, totalCount, maxSize }: UsePaginationProps): PaginationState {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageList: [],
    limit: 0,
    firstPage: 1,
    lastPage: 0,
  });

  useEffect(() => {
    // 페이지 그룹 계산
    const pageGroup = Math.ceil((page + 1) / maxSize);
    const limit = Math.max(1, Math.ceil(totalCount / maxSize)); // 최소값 보장
    const lastPage = Math.min(pageGroup * maxSize, limit);
    const firstPage = Math.max(lastPage - (maxSize - 1), 1);

    // 페이지 리스트 생성
    const pageList: number[] = [];
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i);
    }

    setPaginationState({
      pageList,
      limit,
      firstPage,
      lastPage,
    });
  }, [page, totalCount, maxSize]);

  return paginationState;
}
