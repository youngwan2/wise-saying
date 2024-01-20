import { ItemsType } from '@/types/items.types'
import { logoutUser } from '@/utils/commonFunctions'

/**
 * POST | 북마크 아이템을 추가하는 함수
 * @param hasToken accessToken 존재 유무 판단
 * @param itemId 북마크에 추가할 아이템의 식별자
 * @param items 전체 아이템 목록
 * @param category 아이템 분류
 */
export const postBookmarkItem = (
  hasToken: boolean,
  itemId: number,
  items: ItemsType[],
  category: string,
) => {
  if (!hasToken) return alert('로그인 후 이용해주시길 바랍니다.')

  const token = localStorage.getItem('token')
  const selectedItem = items.find((item) => item.id === itemId)
  const postData = {
    author: selectedItem?.author,
    wise_sayings: selectedItem?.wise_sayings,
    category,
  }

  const url = '/api/bookmark'
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const result = await response.json()
      const { meg, status } = result

      if (status === 201) {
        alert(meg)
      }
      if (status === 422) {
        alert(meg)
      }
      if (status === 401) {
        alert(meg)
        logoutUser()
      }
    })
    .catch((error) => {
      console.error(error)
    })
}


/**
 * POST | 유저 닉네임과 프로필 이미지 URL 을 저장
 * @param hasToken 토큰 존재 유무 판단
 * @param nickname 유저 닉네임
 * @param imageUrl 유저 프로필 이미지 URL
 * @returns 
 */
export async function updateUserInfo(hasToken: boolean, nickname: string, imageUrl: string) {
  if (!hasToken) return alert('접근 권한이 없습니다.')
  const token = localStorage.getItem('token')
  const userInfo = {
    nickname: nickname,
    profile_image: imageUrl,
  }

  try {
    const response = await fetch('/api/users/upload', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const { status, meg } = await response.json()
    if (status === 201) {
      alert(meg)
      location.reload()
    } else {
      alert(meg)
      throw new Error(meg)
    }
  } catch (error) {
    alert(
      '전송 중 예기치 못한 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    )
  }
}


interface UserPostType {
  category: string
  wise_sayings: string
  author: string
  userEmail: string
}

// 유저가 작성한 포스트를 등록 요청하는 메소드
export const postUserPost = (hasToken: boolean, userPost: UserPostType, router: any) => {
  if (hasToken) {
    const accessToken = localStorage.getItem('token')
    const headers = {
      authorization: `Bearer ${accessToken}`,
    }
    fetch('/api/add-post', {
      method: 'POST',
      headers,
      body: JSON.stringify(userPost),
    })
      .then(async (response) => {
        const { status, success, meg } = await response.json()
        if (status === 201) {
          alert(meg)
          router.push('/user-quotes')
        }
        if (success === false) {
          alert(meg)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  if (!hasToken) {
    alert('로그인 해주세요')
    router.push('/login')
  }
}


/**
* POST | 로그인 요청
* @param email 
* @param password 
*/
export const reqLogin = async (email: string, password: string) => {
  const user = {
    email,
    password,
  }
  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(user),
  })
    .then(async (response) => {
      const {
        accessToken,
        email: dbEmail,
        status,
        meg,
        profile,
      } = await response.json()
      if (status === 201) {
        const user = {
          dbEmail,
          profile,
        }
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', accessToken)
        alert(`${dbEmail}님 환영합니다!. 잠시 후 Home 화면으로 이동합니다.`)
      }

      if (status === 403) {
        alert(`${meg} 다시 확인해주세요.`)
      }
      if (status === 500) {
        alert(meg)
      }
      location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
}