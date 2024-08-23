'use client'

import useInfiniteScroll from '@/custom/useInfiniteScroll'

import ReplaceMessageCard from '@/components/UI/common/card/ReplaceMessageCard'
import ListLoadMoreButton from '@/components/UI/common/button/ListLoadMoreButton'
import Title from '@/components/UI/common/Title/Title'
import QuoteCategoryList from '@/components/UI/quote/list/QuoteCategoryList'
import ErrorMessage from '@/components/UI/message/ErrorMessage'


interface PropsType {
    metadata: {
        totalCount: number
        maxPage: number
    }
}

export default function UserQuoteCategoryContainer({ metadata }: PropsType) {
    const {
        items: categories,
        itemCount,
        size,
        isLoadingMore,
        setSize,
        isLoading,
        error
    } = useInfiniteScroll({ mainPath: 'users', type: 'category' })

    if (error)
        return <ErrorMessage />
    if (isLoading || !categories)
        return <ReplaceMessageCard>데이터를 불러오는 중 입니다.</ReplaceMessageCard>
    return (
        <>
            <Title current={itemCount} total={metadata.totalCount} title='사용자 명언' />
            <QuoteCategoryList items={categories} />
            <ListLoadMoreButton
                size={size}
                maxPage={metadata.maxPage}
                isLoadingMore={isLoadingMore}
                onClick={() => {
                    setSize(size + 1)
                }}
            />
        </>
    )
}
