import {
  DeleteUniversityRepository,
  DeleteUniversityRepositoryInput,
  DeleteUniversityRepositoryOutput
} from '@/data/contracts'
import { UniversityModel } from './schemas/university'

export class MongoDeleteUniversity implements DeleteUniversityRepository {
  async delete(
    id: DeleteUniversityRepositoryInput
  ): Promise<DeleteUniversityRepositoryOutput> {
    try {
      const university = await UniversityModel.findOneAndDelete({ _id: id })
      if (!university) return null
      return true
    } catch (e) {
      return null
    }
  }
}
