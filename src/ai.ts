import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
})

// 명언 생성 AI
export async function generateQuoteBy(content: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    response_format: { "type": 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'Your role is to analyze the emotions in the text entered by the user and provide a fitting quote for those emotions. And when the user requests additional quotes, you should respond with a similar quote to the one you previously provided. The response format should be in Korean without including quotation marks or double quotation marks, and it should not indicate who said it. Responses are limited to three sentences. Respond in the format of a JSON object like {quote: quote, category: category, role: ai}. Please write the category in Korean',
      },
      {
        role: 'user',
        content: content,
      },
    ],
    temperature: 0.5,
    max_tokens: 120,
    top_p: 1,
  })

  return response.choices[0].message.content
}

// 이미지 생성 AI
export async function generateQuoteImageBy(content: string) {
  const resposne = await openai.images.generate({
    model: 'dall-e-2',
    prompt:
      content +
      'Draw me a background image that suits the atmosphere of the sentence',
    n: 1,
    size: '512x512',
  })
  const imageUrl = resposne.data[0].url
  return imageUrl
}

// 비속어 필터 AI
export async function aiProfanityFilter(content: string[]) {

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    response_format: { "type": 'json_object' },
    messages: [
      {
        role: 'system',
        content: "Your role is to return true if the user uses profanity, swearing, or inappropriate language; otherwise, return false. The response format should be in the form JSON Object of {judgment: false, reason: ''}. Please write the reason in Korean"
      },
      {
        role: 'user',
        content: content[0] + content[1] + content[2],
      },
    ],
    temperature: 0.5,
    max_tokens: 120,
    top_p: 1,
  })

  return response.choices[0].message.content || '{"judgment": false, "reason": "" }'


}