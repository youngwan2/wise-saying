export const dynamic = 'force-dynamic'

import { getItemFromDB } from '@/services/item.services'
import AuthorsCard from '@/components/UI/AuthorsCard'
import { HiUserGroup } from 'react-icons/hi'

export default async function AuthorPage() {
  const items = await getItemFromDB('authors')

  return (
    <section>
      <h2 className="flex items-center text-[1.5em] p-[10px] ">
        <span className="bg-[#ffae00] p-[2.3px] rounded-[5px] mx-[2px]">
          <HiUserGroup color="white" />
        </span>
        인물별 명언
      </h2>
      <AuthorsCard items={items} />
    </section>
  )
}
