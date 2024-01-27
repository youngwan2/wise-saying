import { ItemsType } from '@/types/items.types'
import QuotesCardCommonButton from './QuotesCardCommonButton'

export interface PropsType {
  item: ItemsType
  index: number | 0
}

export default function QuotesCardButton({ index, item }: PropsType) {
  return (
    <article
      aria-label="꾸미기,담기, 확대, 듣기 버튼의 컨테이너"
      className="absolute top-0 right-0 justify-center items-center flex"
    >
      <QuotesCardCommonButton item={item} index={index} />
    </article>
  )
}
