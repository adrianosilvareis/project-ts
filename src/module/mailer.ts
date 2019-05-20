import { createTransport } from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'

const { EMAIL_HOST: host, EMAIL_PORT: port, EMAIL_USER: user, EMAIL_PASS: pass } = process.env

const transport = createTransport({
  host,
  port,
  auth: { user, pass }
})

transport.use('compile', hbs({
  viewEngine: {
    extname: '.html',
    layoutsDir: 'src/resources/mail/',
    defaultLayout: 'template',
    partialsDir: 'src/resources/mail/'
  },
  viewPath: 'src/resources/mail/',
  extName: '.html'
}))

export default transport
