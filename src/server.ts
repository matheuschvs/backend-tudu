import express from 'express'
import 'express-async-errors'
import 'dotenv/config'

import './database'
import './shared/container'

import { handleAppErrors } from './middlewares/handleAppErrors'
import { router } from './routes'

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use(router)

app.use(handleAppErrors)

app.listen(PORT, () => console.log('Listening on port ' + PORT))
