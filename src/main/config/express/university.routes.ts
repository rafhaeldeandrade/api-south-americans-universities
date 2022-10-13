import { Router } from 'express'
import { makeLoadUniversitiesController } from '@/main/factories/make-load-universities'
import { adaptRoute } from '@/main/config/express/adapt-routes'
import { makeLoadUniversityByIdController } from '@/main/factories/make-load-university-by-id'
import { makeAddUniversityController } from '@/main/factories/make-add-university'
import { makeUpdateUniversityController } from '@/main/factories/make-update-university'

export const universityRouter = Router()

universityRouter.get(
  '/:universityId',
  adaptRoute(makeLoadUniversityByIdController())
)
universityRouter.get('/', adaptRoute(makeLoadUniversitiesController()))
universityRouter.post('/', adaptRoute(makeAddUniversityController()))
universityRouter.put(
  '/:universityId',
  adaptRoute(makeUpdateUniversityController())
)
