import UserQuotePageContainer from '../_components/UserQuotePageContainer'
import ErrorMessage from '@/components/UI/message/ErrorMessage'

import { getQuoteMetadata } from '@/services/quotes/metadata'
import { Target } from '@/types/metadata.types'

export default async function UserQuoteCategoryPage({ params }: { params: Promise<{ category: string }> }) {

  const metadata = await getQuoteMetadata({ type: Target.USER_QUOTE, category: (await params)?.category ||'' })
  if (!metadata) return <ErrorMessage title='카테고리 메타데이터 조회 실패' message='카테고리 메타데이터 조회에 실패하였습니다. 일시적인 문제일 수 있으므로 나중에 다시시도 해주세요.' />
  
  return (
    <UserQuotePageContainer params={await params} metadata={metadata}  />
  )
}
