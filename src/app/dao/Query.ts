import mongoose, { Document, Model } from 'mongoose'
import { boomify } from 'boom'

export class Query<T extends Document> {
  public Model: Model<T>;
  public count: number;
  public limit: number;
  public page: number;
  public sort: string;
  public order: string;
  public find: object;

  public constructor (Model: mongoose.Model<T, {}>, { _limit = 10, _page = 1, _sort = 'desc', _order = '_id', _next, _prev, _last, _first, ..._find }) {
    this.Model = Model
    this.limit = _limit
    this.page = _page
    this.sort = _sort
    this.order = _order
    this.find = _find

    if (_next) {
      this._next()
    } else if (_prev) {
      this._prev()
    } else if (_last) {
      this._last()
    } else if (_first) {
      this._first()
    }
  }

  public async counter (): Promise<number> {
    try {
      this.count = await this.Model.countDocuments(this.find)
      return this.count
    } catch (error) {
      boomify(error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async exec (): Promise<any> {
    const skip = this._skip(this.limit, this.page)
    return this.Model.find(this.find).skip(skip).limit(this.limit).sort(this.sort)
  }

  private _skip (_limit: number, _page: number): number {
    return _limit * (_page - 1)
  }

  private _next (): void {
    this.page++
  }

  private _prev (): void {
    this.page--
  }

  private async _last (): Promise<void> {
    if (!this.count) await this.counter()

    this.page = Math.round(this.count / this.limit)
  }

  private _first (): void {
    this.page = 1
  }
}
