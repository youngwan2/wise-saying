import EtcCard from "@/components/UI/EtcCard"
import { getEtcQuotesBy } from "@/services/item.services"
import { ItemsType } from "@/types/items.types"
import { HiHeart } from "react-icons/hi"

export default async function EtcQuotesPage({ params }: { params: { category: string } }) {
  const category = params.category
  const decodingCategory = decodeURIComponent(category)
  const items:ItemsType[] = await getEtcQuotesBy(category)

  return (
    <section >
      <h2 className="flex items-center text-[1.5em] p-[10px] ">
        <span className="bg-[#ffae00] p-[1.5px] rounded-[5px] mx-[5px]"><HiHeart color="white" /></span>{decodingCategory}</h2>
        <EtcCard items={items} />
    </section>
  )
}
