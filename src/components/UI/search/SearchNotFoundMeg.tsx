interface PropsType {
  hasItem: boolean
}
export default function SearchNotFoundMessage({ hasItem }: PropsType) {
  if (hasItem) return <></>
  return (
    <p className="min-h-[50px] py-[10px] text-white">
      검색된 결과가 존재하지 않습니다.
    </p>
  )
}
