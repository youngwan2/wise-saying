const previewEmail = require('preview-email')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  jsonTransport: true,
})

// <https://nodemailer.com/message/>
const message = {
  from: 'linus+from@gmail.com',
  to: 'linus+to@gmail.com',
  subject: 'Hello world',
  html: '<p>Hello world</p>',
  text: 'Hello world',
  attachments: [{ filename: 'hello-world.txt', content: 'Hello world' }],
}

// note that `attachments` will not be parsed unless you use
// `previewEmail` with the results of `transport.sendMail`
// e.g. `previewEmail(JSON.parse(res.message));` where `res`
// is `const res = await transport.sendMail(message);`
previewEmail(message).then(console.log).catch(console.error)

transport.sendMail(message).then(console.log).catch(console.error)
