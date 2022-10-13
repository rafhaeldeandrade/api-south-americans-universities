import {
  DeleteUniversityUseCase,
  DeleteUniversityUseCaseInput,
  DeleteUniversityUseCaseOutput
} from '@/domain/contracts'
import { DeleteUniversityRepository } from '@/data/contracts'

export class DeleteUniversity implements DeleteUniversityUseCase {
  constructor(
    private readonly deleteUniversityRepository: DeleteUniversityRepository
  ) {}

  async delete(
    universityId: DeleteUniversityUseCaseInput
  ): Promise<DeleteUniversityUseCaseOutput> {
    await this.deleteUniversityRepository.delete(universityId)
    return null as unknown as DeleteUniversityUseCaseOutput
  }
}
