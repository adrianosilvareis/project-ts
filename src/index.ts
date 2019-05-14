import app from './app'
import { Database } from './module/Database'

new Database(process.env.DB_HOST, process.env.DB_NAME).createMongoConnection()

app.listen(3000)
