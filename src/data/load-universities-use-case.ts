import {
  LoadUniversitiesUseCase,
  LoadUniversitiesUseCaseInput,
  LoadUniversitiesUseCaseOutput
} from '@/domain/contracts'
import {
  CountTotalDocumentsRepository,
  LoadUniversitiesRepository,
  LoadUniversitiesRepositoryOutput
} from '@/data/contracts'

export class LoadUniversities implements LoadUniversitiesUseCase {
  constructor(
    private readonly counTotalDocumentsRepository: CountTotalDocumentsRepository,
    private readonly loadUniversitiesRepository: LoadUniversitiesRepository
  ) {}

  async load(
    props: LoadUniversitiesUseCaseInput
  ): Promise<LoadUniversitiesUseCaseOutput> {
    const { page } = props
    const DOCUMENTS_PER_PAGE = 20
    let skipDocuments = 0
    if (page) skipDocuments = (page - 1) * DOCUMENTS_PER_PAGE
    const totalDocuments = await this.counTotalDocumentsRepository.count({
      country: props.country
    })
    const universities = await this.loadUniversitiesRepository.load({
      country: props.country,
      skip: skipDocuments,
      limit: DOCUMENTS_PER_PAGE
    })
    return {
      totalPages: Math.ceil(totalDocuments / DOCUMENTS_PER_PAGE),
      universities: this.mapFromModelUseCaseOutput(universities)
    }
  }

  mapFromModelUseCaseOutput(universities: LoadUniversitiesRepositoryOutput) {
    return universities.map(({ id, name, country, stateProvince }) => ({
      id,
      name,
      country,
      stateProvince
    }))
  }
}
