import BookmarkModal from "../UI/modal/BookmarkModal";
import BookmarkModalButton from "../UI/button/BookmarkModalButton";
import HeaderNavButton from "../UI/button/HeaderNavButton";
import HeaderNavModal from "../UI/modal/HeaderNavModal";

export default function Header() {
  return (
    <>
      <header className="shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.5)] top-0 z-20 max-h-[45px] min-h-[50px] mb-[5px] mx-auto max-w-[1700px] flex justify-between bg-[#fcfbfb] p-[10px]  w-[100%] px-[10px] items-center rounded-b-[10px] ">
        <h1 className="p-[5px] text-[1.25em] font-bold">Wise Sayings</h1>
        <div className="flex items-center">
          <HeaderNavButton />
          <BookmarkModalButton />
        </div>
      </header>
      <HeaderNavModal />
      <BookmarkModal />
    </>
  )
}
