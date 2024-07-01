import QuotesCardControlButtons from '../button/QuoteCardControlButtons'
import UserQuotesCardControlButtons from '../button/UserQuoteCardBtnContainer'
import QuoteCommentationButton from '../button/QuoteCommentationButton'
import QuoteCard from '../card/QuoteCard'

import type { QuoteType } from '@/types/items.types'
import { Handlers, TtsType } from '../container/QuoteContainer'




interface PropsType {
    items: QuoteType[]
    eventHandlerGroup:(author:string, quote:string, quoteId:number)=>Handlers
    ttsInfos: TtsType
    hasUserQuotePage:boolean
}

export default function QuoteList({ items, eventHandlerGroup, ttsInfos, hasUserQuotePage }: PropsType) {

 


    return (
        <ul
            className={`${items.length < 2 ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}
            mt-[1em] pt-[2em] grid  md:grid-cols-2 grid-cols-1 place-content-center w-full perspective-500 transform-style-3d`}
        >
            {items.map((item, i) => {
                const { quote, quote_id: quoteId, author } = item
                return (
                    <QuoteCard
                        key={item.quote_id}
                        index={i}
                        item={item}
                        items={items}
                        eventHandlerGroup={eventHandlerGroup(author, quote, quoteId)}
                        ttsInfos={ttsInfos}
                    >
                        {hasUserQuotePage
                            ? <UserQuotesCardControlButtons index={i} item={item} />
                            :
                            <>
                                <QuoteCommentationButton onClick={eventHandlerGroup(author, quote, quoteId).onClickGetCommentationInfo} />
                                <QuotesCardControlButtons index={i} item={item} />
                            </>
                        }
                    </QuoteCard>
                )
            })}
        </ul>
    )
}

