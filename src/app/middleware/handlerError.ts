import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (err: any, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (!err) { next() }
  // add logger methods here
  if (err.isBoom) {
    const { statusCode, payload } = err.output
    return res.status(statusCode).json(payload)
  }
  return res.status(500).json(err)
}
