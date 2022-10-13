import {
  UpdateUniversityUseCase,
  UpdateUniversityUseCaseInput,
  UpdateUniversityUseCaseOutput
} from '@/domain/contracts'
import {
  LoadUniversityByIdRepository,
  UpdateUniversityRepository
} from '@/data/contracts'

export class UpdateUniversity implements UpdateUniversityUseCase {
  constructor(
    private readonly updateUniversityRepository: UpdateUniversityRepository
  ) {}

  async update(
    props: UpdateUniversityUseCaseInput
  ): Promise<UpdateUniversityUseCaseOutput> {
    const { universityId, name, webPages, domains } = props
    const updatedUniversity = await this.updateUniversityRepository.update({
      id: universityId,
      name,
      webPages,
      domains
    })
    if (!updatedUniversity) return null
    return updatedUniversity
  }
}
