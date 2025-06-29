import {
  HiChartBar,
  HiHomeModern,
  HiNewspaper,
  HiOutlineHandThumbUp,
  HiOutlineUserGroup,
  HiSpeakerWave,
  HiOutlinePencil,
} from 'react-icons/hi2'
import { BsRobot } from "react-icons/bs";
import { BiSolidBookContent } from 'react-icons/bi';

const navList = [
  // { path: '/intro', label: '사이트 소개', icon: HiHand },/
  { path: '/notice', label: '공지사항', icon: HiSpeakerWave },
  { path: '/quotes/populars', label: '실시간 인기명언', icon: HiChartBar },
  { path: '/quotes/topics', label: '주제별 명언', icon: HiNewspaper },
  { path: '/quotes/authors', label: '인물별 명언', icon: HiOutlineUserGroup },
  { path: '/user-quotes', label: '유저 명언', icon: HiOutlineHandThumbUp },
  { path: '/add-quote', label: '명언 쓰기', icon: HiOutlinePencil },
  { path: '/mypage', label: '마이페이지', icon: HiHomeModern },
  { path: '/ai-quote', label: 'AI 명언 챗봇', icon: BsRobot },
  { path: '/canvas-editor', label: '명언 캔버스 에디터', icon: BiSolidBookContent },
]

export default navList
