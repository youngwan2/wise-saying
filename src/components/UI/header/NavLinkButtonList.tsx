import { usePathname, useRouter } from 'next/navigation'

import NavLinkButton from './button/NavLinkButton'

import navList from '@/router'


export default function NavLinkButtonList() {
  const pathSplit = usePathname()
  const { push } = useRouter()

  /** 이동 경로 및 현재 경로의 일치유무 따른 판단 함수 */
  function matchPath(path: string) {
    return pathSplit.includes(path)
  }

  function onClickPageSwitch(path: string) {
    push(path)

  }

  return (
    <menu className='h-[100%] w-[100%]'>
      <h3 className='pl-[1em] py-[13px] mb-[1em] font-bold text-white text-[1.15em] bg-[tomato]'>Wise Sayings</h3>
      {navList.map((navItem, index) => (
        <NavLinkButton
          key={index}
          onClick={() => onClickPageSwitch(navItem.path)}
          icon={navItem.icon}
          label={navItem.label}
          path={navItem.path}
          matchPath={matchPath}
        />
      ))}
    </menu>
  )
}

