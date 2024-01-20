import { useCallback, useEffect, useState } from 'react'
import MyQuoteCard from '../card/MypageMyQuoteCard'
import Pagination from '../pagination/Pagination'

interface PropsType {
  page: number
  setPage: (p: number) => void
  userQuotes: {
    id: number
    wise_sayings: string
    author: string
    category: string
  }[]
  count: number
}

const MAX_RENDER_PAGE = 5

export default function MypageMyQuoteList({
  userQuotes,
  setPage,
  page,
  count,
}: PropsType) {
  const [limit, setLimit] = useState(0)
  const [firstPage, setFirstPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)
  const [pageGroup, setPageGroup] = useState(1)
  const [pageList, setPageList] = useState<number[]>([])

  const render = useCallback(() => {
    const pageList: number[] = []
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i)
    }
    setPageList(pageList)
  }, [firstPage, lastPage])

  // 페이지 네이션 상태 초기 셋팅
  useEffect(() => {
    setPageGroup(Math.ceil((page + 1) / MAX_RENDER_PAGE))
    setLimit(Math.ceil(count / MAX_RENDER_PAGE))
    setFirstPage(lastPage - (MAX_RENDER_PAGE - 1))
    setLastPage(pageGroup * MAX_RENDER_PAGE)
    render()
  }, [page, count, lastPage, firstPage, pageGroup, render])

  const [categories, setCategories] = useState<string[]>([''])
  const categoryCreator = useCallback(() => {
    const tempCategories: string[] = []
    userQuotes?.forEach((item) => {
      tempCategories.push(item.category)
    })
    const dedupeCategories = [...new Set(tempCategories)]
    setCategories(dedupeCategories)
  }, [userQuotes])

  useEffect(() => {
    categoryCreator()
  }, [categoryCreator])

  if (!userQuotes)
    return (
      <h2 className="border inline-block p-[2em] relative left-[50%] translate-x-[-50%] mt-[8em] text-[1.25em] rounded-[10px] shadow-[5px_10px_10px_0_rgba(0,0,0,0.5)] bg-gradient-to-tr from-orange-50 to-white">
        추가된 게시글이 없습니다.
      </h2>
    )
  return (
    <>
      <section className="mt-[3em] text-center min-h-[630px]">
        {categories?.map((category) => {
          return (
            <button
              key={category}
              className="border rounded-[2em] py-[3px] px-[10px] bg-[tomato] text-white m-[3px]"
            >
              {category}
            </button>
          )
        })}
        {userQuotes?.map((item) => {
          return <MyQuoteCard key={item.id} item={item} />
        })}
      </section>
      <Pagination
        limit={limit}
        page={page}
        pageList={pageList}
        setPage={setPage}
      />
    </>
  )
}
