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
      className={`${styles.refresh_btn} top-[11em] border p-[8px] text-[1.15em] absolute flex items-center right-[4%] text-white hover:cursor-pointer z-[20] hover:text-[#e3e3e0] `}
      onClick={onClickReload}>
      <HiRefresh />
    </ControlButton>
  )
}