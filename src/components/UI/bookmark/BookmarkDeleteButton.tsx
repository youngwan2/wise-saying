import { HiTrash } from 'react-icons/hi2'
import useHasToken from '@/custom/useHasToken'
import { useState } from 'react'
import { deleteBookmark } from '@/services/user/delete'
import toast from 'react-hot-toast'
import { KeyedMutator, useSWRConfig } from 'swr'

interface PropsType {
  id: number
  page: number
  mutate:KeyedMutator<any>
}
export default function BookmarkDeleteButton({ id, page, mutate }: PropsType) {
  const hasToken = useHasToken()

  const [isLoading, setIsLoading] = useState(false)
  const onClickDeleteBookmark = async () => {
    if (!hasToken) return toast.error('로그인 후 이용해주세요.')

    setIsLoading(true)
    const success = await deleteBookmark(id)
    if (success) {
      setIsLoading(false)
      mutate()
      

    }

  }

  return (
    <button
      onClick={onClickDeleteBookmark}
      className="text-[#f77b65] text-[1.5em] absolute right-[0.8em] top-[3px] hover:shadow-[0_0_1px_1px_tomato] "
    >
      {isLoading ? <HiTrash color="gray" /> : <HiTrash color="tomato" />}
    </button>
  )
}
