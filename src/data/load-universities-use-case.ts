import {
  LoadUniversitiesUseCase,
  LoadUniversitiesUseCaseInput,
  LoadUniversitiesUseCaseOutput
} from '@/domain/contracts'
import {
  CountTotalDocumentsRepository,
  LoadUniversitiesRepository
} from '@/data/contracts'

export class LoadUniversities implements LoadUniversitiesUseCase {
  constructor(
    private readonly counTotalDocumentsRepository: CountTotalDocumentsRepository,
    private readonly loadUniversitiesRepository: LoadUniversitiesRepository
  ) {}

  async load(
    props: LoadUniversitiesUseCaseInput
  ): Promise<LoadUniversitiesUseCaseOutput> {
    await this.counTotalDocumentsRepository.count({
      country: props.country
    })
    await this.loadUniversitiesRepository.load(props)
    return {
      totalPages: 0,
      universities: []
    }
  }
}
