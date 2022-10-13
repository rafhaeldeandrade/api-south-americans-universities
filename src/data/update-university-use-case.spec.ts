import { faker } from '@faker-js/faker'

import { UpdateUniversity } from '@/data/update-university-use-case'
import {
  LoadUniversityByIdRepository,
  LoadUniversityByIdRepositoryInput,
  LoadUniversityByIdRepositoryOutput,
  UpdateUniversityRepository,
  UpdateUniversityRepositoryInput,
  UpdateUniversityRepositoryOutput
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

class UpdateUniversityRepositoryStub implements UpdateUniversityRepository {
  async update(
    props: UpdateUniversityRepositoryInput
  ): Promise<UpdateUniversityRepositoryOutput> {
    return loadUniversityByIdRepositoryStubReturn
  }
}

interface SutTypes {
  sut: UpdateUniversity
  loadUniversityByIdRepositoryStub: LoadUniversityByIdRepository
  updateUniversityRepositoryStub: UpdateUniversityRepository
}

function makeSut(): SutTypes {
  const loadUniversityByIdRepositoryStub =
    new LoadUniversityByIdRepositoryStub()
  const updateUniversityRepositoryStub = new UpdateUniversityRepositoryStub()
  const sut = new UpdateUniversity(
    loadUniversityByIdRepositoryStub,
    updateUniversityRepositoryStub
  )
  return {
    sut,
    loadUniversityByIdRepositoryStub,
    updateUniversityRepositoryStub
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

  it('should return null if loadUniversityByIdRepository.load didnt find a university', async () => {
    const { sut, loadUniversityByIdRepositoryStub } = makeSut()
    const props = mockProps()
    jest
      .spyOn(loadUniversityByIdRepositoryStub, 'load')
      .mockResolvedValueOnce(null)
    const promise = sut.update(props)
    await expect(promise).resolves.toBeNull()
  })

  it('should call updateUniversityRepository.update with the correct values', async () => {
    const { sut, updateUniversityRepositoryStub } = makeSut()
    const props = mockProps()
    const updateSpy = jest.spyOn(updateUniversityRepositoryStub, 'update')
    await sut.update(props)
    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith({
      id: props.universityId,
      name: props.name,
      domains: props.domains,
      webPages: props.webPages
    })
  })

  it('should throw if updateUniversityRepository.update throws', async () => {
    const { sut, updateUniversityRepositoryStub } = makeSut()
    const props = mockProps()
    jest
      .spyOn(updateUniversityRepositoryStub, 'update')
      .mockRejectedValueOnce(new Error())
    const promise = sut.update(props)
    await expect(promise).rejects.toThrow()
  })
})
