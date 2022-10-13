import { z } from 'zod'

import { Controller } from '@/presentation/contracts'
import { ZodSchemaValidator } from '@/presentation/helpers/zod-schema-validator'
import { MongoLoadUniversityByProps } from '@/infra/mongo/load-university-by-props'
import { MongoAddUniversity } from '@/infra/mongo/add-university'
import { AddUniversity } from '@/data/add-university-use-case'
import { AddUniversityController } from '@/presentation/controllers/add-university'

export function makeAddUniversityController(): Controller {
  const zodSchema = z.object({
    name: z.string().min(5).max(100),
    country: z.string().min(5).max(25),
    stateProvince: z.string().min(5).max(25).nullable(),
    domains: z.array(z.string().min(5).max(100)),
    webPages: z.array(z.string().min(5).max(100).url()),
    alphaTwoCode: z.string().min(2).max(2)
  })
  const zodSchemaValidator = new ZodSchemaValidator(zodSchema)
  const loadUniversityByPropsRepository = new MongoLoadUniversityByProps()
  const addUniversityRepository = new MongoAddUniversity()
  const useCase = new AddUniversity(
    loadUniversityByPropsRepository,
    addUniversityRepository
  )
  return new AddUniversityController(zodSchemaValidator, useCase)
}
