import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { universityRouter } from '@/main/config/express/university.routes'

const app = express()
app.use(json({ strict: false }))
app.use(urlencoded({ extended: true }))
app.use(cors())

app.use('/api/universities', universityRouter)

export { app }
