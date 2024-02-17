import { HiTrash } from 'react-icons/hi2'
import useHasToken from '@/custom/useHasToken'
import { useState } from 'react'
import { deleteBookmark } from '@/services/user/delete'

interface PropsType {
  id: number
}
export default function BookmarkDeleteButton({ id }: PropsType) {
  const hasToken = useHasToken()

  const [isLoading, setIsLoading] = useState(false)
  const onClickDeleteBookmark = async () => {
    if (!hasToken) return alert('로그인 해주세요.')

    setIsLoading(true)
    const success = await deleteBookmark(id)
    success && setIsLoading(false)
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
