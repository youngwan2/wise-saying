import Bookmark from "../UI/bookmark/Booklmark";
export default function Header() {
  return (
    <header className="max-h-[5vh] mb-[5px] mx-auto max-w-[1600px] flex justify-between bg-[#fcfbfb] p-[10px]  w-[100%] px-[10px] items-center rounded-b-[10px] shadow-[0_0_1px_1px_gray]">
      <h1 className="p-[5px] text-[1.25em] font-bold">Wise Sayings</h1>
      <Bookmark />
    </header>
  )
}
