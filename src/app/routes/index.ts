import fs from 'fs'
import path from 'path'
import express from 'express'

export default (app: express.Application): void => {
  fs
    .readdirSync(__dirname)
    .filter((file: string): boolean => /.routes.(ts|js)/.test(file))
    .forEach(async (file: string): Promise<void> => {
      if (file.search('.js') > 0) return require(path.resolve(__dirname, file)).default(app)
      const module = await import(path.resolve(__dirname, file))
      module.default(app)
    })
}
