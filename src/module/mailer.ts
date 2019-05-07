import { createTransport } from 'nodemailer'
import { host, port, user, pass } from '../config/mailer.json'

const transport = createTransport({
  host,
  port,
  auth: { user, pass }
})

export default transport
