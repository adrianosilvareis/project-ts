import { createTransport } from 'nodemailer'
import { host, port, user, pass } from '../config/mailer.json'
// import hds from 'nodemailer-express-handlebars'
// import path from 'path'

const transport = createTransport({
  host,
  port,
  auth: { user, pass }
})

// transport.use('compile', hds({
//   viewEngine: 'handlebars',
//   viewPath: path.resolve('./src/resources/mail/'),
//   extName: '.html'
// }))

export default transport
