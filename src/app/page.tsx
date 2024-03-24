export const dynamic = 'force-dynamic'

import ReplaceMessageCard from '@/components/UI/common/ReplaceMessageCard'
import HomeMenu from '@/components/UI/home/HomeMenu'
import TodayQuotelist from '@/components/UI/quote/TodayQuoteList'
import { getTodayQuotesFromDb } from '@/services/data/get'

export default async function Home() {
  
  const items = (await getTodayQuotesFromDb()) || []

  if (!items)
    return <ReplaceMessageCard childern="데이터를 불러오는데 실패하였습니다." />
  if (items.length < 1)
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다.." />
  return (
    <>
      <TodayQuotelist quotes={items} />
      <HomeMenu />
    </>
  )
}
