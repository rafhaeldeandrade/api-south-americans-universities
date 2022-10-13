import { z } from 'zod'

import { MongoCountTotalDocuments } from '@/infra/mongo/count-total-documents'
import { UniversityModel } from '@/infra/mongo/schemas/university'
import { MongoLoadUniversities } from '@/infra/mongo/load-universities'
import { Controller } from '@/presentation/contracts'
import { LoadUniversitiesController } from '@/presentation/controllers/load-universities'
import { LoadUniversities } from '@/data/load-universities-use-case'
import { ZodSchemaValidator } from '@/presentation/helpers/zod-schema-validator'

export function makeLoadUniversitiesController(): Controller {
  const zodSchema = z.object({
    page: z.number().optional(),
    country: z.string().optional()
  })
  const schemaValidator = new ZodSchemaValidator(zodSchema)
  const countTotalDocumentsRepository = new MongoCountTotalDocuments(
    UniversityModel
  )
  const loadUniversitiesRepository = new MongoLoadUniversities()
  const useCase = new LoadUniversities(
    countTotalDocumentsRepository,
    loadUniversitiesRepository
  )
  return new LoadUniversitiesController(schemaValidator, useCase)
}
