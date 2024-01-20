'use client'
import UserCategoryCard from '../card/UserCategoryCard'

interface PropsType {
  categories: {
    category: string
    category_id: number
  }[]
}

export default function UserCategoryList({ categories }: PropsType) {
  return (
    <ul className="flex flex-wrap justify-center w-full">
      {categories.map((categories) => {
        return (
          <UserCategoryCard
            category={categories.category}
            key={categories.category_id}
          />
        )
      })}
    </ul>
  )
}
