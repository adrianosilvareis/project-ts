import { notImplemented } from 'boom'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  return next(notImplemented('Request not implemented'))
}
