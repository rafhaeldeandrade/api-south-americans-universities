import {
  LoadUniversityByPropsRepository,
  LoadUniversityBypropsRepositoryInput,
  LoadUniversityBypropsRepositoryOutput
} from '@/data/contracts'
import { UniversityModel } from '@/infra/mongo/schemas/university'

export class MongoLoadUniversityByProps
  implements LoadUniversityByPropsRepository
{
  async load(
    props: LoadUniversityBypropsRepositoryInput
  ): Promise<LoadUniversityBypropsRepositoryOutput> {
    const filters = {} as any
    const { name, stateProvince, country } = props
    if (name) filters.name = name
    if (stateProvince || stateProvince === null) {
      filters.stateProvince = stateProvince
    }
    if (country) filters.country = props.country
    const university = await UniversityModel.findOne(
      filters,
      {},
      { lean: true }
    )
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
  }
}
