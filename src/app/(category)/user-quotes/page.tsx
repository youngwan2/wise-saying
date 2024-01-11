export const dynamic = 'force-dynamic'

import type { Metadata } from "next"
import { getItemFromDB } from "@/services/item.get"
import UserPageContainer from "@/components/UI/container/UserPageContainer"

export const metadata: Metadata = {
  title: '사용자 명언 | My wise saying',
  description: "사용자가 직접 작성한 명언을 모아둔 페이지 입니다."
}

export default async function UserPage() {

  const items = await getItemFromDB('users')

    return (
      <UserPageContainer items={items} />
    )
  }

