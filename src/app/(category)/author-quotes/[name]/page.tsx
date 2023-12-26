export const dynamic = 'force-dynamic'

import AuthorQuotesCard from '@/components/UI/AuthorQuotesCard'
import { getQuotesBy } from '@/services/item.services'
import { HiUserGroup } from 'react-icons/hi'
import type { ItemsType } from '@/types/items.types'

export default async function AuthorPage({
  params,
}: {
  params: { name: string }
}) {
  const pathName = params.name
  const items: ItemsType[] = await getQuotesBy(pathName)
  const itemCount = items.length
  return (
    <section>
      <h2 className="flex items-center text-[1.5em] p-[5px] mb-[1em] ">
        <span className="bg-[gold] p-[1.5px] rounded-[5px] m-[10px]">
          <HiUserGroup />
        </span>
        {items[0].author}의 명언({itemCount})
      </h2>
      <AuthorQuotesCard items={items} />
    </section>
  )
}
