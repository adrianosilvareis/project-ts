import { Request, Response, NextFunction } from 'express'
import { unauthorized } from 'boom'
import { verify } from 'jsonwebtoken'
import { verifyOptions } from '../../config/jwt.json'
import { SessionModule } from '../../module/SessionModule'

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const authHeader = req.headers.authorization

  try {
    if (!authHeader) throw unauthorized('No token provided')

    const [ scheme, token ] = authHeader.split(' ')

    if (!scheme || !token) throw unauthorized('Token error')

    if (!/^Bearer$/.test(scheme)) throw unauthorized('Token malformatted')

    const decoded = await verify(token, process.env.JWT_SECRETY, verifyOptions)

    if (!decoded) throw unauthorized('Token invalid')

    const session = await new SessionModule().getSession(decoded)

    if (!session) throw unauthorized('Session not found')

    req['session'] = session
    return next()
  } catch (error) {
    return next(error)
  }
}
