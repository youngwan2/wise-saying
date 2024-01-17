export async function getItemFromDB(path: string = '') {
  try {
    const response = await fetch(`http://localhost:3000/api/items/${path}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// 서버로부터 특정 경로에 대한 명언 리스트 불러오기
export async function getQuotesBy(url: string) {
  try {
    const response = await fetch(url)
    const items = await response.json()

    return items

  } catch (error) {
    console.error(error)
  }
}

// 기타 명언 카테고리 리스트 불러오기
export async function getGeneralQuotesCategoryFromDB() {
  try {
    const response = await fetch(`http://localhost:3000/api/items/etc`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// 기타 카테고리 선택에 따른 명언 리스트 불러오기
export async function getEtcQuotesBy(category: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/items/general/${category}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}


// 명언  카테고리 불러오기
export async function getCategoriesFromDb(url:string) {
  try {
    const transformURL = 'http://localhost:3000'+url
    const response = await fetch(transformURL)
    const weeks = await response.json()
    return weeks
  } catch (error) {
    console.error(error)
  }
}


// 북마크 리스트 불러오기
export const getBookmarkListFormDB = async (url: string, token: string) => {
  if (!(token === '')) {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const items = response.json()
    return items
  }
}