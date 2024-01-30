import { HiArchiveBoxXMark } from 'react-icons/hi2'
import ReplaceMessageCard from '../card/ReplaceMessageCard'
import { useRouter, useSearchParams } from 'next/navigation'

interface PropsType {
  items: {
    byAuthor: {
      id: number
      quote: string
      author: string
    }[]
    byKeyword: {
      id: number
      quote: string
      author: string
    }[]
    byAuthorCount: number
    byKeywordCount: number
  }
}
export default function SearchResultAllList({ items }: PropsType) {
  const searchText = useSearchParams().get('searchText')
  const router = useRouter()

  if (!items)
    return <ReplaceMessageCard childern="데이터를 가져오는 중입니다." />

  const byAuthorItems = items.byAuthor ?? []
  const byKeywordItems = items.byKeyword ?? []

  const authorResultCount = items.byAuthor?.length ?? 0
  const keywordResultCount = items.byKeyword?.length ?? 0

  const authorResultTotal = items.byAuthorCount ?? 0
  const keywordResultTotal = items.byKeywordCount ?? 0


  return (
    <>
      <section className="bg-[#e3dddd12] max-w-[730px] mx-auto rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] p-[2px] mt-[1.5em]">
        {/* 저자별 */}
        <article className="max-w-[680px] mx-auto my-[2em]">
          <div className="border-b-[2px] border-[white] flex items-center justify-between text-white">
            <h3 className=" py-[5px] text-[1.15em] ">
              <span className="text-[white] flex items-center  ">
                <HiArchiveBoxXMark className="mr-[3px]" /> 저자별 검색
              </span>
            </h3>
            <span aria-label="검색결과 안내 메시지" className="text-[14px]">
              <strong className="border-b-[1px] border-[tomato]">
                {searchText}
              </strong>{' '}
              로 조회된 결과{' '}
              <b className="border-b-[1px] border-[tomato]">
                {authorResultTotal}
              </b>
              건 중 상위{' '}
              <b className="border-b-[1px] border-[tomato]">
                {authorResultCount}
              </b>{' '}
              건{' '}
            </span>
          </div>
          <ul>
            {byAuthorItems.length < 1 && (
              <p className="min-h-[50px] py-[10px] text-white">
                검색된 결과가 존재하지 않습니다.
              </p>
            )}
            {byAuthorItems.map((item) => {
              return (
                <li
                  onClick={() => {
                    router.push(`/quotes/authors/${item.author}/${item.id}`)
                  }}
                  key={item.id}
                  className="flex p-[5px] py-[10px] min-h-[50px] border-b-[1px] border-dashed text-white items-center hover:bg-[#ffffff3c] hover:cursor-pointer"
                >
                  <p className="mr-[5px] w-[80%]">{item.quote}</p>
                  <span className=" w-[20%]">{item.author}</span>
                </li>
              )
            })}
          </ul>
        </article>

        {/* 키워드 */}
        <article className="max-w-[680px] mx-auto my-[2em]">
          <div className="border-b-[2px] border-[white] flex items-center justify-between text-white">
            <h3 className=" py-[5px] text-[1.15em] ">
              <span className="text-[white] flex items-center  ">
                <HiArchiveBoxXMark className="mr-[3px]" /> 키워드 검색
              </span>
            </h3>
            <span aria-label="검색결과 안내 메시지" className="text-[14px]">
              <strong className="border-b-[1px] border-[tomato]">
                {searchText}
              </strong>{' '}
              로 조회된 결과{' '}
              <b className="border-b-[1px] border-[tomato]">
                {keywordResultTotal}
              </b>
              건 중 상위{' '}
              <b className="border-b-[1px] border-[tomato]">
                {keywordResultCount}
              </b>{' '}
              건{' '}
            </span>
          </div>
          <ul>
            {byKeywordItems.length < 1 && (
              <p className="min-h-[50px] py-[10px] text-white">
                검색된 결과가 존재하지 않습니다.
              </p>
            )}
            {byKeywordItems.map((item) => {
              return (
                <li
                  onClick={() => {
                    router.push(`/quotes/authors/${item.author}/${item.id}`)
                  }}
                  key={item.id}
                  className="flex p-[5px] min-h-[50px] border-b-[1px] border-dashed text-white items-center hover:bg-[#ffffff3c] hover:cursor-pointer"
                >
                  <p className="mr-[5px] w-[80%]">{item.quote}</p>
                  <span className=" w-[20%]">{item.author}</span>
                </li>
              )
            })}
          </ul>
        </article>
      </section>
    </>
  )
}
