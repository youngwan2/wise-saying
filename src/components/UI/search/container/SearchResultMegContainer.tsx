import { ReactNode } from "react";
import SearchResultMeg from "../message/SearchResultMeg";
import SearchTapTitle from "../SearchTapTitle";

interface MessageType  {
  messageInfo : {
    title:string
    searchText:string
    resultTotal?:number
    resultCurrentCount?:number
  }
}

interface PropsType extends MessageType {
  containerClassName: string
  children?:ReactNode
}
export default function SearchResultMegContainer({containerClassName, messageInfo,children }: PropsType) {

  const {resultCurrentCount, resultTotal, searchText, title} = messageInfo
  return (
    <article className={containerClassName}>
      <SearchTapTitle title={title} />
      <SearchResultMeg>
        <strong className="border-b-[1px] border-[tomato]">{searchText}</strong>{' '}
        로 조회된 결과{' '}
        {children || <b className="border-b-[1px] border-[tomato]">{resultTotal}건 중 상위</b>}
        <b className="border-b-[1px] border-[tomato]">{resultCurrentCount}</b> 건{' '}
      </SearchResultMeg>
    </article>
  )
}