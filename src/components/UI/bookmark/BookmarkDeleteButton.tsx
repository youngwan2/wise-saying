import { HiTrash } from 'react-icons/hi2'
import useHasToken from '@/custom/useHasToken'
import { useState } from 'react'

interface PropsType {
  id: number
}
export default function BookmarkDeleteButton({ id }: PropsType) {
  const hasToken = useHasToken()

  const [isLoading, setIsLoading] = useState(false)

  const deleteBookmark = async (id: number) => {
    if (!hasToken) return alert('로그인 해주세요.')
    setIsLoading(true)
    if (hasToken) {
      const token = sessionStorage.getItem('token') || ''
      const response = await fetch(`/api/bookmark/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      const { status, meg } = await response.json()

      if (status === 204) {
        alert(meg)
        setIsLoading(false)
      } else {
        alert(meg)
        setIsLoading(false)
      }
    }
  }

  return (
    <button
      onClick={() => {
        deleteBookmark(id)
      }}
      className="text-[#f77b65] text-[1.5em] absolute right-[0.8em] top-[3px] hover:shadow-[0_0_1px_1px_tomato] "
    >
      {isLoading? <HiTrash color="gray" />:<HiTrash color="tomato" /> }
    </button>
  )
}
