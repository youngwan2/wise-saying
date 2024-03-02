import MypageQuotesCategoryCard from './MypageMyQuotesCategoryCard'

interface PropsType {
  categories: string[]
  onClickCategoryFilter: (category: string) => void
}
export default function MypageMyQuotesCategoryList({
  categories,
  onClickCategoryFilter,
}: PropsType) {
  return (
    <ul className="text-center mt-[2em]">
      <li
        tabIndex={0}
        aria-label="전체 명언 보기"
        onClick={() => {
          onClickCategoryFilter('all')
        }}
        className="hover:cursor-pointer hover:bg-[white] hover:text-black inline-block border rounded-[2em] py-[3px] px-[10px] bg-[tomato] text-white m-[3px]"
      >
        전체{' '}
      </li>
      {categories.map((category) => {
        return (
          <MypageQuotesCategoryCard
            key={category}
            category={category}
            onClickQuotesFilter={() => {
              onClickCategoryFilter(category)
            }}
          />
        )
      })}
    </ul>
  )
}
