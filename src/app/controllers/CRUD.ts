import { AbstractController } from './AbstractController'
import mongoose, { Model, Document } from 'mongoose'
import { Response, NextFunction, Request } from 'express'
import { Query } from '../dao/Query'
import { boomify, notFound, badRequest } from 'boom'

class CRUD<T extends Document> implements AbstractController {
  public Model: Model<T>;

  public constructor (Model: mongoose.Model<T, {}>) {
    this.Model = Model
  }

  public async list (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    if (req.method !== 'GET') return next(badRequest('verb not allowed for this method'))

    try {
      const query = new Query(this.Model, req.query)

      const resp = await query.exec()

      return res.status(200).json(resp)
    } catch (error) {
      return next(boomify(error, { message: 'Erro ao listar, por favor, tente novamente' }))
    }
  }

  public async create (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    if (req.method !== 'POST') return next(badRequest('verb not allowed for this method'))

    try {
      const model = await this.Model.create(req.body)
      return res.status(200).json(model)
    } catch (error) {
      return next(boomify(error, { message: 'Erro ao criar objeto, por favor, tente novamente' }))
    }
  }

  public async get (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    if (req.method !== 'GET') return next(badRequest('verb not allowed for this method'))

    try {
      const { _id } = req.params

      if (!_id) return next(badRequest('malformed requisition'))

      const model = await this.Model.findOne({ _id })

      if (!model) throw notFound()

      return res.status(200).json(model)
    } catch (error) {
      return next(boomify(error, { message: 'Erro ao reculperar o objeto, por favor, tente novamente' }))
    }
  }

  public async update (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    if (req.method !== 'PUT') return next(badRequest('verb not allowed for this method'))

    try {
      const { _id } = req.params

      if (!_id) return next(badRequest('malformed requisition'))

      const model = req.body

      const resp = await this.Model.findOneAndUpdate({ _id }, model)

      if (!model) throw notFound()

      return res.status(200).json(resp)
    } catch (error) {
      return next(boomify(error, { message: 'Erro ao atualizar objeto, por favor, tente novamente' }))
    }
  }

  public async cancel (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    if (req.method !== 'PATCH') return next(badRequest('verb not allowed for this method'))

    try {
      const { _id } = req.params

      if (!_id) return next(badRequest('malformed requisition'))

      const model = await this.Model.findOneAndUpdate({ _id }, { enable: false })

      if (!model) throw notFound()

      return res.status(200).json(model)
    } catch (error) {
      return next(boomify(error, { message: 'Erro ao cancelar objeto, por favor, tente novamente' }))
    }
  }

  public async remove (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    if (req.method !== 'DELETE') return next(badRequest('verb not allowed for this method'))

    try {
      const { _id } = req.params

      if (!_id) return next(badRequest('malformed requisition'))

      const model = await this.Model.findOneAndDelete({ _id })

      if (!model) throw notFound()

      return res.status(200).json(model)
    } catch (error) {
      return next(boomify(error, { message: 'Erro ao deletar objeto, por favor, tente novamente' }))
    }
  }
}

export default CRUD
