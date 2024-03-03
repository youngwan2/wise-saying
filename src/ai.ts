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
                'content':'You need to respond by generating a helpful message based on the sentence the user provide and a relevant Korean quote in one line.'
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