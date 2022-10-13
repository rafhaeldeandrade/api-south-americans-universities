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
    private readonly loadUniversityByIdRepository: LoadUniversityByIdRepository,
    private readonly updateUniversityRepository: UpdateUniversityRepository
  ) {}

  async update(
    props: UpdateUniversityUseCaseInput
  ): Promise<UpdateUniversityUseCaseOutput> {
    const { universityId, name, webPages, domains } = props
    const university = await this.loadUniversityByIdRepository.load(
      universityId
    )
    if (!university) return null
    const updatedUniversity = await this.updateUniversityRepository.update({
      id: universityId,
      name,
      webPages,
      domains
    })
    return updatedUniversity
  }
}
