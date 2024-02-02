
export const dynamic = 'force-dynamic'

import TodayQuotelist from '@/components/UI/quote/TodayQuoteList'
import { todayQuoteFetch } from '@/services/data/get'

export default async function Home() {
  const items = await todayQuoteFetch()

  return (
      <TodayQuotelist quotes={items} />
  )
}
