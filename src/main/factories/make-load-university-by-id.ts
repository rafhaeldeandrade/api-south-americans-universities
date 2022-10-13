import { z } from 'zod'

import { Controller } from '@/presentation/contracts'
import { MongoLoadUniversityById } from '@/infra/mongo/load-university-by-id'
import { LoadUniversityById } from '@/data/load-university-by-id-use-case'
import { LoadUniversityByIdController } from '@/presentation/controllers/load-university-by-id'
import { ZodSchemaValidator } from '@/presentation/helpers/zod-schema-validator'

export function makeLoadUniversityByIdController(): Controller {
  const zodSchema = z.object({
    universityId: z.string()
  })
  const schemaValidator = new ZodSchemaValidator(zodSchema)
  const loadUniversityByIdRepository = new MongoLoadUniversityById()
  const useCase = new LoadUniversityById(loadUniversityByIdRepository)
  return new LoadUniversityByIdController(schemaValidator, useCase)
}
