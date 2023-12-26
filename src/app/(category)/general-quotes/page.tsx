import EtcCategoryCard from '@/components/UI/EtcCategoryCard'
import { getGeneralQuotesCategoryFromDB } from '@/services/item.services'
import { HiHeart } from 'react-icons/hi'

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
