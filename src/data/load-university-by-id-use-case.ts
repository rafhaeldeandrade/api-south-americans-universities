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
    const university = await this.loadUniversityByIdRepository.load(
      props.universityId
    )
    return university
  }
}
