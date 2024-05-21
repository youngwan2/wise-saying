import { HiTrash } from 'react-icons/hi2'

interface PropsType {
  id: number
  isDeleting: boolean
  onClickDelete: () => void
}
export default function BookmarkDeleteButton({
  isDeleting,
  onClickDelete,
}: PropsType) {
  return (
    <li
      role="button"
      aria-label="북마크 삭제"
      onClick={onClickDelete}
      className="text-[#f77b65] text-[1.5em] absolute right-[0.8em] top-[3px] hover:shadow-[0_0_1px_1px_tomato] "
    >
      {isDeleting ? <HiTrash color="gray" /> : <HiTrash color="tomato" />}
    </li>
  )
}
