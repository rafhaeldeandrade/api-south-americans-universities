import {
  UpdateUniversityUseCase,
  UpdateUniversityUseCaseInput,
  UpdateUniversityUseCaseOutput
} from '@/domain/contracts'
import { LoadUniversityByIdRepository } from './contracts'

export class UpdateUniversity implements UpdateUniversityUseCase {
  constructor(
    private readonly loadUniversityByIdRepository: LoadUniversityByIdRepository
  ) {}

  async update(
    props: UpdateUniversityUseCaseInput
  ): Promise<UpdateUniversityUseCaseOutput> {
    const { universityId } = props
    await this.loadUniversityByIdRepository.load(universityId)
    return null
  }
}
