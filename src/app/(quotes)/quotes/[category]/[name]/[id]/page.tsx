import { headers } from 'next/headers'

import Comment from '@/components/UI/comment/Comment'
import ReplaceMessageCard from '@/components/UI/common/card/ReplaceMessageCard'
import DetailPageControlButtons from '@/components/UI/detail-quote/button/DetailPageControlButtons'
import DetailQuoteContent from '@/components/UI/quote/content/DetailQuoteContent'
import QuoteLikeButton from '@/components/UI/detail-quote/button/QuoteLikeButton'
import ShareContainer from '@/components/UI/detail-quote/ShareContainer'
import RecommandQuoteList from '@/components/UI/detail-quote/RecommandQuoteList'

import { config } from '@/configs/config.url'
import { openDB } from '@/utils/connect'


const userCardSelectQuery = `
SELECT user_quote_id AS quote_id , quote, author, A.created_at AS created_at, category, email, nickname, profile_img_url
FROM user_quotes A
JOIN users B ON A.user_id = B.user_id
WHERE user_quote_id = $1 AND author = $2`

const adminCardSelectQuery = `
SELECT quote_id, quote, author, job, created_at, category
FROM quotes A
INNER JOIN authors B ON A.author_id = B.author_id
WHERE quote_id = $1 AND author = $2`



export default async function DetailPage({
  params,
}: {
  params: { category: string; name: string; id: string }
}) {
  const { name, id } = params


  const type = headers()?.get('x-path-type') || ''
  const query = type !== 'no-user' ? userCardSelectQuery : adminCardSelectQuery

  /** GET | 명언 조회 */
  async function getQuoteDetail(id: string) {
    'use server'
    try {
      const db = await openDB()
      const result = await db.query(query, [id, decodeURIComponent(name)])
      const item = result.rows[0]

      return item
    } catch (error) {
      console.error(
        '명언 정보를 읽어오지 못함:',
        error,
      )
      return false
    }
  }

  /** GET | 추천명언 조회 */
  async function getRecommandQuote() {
    const url = `${config.apiPrefix}${config.apiHost}/api/quotes/today?random-count=10`
    try {
      const response = await fetch(url)
      const { items, success } = await response.json()
      if (success) return items

    } catch (error) {
      console.error('추천명언을 가져오지 못함:', error)
      return false
    }
  }

  const item = await getQuoteDetail(id)
  const recommandItems = await getRecommandQuote() || []


  if (!item || !recommandItems) return <ReplaceMessageCard childern="데이터를 불러오는 중입니다." />
  return (
    <article className="sm:p-[4em] p-[1em]  min-h-[100vh] h-full  mx-auto my-[3em]  perspective-500 flex flex-col max-w-[1300px] relative">

      {/* 명언 텍스트 영역 */}
      <DetailQuoteContent item={item} />
      {/* 좋아요 버튼 */}
      <QuoteLikeButton id={id} textColor={'text-black'} />
      <div className="flex">
        {/* 컨트롤 버튼 */}
        <DetailPageControlButtons item={item} isUserQuote={type === 'user' ? true : false} />
        {/* 공유 */}
        <ShareContainer />
      </div>

      {/* 댓글 영역 */}
      <Comment id={id} />

      {/* 추천 명언 */}
      <RecommandQuoteList recommandItems={recommandItems} />

    </article>
  )
}

