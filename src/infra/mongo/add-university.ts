import {
  AddUniversityRepository,
  AddUniversityRepositoryInput,
  AddUniversityRepositoryOutput
} from '@/data/contracts'
import { UniversityModel } from '@/infra/mongo/schemas/university'

export class MongoAddUniversity implements AddUniversityRepository {
  async add(
    props: AddUniversityRepositoryInput
  ): Promise<AddUniversityRepositoryOutput> {
    const savedUniversity = await UniversityModel.create(props)
    return {
      id: savedUniversity._id.toString(),
      name: savedUniversity.name,
      country: savedUniversity.country,
      stateProvince: savedUniversity.stateProvince,
      domains: savedUniversity.domains,
      webPages: savedUniversity.webPages,
      alphaTwoCode: savedUniversity.alphaTwoCode
    }
  }
}
