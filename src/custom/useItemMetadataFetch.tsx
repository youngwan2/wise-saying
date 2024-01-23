import { getApiMetaDataFromServer } from '@/api/data/get'
import { useEffect, useState } from 'react'

/**
 * * 각 페이지 명언 목록의 추가 정보(전체 목록수, 최대 페이지 크기)를 불러오는 훅
 * @param mainCategory api 서버 경로 중분류(ex. authors,subject )
 * @param subCategory api 서버 경로 소분류(ex. params.slug ; 동적 params 이름 )
 */
export const useItemMetadataFetch = (
  mainCategory: string,
  subCategory: string,
) => {
  const [meta, setMeta] = useState({
    totalCount: 0,
    maxPage: 1,
  })

  async function setMetadata(mainCategory: string, subCategory: string) {
    const { TOTAL_COUNT, MAX_PAGE } = (await getApiMetaDataFromServer(
      mainCategory,
      subCategory,
    )) || { TOTAL_COUNT: 0, MAX_PAGE: 1 }
    setMeta({
      totalCount: TOTAL_COUNT,
      maxPage: MAX_PAGE,
    })
  }

  useEffect(() => {
    setMetadata(mainCategory, subCategory)
  }, [mainCategory, subCategory])

  const { totalCount, maxPage } = meta

  return { totalCount, maxPage }
}
