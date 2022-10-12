import { Router } from 'express'
import { makeLoadUniversitiesController } from '@/main/factories/make-load-universities'
import { adaptRoute } from '@/main/config/express/adapt-routes'
import { makeLoadUniversityByIdController } from '@/main/factories/make-load-university-by-id'

export const universityRouter = Router()

universityRouter.get(
  '/:universityId',
  adaptRoute(makeLoadUniversityByIdController())
)
universityRouter.get('/', adaptRoute(makeLoadUniversitiesController()))
