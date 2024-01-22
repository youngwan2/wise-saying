export const dynamic = 'force-dynamic'

import TodayQuotelist from '@/components/UI/list/TodayQuoteList'
import { todayQuoteFetch } from '@/api/data/get'

export default async function Home() {
  const items = await todayQuoteFetch()

  return (
    <section className="w-[100%] pt-[15px]">
      <TodayQuotelist quotes={items} />
    </section>
  )
}
