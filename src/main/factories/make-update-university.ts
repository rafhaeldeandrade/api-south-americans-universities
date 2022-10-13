import { z } from 'zod'

import { Controller } from '@/presentation/contracts'
import { ZodSchemaValidator } from '@/presentation/helpers/zod-schema-validator'
import { MongoUpdateUniversity } from '@/infra/mongo/update-university'
import { UpdateUniversity } from '@/data/update-university-use-case'
import { UpdateUniversityController } from '@/presentation/controllers/update-university'

export function makeUpdateUniversityController(): Controller {
  const zodSchema = z.object({
    universityId: z.string(),
    name: z.string().min(5).max(100),
    domains: z.array(z.string().min(5).max(100)),
    webPages: z.array(z.string().min(5).max(100).url())
  })
  const zodSchemaValidator = new ZodSchemaValidator(zodSchema)
  const updateUniversityRepository = new MongoUpdateUniversity()
  const useCase = new UpdateUniversity(updateUniversityRepository)
  return new UpdateUniversityController(zodSchemaValidator, useCase)
}
