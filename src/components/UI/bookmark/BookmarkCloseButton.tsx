import { useBookmarkStore } from '@/store/store'
import { HiXCircle } from 'react-icons/hi2'

export default function BookmarkCloseButton() {
  const toggleState = useBookmarkStore((state) => state.toggleState)
  const setToggleState = useBookmarkStore((state) => state.setToggleState)

  return (
    <button
      aria-label="북마크 모달 닫기"
      onClick={() => {
        setToggleState(!toggleState)
      }}
      className=" absolute right-[1em] top-[1em] "
    >
      <HiXCircle color="white" className="text-[3em] hover:border" />
    </button>
  )
}
