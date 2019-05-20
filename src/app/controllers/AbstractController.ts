import { Response, Request, NextFunction } from 'express'

export abstract class AbstractController {
  public abstract async list(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  public abstract async create(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  public abstract async update(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  public abstract async remove(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  public abstract async cancel(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
