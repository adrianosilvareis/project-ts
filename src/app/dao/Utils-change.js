class Utils {
  toRegExpObject (obj) {
    return Object.entries(obj).reduce((acc, curr) => {
      acc[curr[0]] = new RegExp(curr[1])
      return acc
    }, {})
  }

  toFloor (number) {
    const value = Math.floor(number)

    return (!isNaN(value) ? value : 0)
  }

  getSkip (limit, page) {
    const _limit = Math.floor(limit)
    const _page = Math.floor(page)

    if (!_page || !_limit) return 0

    return _limit * (_page - 1)
  }

  getSortabled (sort, order) {
    const obj = {}
    obj[sort] = order

    return obj
  }
}

module.exports = Utils
