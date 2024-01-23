import BookmarkModal from '../UI/modal/BookmarkModal'
import BookmarkModalButton from '../UI/button/BookmarkModalButton'
import HeaderNavButton from '../UI/button/HeaderNavButton'
import HeaderNavModal from '../UI/modal/HeaderNavModal'
import Link from 'next/link'
import LoginButton from '../UI/button/LoginButton'
import LogoutButton from '../UI/button/LogoutButton'
import SearchForm from '../UI/form/SearchForm'
import HeaderSearchButton from '../UI/button/HeaderSearchButton'

export default function Header() {
  return (
    <>
      <header className="text-white top-0 z-20 max-h-[50px] mb-[5px] mx-auto max-w-[1700px] flex justify-between  w-[100%] p-[15px] py-[20px] items-center fixed left-[50%] translate-x-[-50%] backdrop-blur-[5px] ">
        <h1 className="p-[5px] text-[1.25em] font-bold mr-[2em]">
          <Link href={'/'}> Wise Sayings</Link>
        </h1>
        <div className="flex items-center">
          <HeaderSearchButton />
          <LoginButton />
          <LogoutButton />
          <HeaderNavButton />
          <BookmarkModalButton />
        </div>
      </header>
      <SearchForm />
      <HeaderNavModal />
      <BookmarkModal />
    </>
  )
}
