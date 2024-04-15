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
    <html>
    <head>
        <style>
            /* CSS 스타일 설정 */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>반갑습니다. ${userEmail} 님! Wise Sayings 에서 보냈습니다.</h2>
            <br/>
            <h3> 보안!) 본인이 인증 요청을 하지 않았음에도 해당 이메일 주소로 해당 메일이나 개인정보를 요구하는 메일이 전송되었다면, 응답하지 마시고 qodna25@gmail.com 으로 신고해주세요.</h3>
            <br/>
            <h3>해당 인증은 ${new Date().toLocaleTimeString()} 부터 7분 동안 유효합니다.</h3>
            <br/>
            ${type === 'signin' ? `<h2>${path}</h2>` : `<h2>[비밀번호 재설정 페이지] <a href="${path}"><span>비밀번호 재설정 페이지로 이동하기</span></a></h2>`}
            
           
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
    params.Message.Body.Html.Data = setMailOptAwsSes(token, recipientEmail, type)
  } else {
    params.Message.Body.Html.Data = setMailOptAwsSes(token, recipientEmail, type)
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
export function setMailOptAwsSes(tempToken: string, userEmail: string, type: "signin"|"forgot") {
  if (type === 'signin') {
    const html = setHtml(tempToken, userEmail, type)
    return html

  } else {
    const referer = headers().get('referer')
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
