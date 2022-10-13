import { faker } from '@faker-js/faker'

import { UpdateUniversity } from '@/data/update-university-use-case'
import {
  UpdateUniversityRepository,
  UpdateUniversityRepositoryInput,
  UpdateUniversityRepositoryOutput
} from '@/data/contracts'

const updateUniversityRepositoryStubReturn = {
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  country: faker.address.country(),
  stateProvince: faker.address.state(),
  domains: [faker.internet.domainName()],
  webPages: [faker.internet.url()],
  alphaTwoCode: faker.address.countryCode()
}
class UpdateUniversityRepositoryStub implements UpdateUniversityRepository {
  async update(
    props: UpdateUniversityRepositoryInput
  ): Promise<UpdateUniversityRepositoryOutput> {
    return updateUniversityRepositoryStubReturn
  }
}

interface SutTypes {
  sut: UpdateUniversity
  updateUniversityRepositoryStub: UpdateUniversityRepository
}

function makeSut(): SutTypes {
  const updateUniversityRepositoryStub = new UpdateUniversityRepositoryStub()
  const sut = new UpdateUniversity(updateUniversityRepositoryStub)
  return {
    sut,
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

  it('should return null if updateUniversityRepository.update return null', async () => {
    const { sut, updateUniversityRepositoryStub } = makeSut()
    const props = mockProps()
    jest
      .spyOn(updateUniversityRepositoryStub, 'update')
      .mockResolvedValueOnce(null)
    const promise = sut.update(props)
    await expect(promise).resolves.toBeNull()
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

  it('should return the correct values on success', async () => {
    const { sut } = makeSut()
    const props = mockProps()
    const promise = sut.update(props)
    await expect(promise).resolves.toEqual({
      id: updateUniversityRepositoryStubReturn.id,
      name: expect.any(String),
      country: updateUniversityRepositoryStubReturn.country,
      stateProvince: updateUniversityRepositoryStubReturn.stateProvince,
      domains: expect.any(Array),
      webPages: expect.any(Array),
      alphaTwoCode: updateUniversityRepositoryStubReturn.alphaTwoCode
    })
  })
})
