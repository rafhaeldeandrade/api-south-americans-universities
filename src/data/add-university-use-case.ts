import {
  AddUniversityUseCase,
  AddUniversityUseCaseInput,
  AddUniversityUseCaseOutput
} from '@/domain/contracts'

export class AddUniversity implements AddUniversityUseCase {
  async add(
    university: AddUniversityUseCaseInput
  ): Promise<AddUniversityUseCaseOutput> {
    return null
  }
}
