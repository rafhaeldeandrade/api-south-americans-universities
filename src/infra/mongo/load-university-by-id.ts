import {
  LoadUniversityByIdRepository,
  LoadUniversityByIdRepositoryInput,
  LoadUniversityByIdRepositoryOutput
} from '@/data/contracts'
import { UniversityModel } from '@/infra/mongo/schemas/university'

export class MongoLoadUniversityById implements LoadUniversityByIdRepository {
  async load(
    id: LoadUniversityByIdRepositoryInput
  ): Promise<LoadUniversityByIdRepositoryOutput> {
    try {
      const university = await UniversityModel.findById(id, {}, { lean: true })
      if (!university) return null
      return {
        id: university._id.toString(),
        name: university.name,
        country: university.country,
        stateProvince: university.stateProvince,
        domains: university.domains,
        webPages: university.webPages,
        alphaTwoCode: university.alphaTwoCode
      }
    } catch (e) {
      return null
    }
  }
}
