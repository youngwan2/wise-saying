import { useBookmarkStore } from '@/store/store'
import { HiXCircle } from 'react-icons/hi2'

export default function BookmarkCloseButton() {
  const { toggleState, setToggleState } = useBookmarkStore()

  function handleToogle() {
    setToggleState(!toggleState)
  }

  return (
    <button
      aria-label="북마크 모달 닫기"
      onClick={handleToogle}
      className=" absolute right-[1em] top-[1em] "
    >
      <HiXCircle color="white" className="text-[3em] hover:border" />
    </button>
  )
}
