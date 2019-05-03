import { Document, SchemaDefinition, SchemaOptions, Schema } from 'mongoose'

export class Repository<T extends Document> {
  private _schema: Schema

  public constructor (schemaDefinition: SchemaDefinition, options?: SchemaOptions) {
    this._createSchema(schemaDefinition, options)
    this._addHookSchema(schemaDefinition)
  }

  private arrayToSchema (keys: string[], schemaDefinition: SchemaDefinition): SchemaDefinition {
    return keys.reduce((schema, key): SchemaDefinition => {
      schema[key] = schemaDefinition[key]
      return schema
    }, {})
  }

  private _createSchema (schemaDefinition: SchemaDefinition, options?: SchemaOptions): void {
    const schema = Object.keys(schemaDefinition).filter((key: string): boolean => typeof schemaDefinition[key] !== 'function')

    this._schema = new Schema(this.arrayToSchema(schema, schemaDefinition), options)
  }

  private _addHookSchema (schemaDefinition: SchemaDefinition): void {
    const methods = Object.keys(schemaDefinition)
      .filter((key: string): boolean => typeof schemaDefinition[key] === 'function')
      .filter((key: string): boolean => key.slice(0, 3) === 'pre' || key.slice(0, 3) === 'post')
      .map((key: string): [string, string] => {
        const lower = key.toLowerCase()
        return [lower.slice(0, 3), lower.slice(3)]
      })

    methods.forEach(([key, func]: [string, string]): void => {
      this._schema[key] = func
    })
  }
}
