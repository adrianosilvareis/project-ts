import { Document, SchemaDefinition, SchemaOptions, Schema, Model, model } from 'mongoose'

export class Repository<T extends Document> {
  private _schema: Schema
  public ModelName: string

  public constructor (ModelName: string, schemaDefinition: SchemaDefinition, options?: SchemaOptions, methods?: Record<string, Function>) {
    this.ModelName = ModelName
    this._createSchema(schemaDefinition, options, methods)
    this._addHookSchema(schemaDefinition)
  }

  public getModel (): Model<T, {}> {
    return model<T>(this.ModelName, this._schema)
  }

  private arrayToSchema (keys: string[], schemaDefinition: SchemaDefinition): SchemaDefinition {
    return keys.reduce((schema, key): SchemaDefinition => {
      schema[key] = schemaDefinition[key]
      return schema
    }, {})
  }

  private _createSchema (schemaDefinition: SchemaDefinition, options?: SchemaOptions, methods?: Record<string, Function>): void {
    const schema = Object.keys(schemaDefinition).filter((key: string): boolean => typeof schemaDefinition[key] !== 'function')

    this._schema = new Schema(this.arrayToSchema(schema, schemaDefinition), options)

    this._schema.methods = methods || {}
  }

  private _addHookSchema (schemaDefinition: SchemaDefinition): void {
    const methods = Object.keys(schemaDefinition)
      .filter((key: string): boolean => typeof schemaDefinition[key] === 'function')
      .filter((key: string): boolean => key.slice(0, 3) === 'pre' || key.slice(0, 3) === 'post')
      .map((key: string): [string, string, Function] => {
        const lower = key.toLowerCase()
        return [lower.slice(0, 3), lower.slice(3), schemaDefinition[key] as Function]
      })

    methods.forEach(([hook, key, func]: [string, string, Function]): void => {
      this._schema[hook](key, func)
    })
  }
}
