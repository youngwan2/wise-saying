export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import EtcCategoryList from '@/components/UI/list/EtcCategoryList'
import { getCategoriesFromDb } from '@/api/data/get'

export const metadata: Metadata = {
  title: '그 외 명언 | My wise saying',
  description: '그 외 다양한 명언에 대한 카테고리를 모아둔 페이지 입니다.',
}

export interface CategoryType {
  id: number
  category: string
}
export default async function EtcPage() {
  const categories: CategoryType[] = await getCategoriesFromDb('/api/items/etc')
  const itemCount = categories?.length || 0
  return (
    <section>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        그 외 명언({itemCount})
      </h2>
      <EtcCategoryList categories={categories} />
    </section>
  )
}
