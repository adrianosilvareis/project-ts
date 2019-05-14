import { createTransport } from 'nodemailer'
const { EMAIL_HOST: host, EMAIL_PORT: port, EMAIL_USER: user, EMAIL_PASS: pass } = process.env

const transport = createTransport({
  host,
  port,
  auth: { user, pass }
})

export default transport
