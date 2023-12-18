import { HiWifi } from 'react-icons/hi'

export default function Header() {
  return (
    <header className="h-7 flex justify-between items-center bg-transparent absolute top-0 w-[100%] px-[10px]">
      <h1>My Wise Saying</h1>
      <HiWifi />
    </header>
  )
}
