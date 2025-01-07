import { headers } from 'next/headers'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

/**
 * 메일 본문 HTML
 * @param path 비밀번호 찾기 경로 혹은 인증번호
 * @param userEmail 유저 이메일
 * @param type 회원가입 요청인지 비밀번호 찾기 요청인지 구분
 * @returns 메일 본문에 표시할 HTML 반환
 */
function setHtml(path: string, userEmail: string, type: "signin"|"forgot") {
  const html = `
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wise Sayings 인증 이메일</title>
  </head>
  <body style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #4a90e2; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Wise Sayings</h1>
          </div>
          <div style="padding: 30px;">
              <h2 style="font-size: 20px; color: #2c3e50; margin-top: 0;">반갑습니다, ${userEmail} 님!</h2>
              
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px;">
                  <h3 style="font-size: 16px; color: #34495e; margin-top: 0;">보안 주의사항</h3>
                  <p style="margin-bottom: 0;">본인이 인증 요청을 하지 않았음에도 해당 이메일 주소로 개인정보를 요구하는 메일이 전송되었다면, 응답하지 마시고 <strong>qodna25@gmail.com</strong>으로 신고해주세요.</p>
              </div>
              
              <h3 style="font-size: 16px; color: #34495e;">인증 유효 시간</h3>
              <p>해당 인증은 ${new Date().toLocaleTimeString()} 부터 <strong>7분</strong> 동안 유효합니다.</p>
              
              ${type === 'signin' 
                  ? `<h2 style="font-size: 20px; color: #2c3e50;">${path}</h2>` 
                  : `<h2 style="font-size: 20px; color: #2c3e50;">비밀번호 재설정</h2>
                     <a href="${path}" style="display: inline-block; background-color: #4a90e2; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold; margin-top: 20px;">비밀번호 재설정 페이지로 이동</a>`
              }
          </div>
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 14px; color: #6c757d;">
              © 2024 Wise Sayings. All rights reserved.
          </div>
      </div>
  </body>
  </html>
`

  return html
}

const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SES_ACCESS_SECRET || '',
  },
  region: process.env.AWS_SES_REGION

}

const client = new SESClient(SES_CONFIG)

/**
 * AWS SES 클라이언트 연결 및 메일 전송
 * @param recipientEmail 수신자 이메일
 * @param recipientName 수신자 이름(닉네임)
 * @param token 임시토큰 및 인증번호
 * @param type 회원가입 요청 | 비밀번호 찾기
 */
export async function sendMailWithAwsSes(recipientEmail: string, recipientName: string, token: string, type: "signin"|"forgot") {
  const params = {
    Source: process.env.AWS_SES_SENDER, // (보내는사람 === 본인) 발신자 이메일 주소
    Destination: { // 메일을 어디로 보낼건데?
      ToAddresses: [
        recipientEmail // ㄴ 수신자 메일로 보낼거임
      ]
    },
    ReplyToAddresses: [process.env.AWS_SES_SENDER||''], // 수신자가 답하면 어디로 응답 받을거? 발신자가 재응답 받도록 할거임
    Message: { // 어떤 내용을 담아서 보낼 것인지?
      Body: { // ---> 본문에는 어떤 내용을 보여줄건데?
        // 참고로 HTML 말고도 Text : {Charset, Data} 도 가능-> 텍스트로 전송
        Html: {
          Charset: 'UTF-8',
          Data: ` <html>
          <head>
              <style>
                  /* CSS 스타일 설정 */
              </style>
          </head>
          <body>
              <div class="container">
               
              </div>
          </body>
          </html>`
        }
      },
      Subject: { // --> 메일 제목
        Charset: 'UTF-8',
        Data: `안녕하세요, ${recipientName}! AWS Simple Email Send 서비스를 이용하여 발송된 인증 메시지 입니다.`
      }
    }
  }

  if (type === "signin") {
    params.Message.Body.Html.Data = await setMailOptAwsSes(token, recipientEmail, type)
  } else {
    params.Message.Body.Html.Data = await setMailOptAwsSes(token, recipientEmail, type)
  }

  try {
    const sendEmailCommend = new SendEmailCommand(params)
    const response = await client.send(sendEmailCommend)
    console.log("성공 이메일 전송:", response)
  } catch (error) {
    console.error("이메일 전송실패:", error)
  }

}

// 메일 본문 설정
/**
 * AWS SES 옵션 지정 함수
 * @param tempToken 임시토큰 및 인증번호
 * @param userEmail 유저 이메일
 * @param type 회원가입, 비밀번호 찾기 요청 구분
 * @returns 메일 본문에 표시할 HTML 
 */
export async function setMailOptAwsSes(tempToken: string, userEmail: string, type: "signin"|"forgot") {
  if (type === 'signin') {
    const html = setHtml(tempToken, userEmail, type)
    return html

  } else {
    const referer = (await headers()).get('referer')
    const redirectPath = referer?.replace('/forgot', '/reset-pass') || ''

    const html = setHtml(redirectPath + '?temp-token=' + tempToken, userEmail, type)
    return html

  }
}





/** 노드 메일러(레거시) */

// const nodemailer = require('nodemailer')
// const { MAIL_SERVICE, USER, PASS } = process.env
// export const mailOptions = {
//   from: USER,
//   to: '',
//   subject: '[Wise Sayings] 패스워드 재설정 안내 메시지 입니다..',
//   html: '',
// }

// // 메일 옵션 지정
// export function setMailOptions(userEmail: string, tempToken: string) {
//   const referer = headers().get('referer')
//   const redirectPath = referer?.replace('/forgot', '/reset-pass') || ''

//   const html = setHtml(redirectPath + '?temp-token=' + tempToken, userEmail)

//   mailOptions.to = userEmail
//   mailOptions.html = html
// }

// // 메일 전송
// export function sendMail() {
//   transporter.sendMail(mailOptions, (error: Error, info: any) => {
//     if (error) {
//       console.error('이메일 전송 실패:', error)
//       throw new Error('이메일 전송 실패')
//     }
//     console.log('이메일 전송 성공:', info.response)
//   })
// }

// export const transporter = nodemailer.createTransport({
//   service: MAIL_SERVICE,
//   auth: {
//     user: USER,
//     pass: PASS,
//   },
// })
