import {
  DeleteUniversityUseCase,
  DeleteUniversityUseCaseInput,
  DeleteUniversityUseCaseOutput
} from '@/domain/contracts'

export class DeleteUniversity implements DeleteUniversityUseCase {
  async delete(
    universityId: DeleteUniversityUseCaseInput
  ): Promise<DeleteUniversityUseCaseOutput> {
    return null as unknown as DeleteUniversityUseCaseOutput
  }
}
