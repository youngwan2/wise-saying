"use client"

import { useSwrFetch } from "@/utils/swr"
import useAdmin from "@/custom/useAdmin"
import { ChangeEvent, useState } from "react"

import Title from "@/components/UI/common/Title/Title"
import NoticeFilterList from "./NoticeFilterList"
import NoticeWriteLink from "./NoticeWriteLink"
import NoticeList from "./NoticeList"
import LibPagination from "@/components/UI/pagination/LibPagination"
import ErrorMessage from "@/components/UI/message/ErrorMessage"
import LoadingMessage from "@/components/UI/message/LoadingMessage"

import { config } from "@/configs/config.url"

import type { NoticeType } from "../_types/notice.types"
import { NextUIProvider } from "@nextui-org/system"




const MAX_SIZE = 10
export default function NoticePageContainer({ categories, notices }: NoticeType) {
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredCategoryName, setFilteredCategoryName] = useState('')

    const isAdmin = useAdmin()

    const url = config.apiPrefix + config.apiHost + '/api/notices?page=' + currentPage + '&category=' + filteredCategoryName
    
    const { data, error, isLoading } = useSwrFetch(url)
    
    const newNotices = data?.notices || null
    const maxPage = Math.ceil(notices.length / MAX_SIZE)


    function onPageChange(page: number) {
        setCurrentPage(Math.max(0, page - 1))
    }

    function onCategoryFilter(e: ChangeEvent<HTMLSelectElement>) {
        const category = e.currentTarget.value
        setFilteredCategoryName(category)
    }
    
    if (error) return <ErrorMessage />
    return (
        <NextUIProvider className="max-w-[1230px] mx-auto px-2">
            <Title title="공지사항"/>
            <div className="flex justify-between items-center">
                <NoticeFilterList categories={categories} onChange={onCategoryFilter} /> {/* 카테고리 필터*/}
                {isAdmin? <NoticeWriteLink /> : <div></div> } {/* 글쓰기 페이지 이동*/}
            </div>
            {isLoading
                ? <LoadingMessage />
                : <NoticeList notices={newNotices || notices} />}{/* 공지사항 목록*/}
            <LibPagination
                onChange={onPageChange}
                maxPage={maxPage}
                currentPage={currentPage + 1} /> {/* 페이지네이션 */}
        </NextUIProvider>

    )
}