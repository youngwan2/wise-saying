'use client'

import UserQuotesCategoryCard from './UserQuotesCategoryCard'

interface PropsType {
  categories: {
    category: string
    category_id: number
  }[]
}

export default function UserQuotesCategoryList({ categories }: PropsType) {
  return (
    <ul className="flex flex-wrap justify-center w-full">
      {categories.map((categories) => {
        return (
          <UserQuotesCategoryCard
            category={categories.category}
            key={categories.category_id}
          />
        )
      })}
    </ul>
  )
}
