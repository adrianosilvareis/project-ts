import multer from 'multer'
import crypto from 'crypto'

const storage = multer.diskStorage({
  destination: (req, file, cb): void => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb): void => {
    const token = crypto.randomBytes(20).toString('hex')
    cb(null, `${file.originalname}-${token}`)
  }
})

export const upload = multer({ storage })
