import { Request, Response, NextFunction } from 'express'

export default async (err: object, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (err) { console.log(err) }

  return res.status(500).json('caiu aqui')
}
