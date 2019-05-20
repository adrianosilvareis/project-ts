import { RequestHandler, NextFunction, Response, Request } from 'express'

export default (context, callback: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): RequestHandler => {
    return callback.call(context, req, res, next)
  }
}
