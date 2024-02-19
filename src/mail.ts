import { headers } from "next/headers";

const nodemailer = require('nodemailer');
const { MAIL_SERVICE, USER, PASS } = process.env

// 메일 본문 HTML
function setHtml(path: string) {
    console.log(path)
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
                color: white;
                background:rgba(0,0,0,0.7) ;
                padding:10px;
                border-radius:10px;
                font-size:15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hello ~ </h1>
            <p>비밀번호 재설정 링크: <a style="color:white" href="${path}"><span>바로가기</span></a></p>
        </div>
    </body>
    </html>
`;

    return html
}

export const mailOptions = {
    from: USER,
    to: '',
    subject: '[Wise Sayings] 임시 패스워드 입니다.',
    html: ''
}

// 메일 옵션 지정
export function setMailOptions(userEmail: string, tempToken: string) {
    const referer = headers().get('referer')
    const redirectPath = referer?.replace('/forgot', '/reset-pass') || ''
    
    const html = setHtml(redirectPath + '?temp-token=' + tempToken);

    mailOptions.to = userEmail;
    mailOptions.html = html
}


// 메일 전송
export function sendMail() {
    transporter.sendMail(mailOptions, (error: Error, info: any) => {
        if (error) {
            console.error('이메일 전송 실패:', error)
            throw new Error('이메일 전송 실패')
        }
        console.log('이메일 전송 성공:', info.response)
    })
}


export const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    auth: {
        user: USER,
        pass: PASS
    }
});
