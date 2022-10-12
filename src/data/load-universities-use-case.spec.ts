import { faker } from '@faker-js/faker'

import { LoadUniversities } from '@/data/load-universities-use-case'
import {
  CountTotalDocumentsRepository,
  LoadUniversitiesRepository,
  LoadUniversitiesRepositoryInput,
  LoadUniversitiesRepositoryOutput
} from '@/data/contracts'
import { LoadUniversitiesUseCaseInput } from '@/domain/contracts'

const CountTotalDocumentsRepositoryStubReturn = faker.datatype.number(1000)
class CountTotalDocumentsRepositoryStub
  implements CountTotalDocumentsRepository
{
  async count() {
    return CountTotalDocumentsRepositoryStubReturn
  }
}

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
  countTotalDocumentsRepositoryStub: CountTotalDocumentsRepository
  loadUniversitiesRepositoryStub: LoadUniversitiesRepository
}

function makeSut(): SutTypes {
  const countTotalDocumentsRepositoryStub =
    new CountTotalDocumentsRepositoryStub()
  const loadUniversitiesRepositoryStub = new LoadUniversitiesRepositoryStub()
  const sut = new LoadUniversities(
    countTotalDocumentsRepositoryStub,
    loadUniversitiesRepositoryStub
  )
  return {
    sut,
    countTotalDocumentsRepositoryStub,
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

  it('should call countTotalDocumentsRepository with correct values', async () => {
    const { sut, countTotalDocumentsRepositoryStub } = makeSut()
    const countSpy = jest.spyOn(countTotalDocumentsRepositoryStub, 'count')
    const props = {} as LoadUniversitiesUseCaseInput
    await sut.load(props)
    expect(countSpy).toHaveBeenCalledTimes(1)
    expect(countSpy).toHaveBeenCalledWith({
      country: props.country
    })
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
    const props = {
      country: faker.address.country()
    } as LoadUniversitiesUseCaseInput
    const promise = sut.load(props)
    await expect(promise).rejects.toThrow()
  })
})
