import ErrorMessage from '@/components/UI/message/ErrorMessage'
import UserQuoteCategoryContainer from './_components/UserQuoteCategoryContainer'

import { Target, getQuoteMetadata } from '@/services/data/metadata/metadata'

export default async function UserPage() {

  const metadata = await getQuoteMetadata({ type: Target.USER_QUOTE_CATEGORY_ALL })
  
  if (!metadata) return <ErrorMessage title='카테고리 메타데이터 조회 실패' message='카테고리 메타데이터 조회에 실패하였습니다. 일시적인 문제일 수 있으므로 나중에 다시시도 해주세요.' />
  return <UserQuoteCategoryContainer metadata={metadata} />
}
