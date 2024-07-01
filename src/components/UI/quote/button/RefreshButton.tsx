import styles from '@/components/UI/quote/Quotes.module.css'

import ControlButton from '../../common/button/ControlButton'

import { HiRefresh } from 'react-icons/hi'

interface PropsType {
  onClickReload: () => void
}

export default function RefreshButton({ onClickReload }: PropsType) {
  return (
    <ControlButton
      ariaLabel="새로고침"
      className={`${styles.refresh_btn} top-[12.25em]  left-[50%] translate-x-[-50%] border p-[5.8px] text-[1.15em] absolute flex items-center text-white hover:cursor-pointer z-[20] hover:text-[#e3e3e0] `}
      onClick={onClickReload}>
      <HiRefresh />
    </ControlButton>
  )
}