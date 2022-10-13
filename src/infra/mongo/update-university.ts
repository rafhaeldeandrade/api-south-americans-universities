import {
  UpdateUniversityRepository,
  UpdateUniversityRepositoryInput,
  UpdateUniversityRepositoryOutput
} from '@/data/contracts'
import { UniversityModel } from '@/infra/mongo/schemas/university'

export class MongoUpdateUniversity implements UpdateUniversityRepository {
  async update(
    props: UpdateUniversityRepositoryInput
  ): Promise<UpdateUniversityRepositoryOutput> {
    try {
      const { id, name, domains, webPages } = props
      const university = await UniversityModel.findOneAndUpdate(
        { _id: id },
        { name, domains, webPages },
        {
          lean: true,
          new: true
        }
      )
      if (!university) return null
      return {
        id: university._id.toString(),
        name: university.name,
        domains: university.domains,
        webPages: university.webPages,
        country: university.country,
        stateProvince: university.stateProvince,
        alphaTwoCode: university.alphaTwoCode
      }
    } catch (e) {
      return null
    }
  }
}
