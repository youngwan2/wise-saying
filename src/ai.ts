import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI
})

// 명언 생성
export async function generateQuoteBy(content:string) {
    const response = await openai.chat.completions.create({
        model :'gpt-3.5-turbo',
        messages : [
            {
                'role':'system',
                'content':'Your role is to analyze emotions based on the text provided by the user and respond with words that provide strength, encouragement, or motivation. The response format should be in Korean without including quotation marks or double quotation marks, and it should not indicate who said it. Responses are limited to two sentences'
            },
            {
                'role':'user',
                'content':content
            }
        ],
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1,
    })

    return response.choices[0].message.content
}

// 이미지 생성
export async function generateQuoteImageBy(content:string) {

    const resposne = await openai.images.generate({
        model:'dall-e-2',
        prompt: content +'Draw me a background image that suits the atmosphere of the sentence',
        n: 1,
        size : "512x512"
    })
    const imageUrl = resposne.data[0].url;
    return imageUrl
}