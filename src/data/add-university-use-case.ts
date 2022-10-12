import {
  AddUniversityUseCase,
  AddUniversityUseCaseInput,
  AddUniversityUseCaseOutput
} from '@/domain/contracts'
import {
  AddUniversityRepository,
  LoadUniversityByPropsRepository
} from '@/data/contracts'

export class AddUniversity implements AddUniversityUseCase {
  constructor(
    private readonly loadUniversityByPropsRepositoryStub: LoadUniversityByPropsRepository,
    private readonly addUniversityRepository: AddUniversityRepository
  ) {}

  async add(
    props: AddUniversityUseCaseInput
  ): Promise<AddUniversityUseCaseOutput> {
    const university = await this.loadUniversityByPropsRepositoryStub.load({
      name: props.name,
      stateProvince: props.stateProvince,
      country: props.country
    })
    if (university) return null
    const savedUniversity = await this.addUniversityRepository.add({
      name: props.name,
      stateProvince: props.stateProvince,
      country: props.country,
      domains: props.domains,
      webPages: props.webPages,
      alphaTwoCode: props.alphaTwoCode
    })
    return savedUniversity
  }
}
