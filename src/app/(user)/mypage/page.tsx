import Title from '@/components/UI/common/Title/Title'
import MyPageContainer from '@/components/UI/mypage/container/MypageContainer'

export default function Mypage() {
  return (
    <>
      <Title title='마이페이지' total={3} current={3} />
      <MyPageContainer />
    </>

  )
}
