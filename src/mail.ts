import { headers } from 'next/headers'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

// 메일 본문 HTML
function setHtml(path: string, userEmail: string) {
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
            p {
                color: black;
                padding:10px;
                border-radius:10px;
                font-size:15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>반갑습니다. ${userEmail} 님! </h1>
            <p>해당 링크는 ${new Date().toLocaleTimeString()} 부터 7분 동안 유효합니다.</p>
            <p>비밀번호 재설정 링크: <a href="${path}"><span>바로가기</span></a></p>
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

export async function sendMailWithAwsSes(recipientEmail: string, recipientName: string, token: string) {

  const params = {
    Source: process.env.AWS_SES_SENDER, // (보내는사람 === 본인) 발신자 이메일 주소
    Destination: { // 메일의 목적지는 어디?
      ToAddresses: [
        recipientEmail // ㄴ 당연히 수신자 메일로 보내지
      ]
    },
    ReplyToAddresses: [], // 수신자가 답하면 어디로?
    Message: { // 어떤 내용을 담아서 보낼 것인지?
      Body: { // ---> 본문 내용
        // HTML 말고도 Text : {Charset, Data} 도 가능-> 텍스트로 전송
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
        Data: `안녕하세요, ${recipientName}!`
      }
    }
  }

  params.Message.Body.Html.Data = setMailOptAwsSes(token, recipientEmail)

  try {
    const sendEmailCommend = new SendEmailCommand(params)
    const response = await client.send(sendEmailCommend)
    console.log("성공 이메일 전송:", response)
  } catch (error) {
    console.error("이메일 전송실패:", error)
  }

}

// 메일 본문 설정
export function setMailOptAwsSes(tempToken: string, userEmail: string) {
  const referer = headers().get('referer')
  const redirectPath = referer?.replace('/forgot', '/reset-pass') || ''

  const html = setHtml(redirectPath + '?temp-token=' + tempToken, userEmail)
  return html

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
