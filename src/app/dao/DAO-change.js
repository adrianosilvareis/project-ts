const Utils = require('./Utils.js')

class DAO extends Utils {
  constructor (Model) {
    super()
    this.Model = Model
  }

  setQuery (query) {
    const { limit = 10, page = 1, sort = '_id', order = 'asc', ...find } = query

    this.find = this.toRegExpObject(find)

    this.limit = this.toFloor(limit)

    this.page = this.toFloor(page)

    this.skip = this.getSkip(this.limit, this.page)

    this.sort = this.getSortabled(sort, order)
  }

  defaultError (res, error) {
    res.status(error.status).json(error.message)
  }

  settings (req, res, next) {}

  findList (query) {
    this.setQuery(query)

    const error = { message: 'Invalid params { limit or page }', error: 'NOT_VALID', status: 500 }
    if (!this.limit || !this.page) throw error

    return this.Model.find(this.find).skip(this.skip).limit(this.limit).sort(this.sort)
  }

  getCount (query) {
    this.setQuery(query)

    return this.Model.count(this.find)
  }

  findById (_id) {
    const error = { message: 'Contato não encontrado', error: 'NOT_FIND', status: 404 }
    if (!_id) throw error

    return this.Model.findById(_id).lean().exec()
  }

  create (data) {
    return this.Model.create(data)
  }

  update (_id, data) {
    return this.Model.findByIdAndUpdate(_id, data, { new: true }).exec()
  }

  cancel (_id) {
    const objeto = this.findById(_id)
    objeto.status = 0 /** implementar class enum */

    return this.update(_id, objeto)
  }

  remove (_id) {
    return this.Model.findOneAndRemove({ _id })
  }
}

module.exports = DAO
