import { LoadUniversityById } from '@/data/load-university-by-id-use-case'
import { faker } from '@faker-js/faker'
import {
  LoadUniversityByIdRepository,
  LoadUniversityByIdRepositoryInput,
  LoadUniversityByIdRepositoryOutput
} from '@/data/contracts'

const LoadUniversityByIdRepositoryStubReturn = {
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  country: faker.address.country(),
  stateProvince: faker.address.state(),
  domains: [faker.internet.domainName()],
  webPages: [faker.internet.url()],
  alphaTwoCode: faker.address.countryCode()
}
class LoadUniversityByIdRepositoryStub implements LoadUniversityByIdRepository {
  async load(
    id: LoadUniversityByIdRepositoryInput
  ): Promise<LoadUniversityByIdRepositoryOutput> {
    return LoadUniversityByIdRepositoryStubReturn
  }
}

interface SutTypes {
  sut: LoadUniversityById
  loadUniversityByIdRepositoryStub: LoadUniversityByIdRepository
}

function makeSut(): SutTypes {
  const loadUniversityByIdRepositoryStub =
    new LoadUniversityByIdRepositoryStub()
  const sut = new LoadUniversityById(loadUniversityByIdRepositoryStub)
  return { sut, loadUniversityByIdRepositoryStub }
}

describe('LoadUniversityById use case', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named load', () => {
    const { sut } = makeSut()
    expect(sut.load).toBeDefined()
  })

  it('should call loadUniversityByIdRepository with the correct value', async () => {
    const { sut, loadUniversityByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUniversityByIdRepositoryStub, 'load')
    const props = {
      universityId: faker.datatype.uuid()
    }
    await sut.load(props)
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(props.universityId)
  })

  it('should throw if loadUniversityByIdRepository throws', async () => {
    const { sut, loadUniversityByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadUniversityByIdRepositoryStub, 'load')
      .mockRejectedValueOnce(new Error())
    const props = {
      universityId: faker.datatype.uuid()
    }
    const promise = sut.load(props)
    await expect(promise).rejects.toThrow()
  })
})
