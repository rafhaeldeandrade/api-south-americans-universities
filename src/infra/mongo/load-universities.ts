import {
  LoadUniversitiesRepository,
  LoadUniversitiesRepositoryInput,
  LoadUniversitiesRepositoryOutput
} from '@/data/contracts'
import { UniversityModel } from '@/infra/mongo/schemas/university'

export class MongoLoadUniversities implements LoadUniversitiesRepository {
  async load(
    props: LoadUniversitiesRepositoryInput
  ): Promise<LoadUniversitiesRepositoryOutput> {
    const { country, skip, limit } = props
    const filters = {} as any
    if (country) filters.country = { $regex: new RegExp(country, 'i') }
    const universities = await UniversityModel.find(
      filters,
      {},
      { lean: true, skip, limit }
    )
    return universities.map((university) => ({
      id: university._id.toString(),
      name: university.name,
      country: university.country,
      domains: university.domains,
      webPages: university.webPages,
      alphaTwoCode: university.alphaTwoCode,
      stateProvince: university.stateProvince
    }))
  }
}
