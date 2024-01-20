'use client'
import WeekdayCategoryCard from '../card/WeekdayCategoryCard'
import type { WeekDayCategoryType } from '@/types/items.types'

interface PropsType {
  categories: WeekDayCategoryType[]
}
export default function WeekdayCategoryList({ categories }: PropsType) {
  return (
    <ul className="w-full flex justify-center min-h-[100vh] flex-wrap overflow-y-auto mt-[5em] group ">
      {categories.map((category) => {
        return (
          <WeekdayCategoryCard key={category.category_id} list={category} />
        )
      })}
    </ul>
  )
}
