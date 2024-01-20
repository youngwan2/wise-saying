'use client'
import AuthorsCategoryCard from '../card/AuthorCategoryCard'
interface PropsType {
  items: {
    id: number
    author: string
  }[]
}
export default function AuthorsCategoryList({ items }: PropsType) {
  return (
    <ul className=" mt-[1em] flex justify-center flex-wrap overflow-y-auto min-h-[100vh]">
      {items.map((item) => {
        return <AuthorsCategoryCard key={item.id} item={item} />
      })}
    </ul>
  )
}
