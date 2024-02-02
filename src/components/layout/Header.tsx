import BookmarkModal from '../UI/bookmark/BookmarkModal'
import BookmarkModalButton from '../UI/bookmark/BookmarkModalButton'
import HeaderNavButton from '../UI/header/HeaderNavButton'
import HeaderNavModal from '../UI/header/HeaderNavModal'
import Link from 'next/link'
import LoginButton from '../UI/auth/LoginButton'
import LogoutButton from '../UI/auth/LogoutButton'
import SearchForm from '../UI/search/SearchForm'
import HeaderSearchButton from '../UI/header/HeaderSearchButton'

export default function Header() {
  return (
    <>
      <header className="text-white top-0 z-20 max-h-[50px] mb-[5px] mx-auto max-w-[1700px] flex justify-between  w-[100%] p-[15px] py-[20px] items-center fixed left-[50%] translate-x-[-50%] backdrop-blur-[5px] ">
        <h1  className="p-[5px] text-[1.25em] font-bold mr-[2em]">
          <Link aria-label='홈페이지 로고 이면서 홈 이동 링크' href={'/'}> Wise Sayings</Link>
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
