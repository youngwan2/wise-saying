import { getApiMetaDataFromServer } from '@/services/data/get'
import { useEffect, useState } from 'react'

/**
 * * 각 페이지 명언 목록의 추가 정보(전체 목록수, 최대 페이지 크기)를 불러오는 훅
 * @param mainCategory api 서버 경로 중분류(ex. authors,subject )
 * @param subCategory api 서버 경로 소분류(ex. params.slug ; 동적 params 이름 )
 * @param type users | authors
 */
export const useItemMetadataFetch = (
  mainCategory: string,
  subCategory: string,
  type: string,
) => {
  const [meta, setMeta] = useState({
    totalCount: 0,
    maxPage: 1,
  })

  const { totalCount, maxPage } = meta


  async function setMetadata(
    mainCategory: string,
    subCategory: string,
    type: string,
  ) {
    const { TOTAL_COUNT, MAX_PAGE } = (await getApiMetaDataFromServer(
      mainCategory,
      subCategory,
      type,
    )) || { TOTAL_COUNT: 0, MAX_PAGE: 1 }

    setMeta({ totalCount: TOTAL_COUNT, maxPage: MAX_PAGE })
  }

  useEffect(() => {
    setMetadata(mainCategory, subCategory, type)
  }, [mainCategory, subCategory, type])


  return { totalCount, maxPage }
}
