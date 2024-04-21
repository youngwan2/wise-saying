export const dynamic = 'force-dynamic'
import ReplaceMessageCard from '@/components/UI/common/ReplaceMessageCard'
import HomeMenu from '@/components/UI/home/HomeMenu'
import TodayQuotelist from '@/components/UI/quote/TodayQuoteList'
import { getTodayQuotesFromDb } from '@/services/data/get'

export default async function Home() {
  
  const items = (await getTodayQuotesFromDb()) || []

  if (!items)
    return <ReplaceMessageCard />
  return (
    <>
      <TodayQuotelist quotes={items} />
      <HomeMenu />
    </>
  )
}
