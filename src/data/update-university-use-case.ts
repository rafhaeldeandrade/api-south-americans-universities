import {
  UpdateUniversityUseCase,
  UpdateUniversityUseCaseInput,
  UpdateUniversityUseCaseOutput
} from '@/domain/contracts'

export class UpdateUniversity implements UpdateUniversityUseCase {
  async update(
    props: UpdateUniversityUseCaseInput
  ): Promise<UpdateUniversityUseCaseOutput> {
    return null
  }
}
