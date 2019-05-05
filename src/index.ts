import app from './app'
import { Database } from './module/database'
import { dbhost, dbname } from './config/variable.json'

new Database(dbhost, dbname).createMongoConnection()

app.listen(3000)
