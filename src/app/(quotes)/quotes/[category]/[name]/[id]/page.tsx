
import ReplaceMessageCard from '@/components/UI/common/ReplaceMessageCard'
import DetailPageControlButtons from '@/components/UI/detail-quote/DetailPageControlButtons'
import Comment from '@/components/UI/comment/Comment'
import { openDB } from '@/utils/connect'
import ShareButtons from '@/components/UI/detail-quote/ShareButtons'
import { headers } from 'next/headers'
import DetailQuote from '@/components/UI/quote/DetailQuote'
import QuoteLikeBox from '@/components/UI/detail-quote/QuoteLikeBox'
import { config } from '@/configs/config.url'
import RecommandQuote from '@/components/UI/detail-quote/RecommandQuote'


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

  async function getQuoteDetail(id: string) {
    'use server'
    try {
      const db = await openDB()
      const result = await db.query(query, [id, decodeURIComponent(name)])
      const item = result.rows[0]

      return item
    } catch (error) {
      console.error(
        '/app/(quotes)/quotes/[category]/[name]/[id]/page.tsx',
        error,
      )
      return false
    }
  }

  async function getRecommandQuote() {
    const url = `${config.apiPrefix}${config.apiHost}/api/quotes/today?random-count=10`
    const response = await fetch(url)
    const { items, success } = await response.json()

    if (success) return items
    return false
  }


  const item = await getQuoteDetail(id)
  const recommandItems = await getRecommandQuote()


  if (!item || !recommandItems) return <ReplaceMessageCard childern="데이터를 조회중 입니다.." />


  return (
    <article className="sm:p-[4em] p-[1em]  min-h-[100vh] h-full  mx-auto my-[3em]  perspective-500 flex flex-col max-w-[1300px] relative">

      {/* 명언 텍스트 영역 */}
      <DetailQuote item={item} />
      <QuoteLikeBox id={id} textColor={'text-black'} />
      <div className="flex">
        {/* 컨트롤 버튼 */}
        <DetailPageControlButtons item={item} isUserQuote={type === 'user' ? true : false} />
        {/* 공유 버튼 */}
        <ShareButtons />
      </div>

      {/* 댓글 영역 */}
      <Comment id={id} />

      {/* 추천 명언 */}
      <RecommandQuote recommandItems={recommandItems} />

    </article>
  )
}

