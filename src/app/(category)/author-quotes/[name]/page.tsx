export const dynamic = 'force-dynamic'

import AuthorQuotesCard from '@/components/UI/card/AuthorQuotesCard'
import { getQuotesBy } from '@/services/item.get'
import { HiUserGroup } from 'react-icons/hi'
import type { ItemsType } from '@/types/items.types'
import type { Metadata} from 'next'



type Props = {
  params: {name: string},
}


export async function generateMetadata(
  {params} : Props,
) : Promise<Metadata> {

  const name = params.name
  const items = await getQuotesBy(name)

  return {
    title: items[0].author + "의 명언 | My wise saying",
    description: items[0]+"의 명언 모음"
  }
}


export default async function AuthorPage({
  params,
}: {
  params: { name: string },
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
