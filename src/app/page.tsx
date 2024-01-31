export const dynamic = 'force-dynamic'

import TodayQuotelist from '@/components/UI/quote/TodayQuoteList'
import { todayQuoteFetch } from '@/services/data/get'

export default async function Home() {
  const items = await todayQuoteFetch()

  return (
    <section className="w-[100%] pt-[15px]">
      <TodayQuotelist quotes={items} />
    </section>
  )
}
