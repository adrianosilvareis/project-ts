import app from './app'
import { Database } from './module/Database'
import { dbhost, dbname } from './config/database.json'

new Database(dbhost, dbname).createMongoConnection()

app.listen(3000)
