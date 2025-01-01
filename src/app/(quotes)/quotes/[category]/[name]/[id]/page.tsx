import { headers } from 'next/headers'

import Comment from '@/components/UI/comment/Comment'
import ReplaceMessageCard from '@/components/UI/common/card/ReplaceMessageCard'
import DetailPageControlButtons from '@/components/UI/detail-quote/button/DetailPageControlButtons'
import DetailQuoteContent from '@/components/UI/quote/content/DetailQuoteContent'
import QuoteLikeButton from '@/components/UI/detail-quote/button/QuoteLikeButton'
import ShareContainer from '@/components/UI/detail-quote/ShareContainer'
import RecommendQuoteList from '@/components/UI/detail-quote/RecommendQuoteList'

import { config } from '@/configs/config.url'
import { getQuoteDetail } from '@/services/quotes/quote-detail.service'




export default async function DetailPage({
  params,
}: {
  params: Promise<{ name: string, id: string }>
}) {
  const { name, id } = await params
  const type = (await headers())?.get('x-path-type') || ''


  /** GET | 추천명언 조회 */
  async function getRecommendQuote() {
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

  const item = await getQuoteDetail(id, name, type)
  const recommendItems = await getRecommendQuote() || []


  if (!item || !recommendItems) return <ReplaceMessageCard>데이터를 불러오는 중입니다.</ReplaceMessageCard>
  return (
    <section className="sm:p-[4em] p-[1em]  min-h-[100vh] h-full  mx-auto my-[3em]  perspective-500 flex flex-col max-w-[1300px] relative">
      <DetailQuoteContent item={item} />  {/** 명언 콘텐츠 */}
      <QuoteLikeButton id={id} textColor={'text-black'} />  {/** 좋아요 버튼 */}
      <div className="flex">
        <DetailPageControlButtons item={item} isUserQuote={type === 'user' ? true : false} />  {/** 듣기, 확대, 꾸미기 버튼*/}
        <ShareContainer /> {/** 공유 버튼 */}
      </div>

      <Comment id={id} /> {/** 댓글 */}
      <RecommendQuoteList recommendItems={recommendItems} /> {/** 추천 명언 목록 */}
    </section>
  )
}

