import { useCallback, useEffect, useState } from 'react'
import MypageUserQuoteCard from './MypageMyQuoteCard'
import Pagination from '../common/Pagination'
import MypageQuotesCategoryCard from './MypageMyQuotesCategoryCard'

interface PropsType {
  page: number
  setPage: (p: number) => void
  userQuotes: {
    id: number
    quote: string
    author: string
    category: string
  }[]
  count: number
}

const MAX_RENDER_PAGE = 5

export default function MypageMyQuotesList({
  userQuotes,
  setPage,
  page,
  count,
}: PropsType) {

  interface UserQuotesType {
    id: number;
    quote: string;
    author: string;
    category: string;
  }
  const [selectedUserQuotes, setSelectedUserQuotes] = useState<UserQuotesType[]>([])


  const [limit, setLimit] = useState(0)
  const [firstPage, setFirstPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)
  const [pageGroup, setPageGroup] = useState(1)
  const [categories, setCategories] = useState<string[]>([''])
  const [pageList, setPageList] = useState<number[]>([])

  // 페이지네이션 렌더러
  const render = useCallback(() => {
    const pageList: number[] = []
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i)
    }
    setPageList(pageList)
  }, [firstPage, lastPage])

  // 페이지 네이션 상태 초기 셋팅
  useEffect(() => {
    setPageGroup(Math.ceil((page + 1) / MAX_RENDER_PAGE)) // 1. 페이지 그룹 구하기
    setLimit(Math.ceil(count / MAX_RENDER_PAGE)) // 2. 페이지 렌더링 제한 값 구하기
    setFirstPage(lastPage - (MAX_RENDER_PAGE - 1)) // 3. 첫 페이지 구하기
    setLastPage(pageGroup * MAX_RENDER_PAGE) // 4. 마지막 페이지 구하기
    render() // 5. 페이지네이션 그려주기
  }, [page, count, lastPage, firstPage, pageGroup, render])

  // 명언 카테고리를 필터해서 카테고리 목록을 상태에 저장
  const categoryCreator = useCallback(() => {
    const tempCategories: string[] = []

    userQuotes?.forEach(item => tempCategories.push(item.category))
    const dedupeCategories = [...new Set(tempCategories)]
    setCategories(dedupeCategories)
  }, [userQuotes])



  // 명언 필터기
  const onClickQuotesFilter = (category: string = 'all') => {
    const result = userQuotes.filter((userQuote) => {
      if (category === 'all') {
        return userQuote
      }
      return userQuote.category === category
    })
    setSelectedUserQuotes(result)
  }

  useEffect(() => {
    categoryCreator()
  }, [categoryCreator])

  if (!userQuotes || userQuotes.length < 1)
    return (
      <h2 className="border inline-block p-[2em] relative left-[50%] translate-x-[-50%] mt-[8em] text-[1.25em] rounded-[10px] shadow-[5px_10px_10px_0_rgba(0,0,0,0.5)] bg-gradient-to-tr from-orange-50 to-white">
        추가된 게시글이 없습니다.
      </h2>
    )
  return (
    <>
      <ul className="mt-[3em] text-center min-h-[630px]">
        <li tabIndex={0} aria-label='전체 명언 보기' onClick={() => { onClickQuotesFilter('all') }}
          className="hover:cursor-pointer hover:bg-[white] hover:text-black inline-block border rounded-[2em] py-[3px] px-[10px] bg-[tomato] text-white m-[3px]"
        > 전체 </li>
        {categories.map((category) => {
          return (
            <MypageQuotesCategoryCard key={category} category={category}  onClickQuotesFilter={() => {
              onClickQuotesFilter(category)
            }} />
          )
        })}
        {selectedUserQuotes.map((item) => {
          return <MypageUserQuoteCard key={item.id} item={item} />
        })}
      </ul>
      <Pagination
        limit={limit}
        pageList={pageList}
        page={page}
        setPage={setPage}
      />
    </>
  )
}
