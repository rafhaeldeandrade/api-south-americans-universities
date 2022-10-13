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
    const deleted = await this.deleteUniversityRepository.delete(universityId)
    if (!deleted) return null
    return {
      id: universityId
    }
  }
}
