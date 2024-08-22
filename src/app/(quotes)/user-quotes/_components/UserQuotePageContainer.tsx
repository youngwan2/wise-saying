"use client"

import useInfiniteScroll from "@/custom/useInfiniteScroll"

import Title from "@/components/UI/common/Title/Title"
import ListLoadMoreButton from "@/components/UI/common/button/ListLoadMoreButton"
import ReplaceMessageCard from "@/components/UI/common/card/ReplaceMessageCard"
import QuoteContainer from "@/components/UI/quote/container/QuoteContainer"
import ErrorMessage from "@/components/UI/message/ErrorMessage"



interface PropsType {
    params?: { category: string }
    metadata: {
        totalCount: number
        maxPage: number
    }
}

export default function UserQuotePageContainer({ metadata, params }: PropsType) {

    const pathName: string = params ? decodeURIComponent(params.category) : ''
    const {
        items,
        size,
        setSize,
        isLoadingMore,
        itemCount,
        isLoading,
        error } = useInfiniteScroll({mainPath:'users', subPath: pathName, type: 'quote' })

    if (error) return <ErrorMessage />
    if (isLoading || !items) return <ReplaceMessageCard children="데이터를 불러오는 중입니다.." />
    return (
        <>
            <Title current={itemCount} total={metadata.totalCount} title={pathName + ' 명언'} />
            <QuoteContainer items={items} />
            <ListLoadMoreButton
                size={size}
                onClick={() => setSize(size + 1)}
                maxPage={metadata.maxPage}
                isLoadingMore={isLoadingMore}
            />
        </>
    )
}