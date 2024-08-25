"use client"
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/pagination";

interface PropsType {
  maxPage: number
  currentPage: number
  onChange: (page: number) => void

}

export default function LibPagination({ maxPage, currentPage, onChange }: PropsType) {
  return (
    <Pagination 
    className="mx-auto w-full flex justify-center mt-3"
    total={maxPage} 
    initialPage={currentPage} 
    color="default" 
    onChange={onChange} />
  )
}