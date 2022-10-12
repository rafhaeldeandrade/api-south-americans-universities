import { Controller } from '@/presentation/contracts'
import { MongoLoadUniversityById } from '@/infra/mongo/load-university-by-id'
import { LoadUniversityById } from '@/data/load-university-by-id-use-case'
import { LoadUniversityByIdController } from '@/presentation/controllers/load-university-by-id'

export function makeLoadUniversityByIdController(): Controller {
  const loadUniversityById = new MongoLoadUniversityById()
  const useCase = new LoadUniversityById(loadUniversityById)
  return new LoadUniversityByIdController(useCase)
}
