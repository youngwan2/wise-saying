export const dynamic = 'force-dynamic'
import { getGeneralQuotesCategoryFromDB } from "@/services/item.services"
import EtcCard from "@/components/UI/EtcCard"
import type { CategoryType } from "../page"
import type { Metadata, ResolvedMetadata } from "next"
import { getEtcQuotesBy } from "@/services/item.services"
import { ItemsType } from "@/types/items.types"
import { HiHeart } from "react-icons/hi"



type Props = {
  params: {category: string},
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  {params, searchParams} : Props
) : Promise<Metadata> {

  
  const category = decodeURIComponent(params.category)
  
  return {
    title:`${category} | My wise saying`,
    description: category+"관련 명언 모음"
  }
}

export default async function EtcQuotesPage({ params }: { params: { category: string } }) {
  const category = params.category
  const decodingCategory = decodeURIComponent(category)
  const items:ItemsType[] = await getEtcQuotesBy(category)
  const itemCount = items.length
  return (
    <section >
      <h2 className="flex items-center text-[1.5em] p-[10px] ">
        <span className="bg-[#ffae00] p-[1.5px] rounded-[5px] mx-[5px]"><HiHeart color="white" /></span>{decodingCategory}({itemCount})</h2>
        <EtcCard items={items} />
    </section>
  )
}
