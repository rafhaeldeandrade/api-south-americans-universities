import {
  AddUniversityUseCase,
  AddUniversityUseCaseInput,
  AddUniversityUseCaseOutput
} from '@/domain/contracts'
import { LoadUniversityByPropsRepository } from './contracts'

export class AddUniversity implements AddUniversityUseCase {
  constructor(
    private readonly loadUniversityByPropsRepositoryStub: LoadUniversityByPropsRepository
  ) {}

  async add(
    props: AddUniversityUseCaseInput
  ): Promise<AddUniversityUseCaseOutput> {
    await this.loadUniversityByPropsRepositoryStub.load({
      name: props.name,
      stateProvince: props.stateProvince,
      country: props.country
    })
    return null
  }
}
