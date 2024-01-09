'use client'
import WeekdayCategoryCard from '../card/WeekdayCategoryCard'

interface PropsType {
  categories: {
    day_group_id: number
    day_name: string
  }[]
}
export default function WeekdayCategoryList({ categories }: PropsType) {
  return (
    <ul className="w-full flex justify-center min-h-[100vh] flex-wrap overflow-y-auto mt-[5em] group ">
      {categories.map((category) => {
        return (
        <WeekdayCategoryCard key={category.day_group_id} category={category}/>
        )
      })}
    </ul>
  )
}
