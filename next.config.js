/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
default-src 'self'; 
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://embed.tawk.to http://localhost:8097; 
style-src 'self' 'unsafe-inline'; 
img-src 'self'; 
font-src 'self'; 
object-src 'none'; 
base-uri 'self'; 
form-action 'self'; 
frame-ancestors 'none'; 
upgrade-insecure-requests;
`


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_PROD_URL || 'https://wise-sayings.com', // 배포 주소 호스팅 가능하게
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://ssl.gstatic.com/accessibility/javascript/ext/loader.js?1709880302058', // t
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
         
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, ''),
          },
          {
            key:'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key:'X-Content-Type-Options',
            value: 'nosniff',
          }
        ]
      }
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)
