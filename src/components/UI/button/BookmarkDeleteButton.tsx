import { HiTrash } from 'react-icons/hi2'
import useHasToken from '@/custom/useHasToken'
import { useRouter } from 'next/navigation'

interface PropsType {
  id: number
}
export default function BookmarkDeleteButton({ id }: PropsType) {
  const hasToken = useHasToken()

  const router = useRouter()

  const deleteBookmark = async (id: number) => {
    if (!hasToken) return alert('로그인 해주세요.')
    if (hasToken) {
      const token = localStorage.getItem('token') || ''
      const response = await fetch(`/api/bookmark/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { status, meg } = await response.json()

      if (status === 204) {
        alert(meg)
      } else {
        alert(meg)
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
      <HiTrash />
    </button>
  )
}
