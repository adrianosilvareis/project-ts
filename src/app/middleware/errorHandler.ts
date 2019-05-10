import { Request, Response, NextFunction } from 'express'
import { loggerError } from '../../module/log4'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (err: any, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (!err) { next() }
  // add logger methods here
  if (err.isBoom) {
    const { name, errors, message, output } = err
    const { statusCode, payload } = output

    const errorHandler = {
      name,
      errors,
      message,
      statusCode,
      payload
    }

    if (statusCode >= 500) loggerError.fatal(`${statusCode} - ${message}`)
    if (statusCode >= 400) loggerError.error(`${statusCode} - ${message}`)
    if (statusCode >= 300) loggerError.warn(`${statusCode} - ${message}`)

    return res.status(statusCode).json(errorHandler)
  }
  return res.status(500).json(err)
}
