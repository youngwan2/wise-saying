
interface PropsType {
    ariaLabel:string
    currentPage:number
    maxPage:number

 }
  
export default function PageIndicator({ariaLabel, currentPage,maxPage}:PropsType) {
return (
    <span
    aria-label={ariaLabel}
    className="mx-[1em]"
  >
    {currentPage}/{maxPage}
  </span>
)}