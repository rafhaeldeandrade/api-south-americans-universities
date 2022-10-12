import {
  LoadUniversitiesUseCase,
  LoadUniversitiesUseCaseInput,
  LoadUniversitiesUseCaseOutput
} from '@/domain/contracts'
import { LoadUniversitiesRepository } from '@/data/contracts'

export class LoadUniversities implements LoadUniversitiesUseCase {
  constructor(
    private readonly loadUniversitiesRepository: LoadUniversitiesRepository
  ) {}

  async load(
    props: LoadUniversitiesUseCaseInput
  ): Promise<LoadUniversitiesUseCaseOutput[]> {
    await this.loadUniversitiesRepository.load(props)
    return []
  }
}
