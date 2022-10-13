import { MongoCountTotalDocuments } from '@/infra/mongo/count-total-documents'
import { UniversityModel } from '@/infra/mongo/schemas/university'
import { MongoLoadUniversities } from '@/infra/mongo/load-universities'
import { Controller } from '@/presentation/contracts'
import { LoadUniversitiesController } from '@/presentation/controllers/load-universities'
import { LoadUniversities } from '@/data/load-universities-use-case'

export function makeLoadUniversitiesController(): Controller {
  const countTotalDocumentsRepository = new MongoCountTotalDocuments(
    UniversityModel
  )
  const loadUniversitiesRepository = new MongoLoadUniversities()
  const useCase = new LoadUniversities(
    countTotalDocumentsRepository,
    loadUniversitiesRepository
  )
  return new LoadUniversitiesController(useCase)
}
