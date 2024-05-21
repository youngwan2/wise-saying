import { useRef } from 'react'

import QuoteCard from '../card/QuoteCard'

import { ItemsType } from '@/types/items.types'


interface PropsType {
    items: ItemsType[]
}

export default function QuoteList({ items }: PropsType) {

    const ulRef = useRef<HTMLUListElement>(null)

    return (
        <ul
            ref={ulRef}
            className={`${items.length < 2 ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}
            mt-[1em] pt-[2em] grid  md:grid-cols-2 grid-cols-1 place-content-center w-full perspective-500 transform-style-3d`}
        >
            {items.map((item, i) => {
                return <QuoteCard key={item.quote_id} index={i} item={item} items={items} />
            })}
        </ul>
    )
}