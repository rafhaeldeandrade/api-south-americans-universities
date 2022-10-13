import { faker } from '@faker-js/faker'

import { UpdateUniversity } from '@/data/update-university-use-case'
import {
  LoadUniversityByIdRepository,
  LoadUniversityByIdRepositoryInput,
  LoadUniversityByIdRepositoryOutput
} from '@/data/contracts'

const loadUniversityByIdRepositoryStubReturn = {
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
    return loadUniversityByIdRepositoryStubReturn
  }
}

interface SutTypes {
  sut: UpdateUniversity
  loadUniversityByIdRepositoryStub: LoadUniversityByIdRepository
}

function makeSut(): SutTypes {
  const loadUniversityByIdRepositoryStub =
    new LoadUniversityByIdRepositoryStub()
  const sut = new UpdateUniversity(loadUniversityByIdRepositoryStub)
  return {
    sut,
    loadUniversityByIdRepositoryStub
  }
}

function mockProps() {
  return {
    universityId: faker.datatype.uuid(),
    name: faker.lorem.words(),
    domains: [faker.internet.domainName()],
    webPages: [faker.internet.url()]
  }
}

describe('UpdateUniversity use case', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named update', async () => {
    const { sut } = makeSut()
    expect(sut.update).toBeDefined()
  })

  it('should call loadUniversityById.load with the correct values', async () => {
    const { sut, loadUniversityByIdRepositoryStub } = makeSut()
    const props = mockProps()
    const loadSpy = jest.spyOn(loadUniversityByIdRepositoryStub, 'load')
    await sut.update(props)
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(props.universityId)
  })

  it('should throw if loadUniversityByIdRepository.load throws', async () => {
    const { sut, loadUniversityByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadUniversityByIdRepositoryStub, 'load')
      .mockRejectedValueOnce(new Error())
    const props = mockProps()
    const promise = sut.update(props)
    await expect(promise).rejects.toThrow()
  })
})
