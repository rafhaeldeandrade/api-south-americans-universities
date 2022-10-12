import { Router, RequestHandler } from 'express'
import { makeLoadUniversitiesController } from '@/main/factories/makeLoadUniversities'
import { adaptRoute } from '@/main/config/express/adapt-routes'

export const universityRouter = Router()

universityRouter.get(
  '/',
  adaptRoute(makeLoadUniversitiesController()) as RequestHandler
)
