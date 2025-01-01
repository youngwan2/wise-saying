import { Method, defaultConfig } from "@/configs/config.api"
import { defaultFetch } from "@/utils/fetcher"

export async function generateAiQuoteBy(prompt: string) {


  const config = defaultConfig(Method.POST, prompt)
  const url = '/api/quotes/ai'
  const { success: isSuccess, results } = await defaultFetch(url, config)
  const result = results.result || { quote: "", category: "", ai: "ai", create_at: '' }

  return { result, isSuccess }

}

export async function getAiQuoteComment(quoteId: number, isUser: boolean = false) {

  /** POST | 명언 해석 정보 생성 요청 */
  const url = '/api/quotes/ai/commentation'
  const configs = {
    method: 'POST',
    body: JSON.stringify({ quoteId, isUser })
  }

  try {
    const response = await fetch(url, configs)
    if (!response.ok) throw new Error('명언 해석 정보를 가져오지 못했습니다.')

    return await response.json()
  } catch (error) {
    if (error instanceof Error)
      return { success: false, meg: error.message }
  }
}