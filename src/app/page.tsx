export const dynamic = 'force-dynamic'

import ReplaceMessageCard from '@/components/UI/common/card/ReplaceMessageCard'
import HomeMenu from '@/components/UI/home/HomeMenu'
import TodayQuoteContainer from '@/components/UI/quote/container/TodayQuoteContainer'
import { getTodayQuotesFromDb } from '@/services/quotes/quotes.service'


const randomCount = 5
export default async function Home() {

  const { items } = (await getTodayQuotesFromDb(randomCount)) || []

  if (!items) return <ReplaceMessageCard isFull></ReplaceMessageCard>
  if (items.length < 1) return <ReplaceMessageCard isFull>데이터를 불러오는 중입니다.</ReplaceMessageCard>
  return (
    <>
      <TodayQuoteContainer quotes={items} />
      <HomeMenu />
    </>
  )
}
