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
    const DOCUMENTS_PER_PAGE = 20
    const totalDocuments = await this.counTotalDocumentsRepository.count({
      country: props.country
    })
    const universities = await this.loadUniversitiesRepository.load(props)
    return {
      totalPages: Math.ceil(totalDocuments / DOCUMENTS_PER_PAGE),
      universities
    }
  }
}
