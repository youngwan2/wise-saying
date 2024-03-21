import {
  HiChartBar,
  HiCommandLine,
  HiHomeModern,
  HiNewspaper,
  HiOutlineHandThumbUp,
  HiOutlineHomeModern,
  HiOutlinePencil,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import { HiPhotograph } from 'react-icons/hi'

const navList = [
  { path: '/quotes/populars', label: '실시간 인기명언', icon: HiChartBar },
  { path: '/gallery', label: '명언 전시관', icon: HiPhotograph },
  { path: '/quotes/topics', label: '주제별 명언', icon: HiNewspaper },
  { path: '/quotes/authors', label: '인물별 명언', icon: HiOutlineUserGroup },
  { path: '/user-quotes', label: '유저 명언', icon: HiOutlineHandThumbUp },
  { path: '/add-wisesaying', label: '명언 쓰기', icon: HiOutlinePencil },
  { path: '/mypage', label: '마이페이지', icon: HiHomeModern },
  { path: '/ai-quote', label: 'AI 명언 생성', icon: HiCommandLine },
  { path: '/', label: '홈', icon: HiOutlineHomeModern },
]

export default navList
