'use client'

import useInfiniteScroll from '@/custom/useInfiniteScroll'

import ReplaceMessageCard from '@/components/UI/common/card/ReplaceMessageCard'
import ListLoadMoreButton from '@/components/UI/common/button/ListLoadMoreButton'
import Title from '@/components/UI/common/Title/Title'
import QuoteCategoryList from '@/components/UI/quote/list/QuoteCategoryList'
import ErrorMessage from '@/components/UI/message/ErrorMessage'
import EmptyMessage from '@/components/UI/message/EmptyMessage'


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

    if (metadata.totalCount < 1) {
        return (
            <>
                <Title current={itemCount} total={metadata.totalCount} title='사용자 명언' />
                <EmptyMessage title='현재 작성된 명언이 없습니다.' message='생각나는 명언을 작성해주세요!' />
            </>
        )
    } else {
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
}
