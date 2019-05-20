import mcache from 'memory-cache'
import { Request, Response, NextFunction, RequestHandler } from 'express'

export const cache = (duration: number): RequestHandler => {
  return function (req: Request, res: Response, next: NextFunction): Response | void {
    if (req.method !== 'GET') return next()

    const key = `__express__${req.originalUrl || req.url}__id__${req['session']['user']}`
    const cacheBody = mcache.get(key)

    if (cacheBody) {
      return res.status(302).json(cacheBody)
    } else {
      const jsonResponse = res.json
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.json = function (body?: any): Response {
        mcache.put(key, body, duration * 1000)
        return jsonResponse.call(this, body)
      }
    }
    next()
  }
}
