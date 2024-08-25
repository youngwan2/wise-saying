export const config = {
  apiPrefix: process.env.NODE_ENV==='development' ? 'http://' : process.env.NEXT_PUBLIC_API_PREFIX ||'https//',
  apiHost:  process.env.NODE_ENV==='development'? 'localhost:3000' : process.env.NEXT_PUBLIC_API_HOST || 'wise-sayings.com',
}
