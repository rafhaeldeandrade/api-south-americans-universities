import { z } from 'zod'

import { Controller } from '@/presentation/contracts'
import { ZodSchemaValidator } from '@/presentation/helpers/zod-schema-validator'
import { MongoDeleteUniversity } from '@/infra/mongo/delete-university'
import { DeleteUniversity } from '@/data/delete-university-use-case'
import { DeleteUniversityController } from '@/presentation/controllers/delete-university'

export function makeDeleteUniversityController(): Controller {
  const zodSchema = z.object({
    universityId: z.string()
  })
  const schemaValidator = new ZodSchemaValidator(zodSchema)
  const deleteUniversityRepository = new MongoDeleteUniversity()
  const useCase = new DeleteUniversity(deleteUniversityRepository)
  return new DeleteUniversityController(schemaValidator, useCase)
}
