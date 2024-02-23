import { HiArchiveBoxXMark } from 'react-icons/hi2'

interface PropsType {
  title: string
}
export default function SearchTapTitle({ title }: PropsType) {
  return (
    <h3 className=" py-[5px] text-[1.15em] ">
      <span className="text-[white] flex items-center  ">
        <HiArchiveBoxXMark className="mr-[3px]" /> {title} 검색
      </span>
    </h3>
  )
}
