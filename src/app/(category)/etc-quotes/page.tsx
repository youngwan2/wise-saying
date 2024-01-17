
import type { Metadata } from 'next'
import EtcCategoryList from '@/components/UI/list/EtcCategoryList'
import { getGeneralQuotesCategoryFromDB } from '@/services/item.get'
import { HiHeart } from 'react-icons/hi'

export const metadata: Metadata = {
  title: "그 외 명언 | My wise saying",
  description: "그 외 다양한 명언에 대한 카테고리를 모아둔 페이지 입니다."
}

export interface CategoryType {
  id: number
  category: string
}
export default async function EtcPage() {
  const categories: CategoryType[] = await getGeneralQuotesCategoryFromDB()
  const itemCount = categories?.length || 0
  return (
    <section >
      <h2 className="flex items-center text-[1.5em] p-[10px]">
        <span className="bg-[#ffae00] p-[2.3px] rounded-[5px] mx-[2px]">
          <HiHeart color="white" />
        </span>
        그 외 명언({itemCount})
      </h2>
      <EtcCategoryList categories={categories} />
    </section>
  )
}
