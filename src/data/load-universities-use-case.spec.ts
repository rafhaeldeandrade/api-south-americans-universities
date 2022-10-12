import { LoadUniversities } from '@/data/load-universities-use-case'
import {
  LoadUniversitiesRepository,
  LoadUniversitiesRepositoryInput,
  LoadUniversitiesRepositoryOutput
} from '@/data/contracts'
import { LoadUniversitiesUseCaseInput } from '@/domain/contracts'

const LoadUniversitiesRepositoryStubReturn: LoadUniversitiesRepositoryOutput =
  []
class LoadUniversitiesRepositoryStub implements LoadUniversitiesRepository {
  async load(
    props: LoadUniversitiesRepositoryInput
  ): Promise<LoadUniversitiesRepositoryOutput> {
    return LoadUniversitiesRepositoryStubReturn
  }
}

interface SutTypes {
  sut: LoadUniversities
  loadUniversitiesRepositoryStub: LoadUniversitiesRepository
}

function makeSut(): SutTypes {
  const loadUniversitiesRepositoryStub = new LoadUniversitiesRepositoryStub()
  const sut = new LoadUniversities(loadUniversitiesRepositoryStub)
  return {
    sut,
    loadUniversitiesRepositoryStub
  }
}

describe('LoadUniversitiesUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named load', () => {
    const { sut } = makeSut()
    expect(sut.load).toBeDefined()
  })

  it('should call loadUniversitiesRepository with correct values', async () => {
    const { sut, loadUniversitiesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUniversitiesRepositoryStub, 'load')
    const props = {} as LoadUniversitiesUseCaseInput
    await sut.load(props)
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(props)
  })

  it('should throw if loadUniversitiesRepository throws', async () => {
    const { sut, loadUniversitiesRepositoryStub } = makeSut()
    jest
      .spyOn(loadUniversitiesRepositoryStub, 'load')
      .mockRejectedValueOnce(new Error())
    const props = {} as LoadUniversitiesUseCaseInput
    const promise = sut.load(props)
    await expect(promise).rejects.toThrow()
  })
})
