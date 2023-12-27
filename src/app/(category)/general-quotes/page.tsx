
import type { Metadata } from 'next'
import EtcCategoryCard from '@/components/UI/EtcCategoryCard'
import { getGeneralQuotesCategoryFromDB } from '@/services/item.services'
import { HiHeart } from 'react-icons/hi'

export const metadata: Metadata = {
  title: "그 외 명언 | My wise saying",
  description: "그 외 다양한 명언에 대한 카테고리를 모아둔 페이지 입니다."
}

export interface CategoryType {
  id: number
  category: string
}
export default async function GeneralPage() {
  const categories: CategoryType[] = await getGeneralQuotesCategoryFromDB()
  return (
    <section >
      <h2 className="flex items-center text-[1.5em] p-[10px]" >
        <span className="bg-[#ffae00] p-[1.5px] rounded-[5px] mx-[5px]">
          <HiHeart color="white" />
        </span>
        그 외 명언({categories.length})
      </h2>
      <EtcCategoryCard categories={categories} />
    </section>
  )
}
