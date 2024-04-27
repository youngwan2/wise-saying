import BookmarkModal from '../UI/bookmark/BookmarkModal'
import BookmarkModalButton from '../UI/bookmark/BookmarkModalButton'
import HeaderNavButton from '../UI/header/HeaderNavButton'
import HeaderNavModal from '../UI/header/HeaderNavModal'
import LoginButton from '../UI/auth/login/LoginButton'
import LogoutButton from '../UI/header/LogoutButton'
import SearchForm from '../UI/search/SearchForm'
import HeaderSearchButton from '../UI/header/HeaderSearchButton'
import FocusModeButton from '../UI/header/FocusModeButton'
import HeaderLogo from '../UI/header/HeaderLogo'
import Overlay from '../UI/common/Overlay'

export default function Header() {
  return (
    <>
      <header className="text-white top-0 z-[1000000000] max-h-[50px] mb-[5px] mx-auto max-w-[1700px] flex justify-between  w-[100%] p-[15px] py-[20px] items-center fixed left-[50%] translate-x-[-50%] backdrop-blur-[5px] ">
        <HeaderLogo />
        <article className="flex items-center">
          <FocusModeButton />
          <HeaderSearchButton />
          <LoginButton />
          <LogoutButton />
          <HeaderNavButton />
          <BookmarkModalButton />
        </article>
      </header>
      <SearchForm />
      <HeaderNavModal />
      <BookmarkModal />
      <Overlay isDisplay={false}/>
    </>
  )
}
