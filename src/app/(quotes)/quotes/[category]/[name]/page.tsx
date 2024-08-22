import AuthorQuotePageContainer from "../../_components/AuthorQuotePageContainer"
import ErrorMessage from "@/components/UI/message/ErrorMessage"

import { Target, getQuoteMetadata } from "@/services/data/metadata/metadata"


interface PropsType {
  params: {
    category:  "users" | "topics" | "authors"
    name: string
    birth: string
    intro: string
  }
}

export default async function AuthorPage({ params }: PropsType) {

  const { name, category } = params

  const type = category === 'topics'
    ? Target.QUOTE_TOPIC
    : Target.QUOTE_AUTHOR

  const metadata = await getQuoteMetadata({ type, category: name, totalLimit: 30 })

  if (!metadata) return <ErrorMessage title='카테고리 메타데이터 조회 실패' message='카테고리 메타데이터 조회에 실패하였습니다. 일시적인 문제일 수 있으므로 나중에 다시시도 해주세요.' />
  return <AuthorQuotePageContainer params={params} metadata={metadata} />
}
