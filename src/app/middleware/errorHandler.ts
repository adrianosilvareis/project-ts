import { Request, Response, NextFunction } from 'express'

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

    return res.status(statusCode).json(errorHandler)
  }
  return res.status(500).json(err)
}
