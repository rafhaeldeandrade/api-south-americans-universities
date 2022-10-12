import {
  LoadUniversitiesUseCase,
  LoadUniversitiesUseCaseInput,
  LoadUniversitiesUseCaseOutput
} from '@/domain/contracts'

export class LoadUniversities implements LoadUniversitiesUseCase {
  async load(
    props: LoadUniversitiesUseCaseInput
  ): Promise<LoadUniversitiesUseCaseOutput[]> {
    return []
  }
}
