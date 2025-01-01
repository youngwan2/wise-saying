import { Method, defaultConfig } from "@/configs/config.api"
import { defaultFetch } from "@/utils/fetcher"

export async function generateAiQuoteBy(prompt: string) {

    
    const config = defaultConfig(Method.POST, prompt)
    const url = '/api/quotes/ai'
    const { success: isSuccess, results } = await defaultFetch(url, config)
    const result = results.result || { quote: "", category: "", ai: "ai", create_at: '' }

    return {result, isSuccess }
    
  }