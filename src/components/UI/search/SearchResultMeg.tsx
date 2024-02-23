
interface PropsType {
    searchText:string | null
    resultTotal:number
    resultCount:number
}
export default function SearchResultMeg({searchText, resultTotal, resultCount}:PropsType) {
    return (
        <span className="text-[14px]">
            <strong className="border-b-[1px] border-[tomato]">
                {searchText}
            </strong>{' '}
            로 조회된 결과{' '}
            <b className="border-b-[1px] border-[tomato]">
                {resultTotal}
            </b>
            건 중 상위{' '}
            <b className="border-b-[1px] border-[tomato]">
                {resultCount}
            </b>{' '}
            건{' '}
        </span>
    )
}