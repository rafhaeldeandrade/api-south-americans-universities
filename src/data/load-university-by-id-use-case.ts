import {
  LoadUniversityByIdUseCase,
  LoadUniversityByIdUseCaseInput,
  LoadUniversityByIdUseCaseOutput
} from '@/domain/contracts'

export class LoadUniversityById implements LoadUniversityByIdUseCase {
  async load(
    props: LoadUniversityByIdUseCaseInput
  ): Promise<LoadUniversityByIdUseCaseOutput> {
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
