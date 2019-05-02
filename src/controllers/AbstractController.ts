import { Response, Request } from 'express'

export abstract class AbstractController {
  public abstract async list(req: Request, res: Response): Promise<Response>
  public abstract async create(req: Request, res: Response): Promise<Response>
  public abstract async update(req: Request, res: Response): Promise<Response>
  public abstract async remove(req: Request, res: Response): Promise<Response>
  public abstract async delete(req: Request, res: Response): Promise<Response>
}
