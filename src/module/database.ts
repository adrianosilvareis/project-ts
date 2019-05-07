import { connect, connection } from 'mongoose'

export class Database {
  public dbUri: string;
  public dbName: string;

  public constructor (dbUri: string, dbName: string) {
    this.dbUri = dbUri
    this.dbName = dbName
  }

  public createMongoConnection (): void {
    connect(`mongodb://${this.dbUri}:27017/${this.dbName}`, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    connection.on('open', (): void => console.log('database on'))
    connection.on('error', (err): void => console.warn('database error', err))
  }
}
