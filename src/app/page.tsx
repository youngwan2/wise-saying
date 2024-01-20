export const dynamic = 'force-dynamic'

import TodayQuotelist from '@/components/UI/list/TodayQuoteList'

export default async function Home() {
  const todayQuoteFetch = async () => {
    const response = await fetch('http://localhost:3000/api/items/random', {
      next: { revalidate: 3600 },
    })
    const items = await response.json()

    return items
  }

  const items = await todayQuoteFetch()

  return (
    <section className="w-[100%] pt-[15px]">
      <TodayQuotelist quotes={items} />
    </section>
  )
}