import { ChangeEventHandler } from "react"


interface PropsType {
  categories: {
    name: string
    notice_category_id: number
  }[]
  onChange: ChangeEventHandler<HTMLSelectElement>
}

export default function NoticeFilterList({ categories, onChange }: PropsType) {
  return (
    <select
      defaultValue={"전체"}
      onChange={onChange}
      className="antialiased text-white bg-[#1f306b]">
      {categories.concat({ name: '전체', notice_category_id: 0 }).map(category => <option key={category.name} inlist={category.name === '전체' ? '전체' : undefined} value={category.name}>{category.name}</option>)}
    </select>
  )
}