'use client'

import { useEffect, useState } from 'react'
import { useCommentUpdate } from '@/store/store'
import useSWR from 'swr'

import CommentForm from './form/CommentForm'
import CommentPaginationContainer from './CommentPaginationContainer'
import CommentSortSelect from './CommentSortSelect'
import CommentList from './CommentList'

import { getCommentsFormDb } from '@/services/data/get'

export interface CommentsInfoType {
  comments: {
    id: number
    email: string
    nickname: string | null
    profile_iamge: string | null
    comment: string
    created_at: string
  }[]
  totalCount?: number
}

interface PropsType {
  id: string
}

const MIN_PAGE = 0
export default function Comment({ id }: PropsType) {
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState('')
  const {isUpdate,setIsUpdate} = useCommentUpdate()

  const { data: commentsInfo, isLoading, mutate } = useSWR<CommentsInfoType>(
    `/api/quotes/${id}/comments?page=${page}&sort=${sort}`,
    getCommentsFormDb,
    {
      refreshInterval: 10000,
    },
  )

  const comments = (commentsInfo && commentsInfo.comments) || []
  const totalCount = (commentsInfo && commentsInfo.totalCount) || 1
  const MAX_PAGE = Math.ceil(totalCount / 5)

  useEffect(() => {
    if (isUpdate) {
      mutate().then(() => setIsUpdate(false))
    }
  }, [isUpdate, mutate, setIsUpdate])



  return (
    <section className="py-[1em] ">
      <h3 className="text-white sm:text-[1.5em] text-[1.25em] mt-[2em]  bg-[rgba(255,255,255,0.05)]">
        댓글({!isLoading ? comments.length : 0})
      </h3>
      <CommentForm mutate={mutate} />
      <CommentSortSelect setSort={setSort} />
      <CommentList comments={comments} />
      <CommentPaginationContainer
        page={page}
        minPage={MIN_PAGE}
        maxPage={MAX_PAGE}
        onClickPrev={() => setPage(Math.max(page - 1, MIN_PAGE))}
        onClickNext={() => setPage(Math.min(page + 1, MAX_PAGE))}
      />
    </section>
  )
}
