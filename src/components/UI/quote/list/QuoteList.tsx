import QuotesCardControlButtons from '../button/QuoteCardControlButtons'
import UserQuotesCardControlButtons from '../button/UserQuoteCardBtnContainer'
import QuoteCommentationButton from '../button/QuoteCommentationButton'
import QuoteCard from '../card/QuoteCard'

import type { QuoteType } from '@/types/items.types'
import { Handlers} from '../container/QuoteContainer'

interface PropsType {
    items: QuoteType[]
    eventHandlerGroup: (author: string, quoteId: number, isUser?:boolean) => Handlers
    hasUserQuotePage: boolean
}

export default function QuoteList({ items, eventHandlerGroup,  hasUserQuotePage }: PropsType) {

    return (
        <ul
            className={`${items.length < 2 ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}
            mt-[1em] pt-[2em] grid  md:grid-cols-2 grid-cols-1 place-content-center w-full perspective-500 transform-style-3d`}
        >
            {items.map((item, i) => {
                const {  quote_id: quoteId, author } = item
                return (
                    <QuoteCard
                        key={item.quote_id}
                        index={i}
                        item={item}
                        items={items}
                        eventHandlerGroup={eventHandlerGroup(author,  quoteId, hasUserQuotePage)}
                    >

                        <QuoteCommentationButton onClick={eventHandlerGroup(author, quoteId, hasUserQuotePage).onClickGetCommentationInfo} />
                        {hasUserQuotePage
                            ? <UserQuotesCardControlButtons index={i} item={item} />
                            : <QuotesCardControlButtons index={i} item={item} />

                        }
                    </QuoteCard>
                )
            })}
        </ul>
    )
}

