import {
  LoadUniversityByIdUseCase,
  LoadUniversityByIdUseCaseInput,
  LoadUniversityByIdUseCaseOutput
} from '@/domain/contracts'
import { LoadUniversityByIdRepository } from '@/data/contracts'

export class LoadUniversityById implements LoadUniversityByIdUseCase {
  constructor(
    private readonly loadUniversityByIdRepository: LoadUniversityByIdRepository
  ) {}

  async load(
    props: LoadUniversityByIdUseCaseInput
  ): Promise<LoadUniversityByIdUseCaseOutput> {
    await this.loadUniversityByIdRepository.load(props.universityId)
    return {
      id: '1',
      name: 'University of California, Berkeley',
      country: 'United States',
      stateProvince: 'California',
      domains: ['berkeley.edu'],
      webPages: ['http://www.berkeley.edu/'],
      alphaTwoCode: 'US'
    }
  }
}
