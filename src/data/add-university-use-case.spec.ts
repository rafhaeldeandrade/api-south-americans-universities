import { AddUniversity } from '@/data/add-university-use-case'
import { AddUniversityUseCaseInput } from '@/domain/contracts'
import { faker } from '@faker-js/faker'
import {
  AddUniversityRepository,
  AddUniversityRepositoryInput,
  AddUniversityRepositoryOutput,
  LoadUniversityByPropsRepository,
  LoadUniversityBypropsRepositoryInput,
  LoadUniversityBypropsRepositoryOutput
} from '@/data/contracts'

const mockUniversity = {
  id: faker.datatype.uuid(),
  name: faker.lorem.words(),
  domains: [faker.internet.domainName()],
  country: faker.address.country(),
  stateProvince: faker.address.state(),
  alphaTwoCode: faker.address.countryCode(),
  webPages: [faker.internet.url()]
}
class LoadUniversityByPropsRepositoryStub
  implements LoadUniversityByPropsRepository
{
  async load(
    university: LoadUniversityBypropsRepositoryInput
  ): Promise<LoadUniversityBypropsRepositoryOutput> {
    return null
  }
}

class AddUniversityRepositoryStub implements AddUniversityRepository {
  async add(
    university: AddUniversityRepositoryInput
  ): Promise<AddUniversityRepositoryOutput> {
    return mockUniversity
  }
}

interface SutTypes {
  sut: AddUniversity
  loadUniversityByPropsRepositoryStub: LoadUniversityByPropsRepository
  addUniversityRepositoryStub: AddUniversityRepository
}

function makeSut(): SutTypes {
  const loadUniversityByPropsRepositoryStub =
    new LoadUniversityByPropsRepositoryStub()
  const addUniversityRepositoryStub = new AddUniversityRepositoryStub()
  const sut = new AddUniversity(
    loadUniversityByPropsRepositoryStub,
    addUniversityRepositoryStub
  )
  return {
    sut,
    loadUniversityByPropsRepositoryStub,
    addUniversityRepositoryStub
  }
}

function mockProps(): AddUniversityUseCaseInput {
  return {
    name: faker.lorem.words(),
    domains: [faker.internet.domainName()],
    country: faker.address.country(),
    stateProvince: faker.address.state(),
    alphaTwoCode: faker.address.countryCode(),
    webPages: [faker.internet.url()]
  }
}

describe('AddUniversity use case', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named add', async () => {
    const { sut } = makeSut()
    expect(sut.add).toBeDefined()
  })

  it('should call loadUniversityByProps.load with the correct values', async () => {
    const { sut, loadUniversityByPropsRepositoryStub } = makeSut()
    const props = mockProps()
    const loadSpy = jest.spyOn(loadUniversityByPropsRepositoryStub, 'load')
    await sut.add(props)
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith({
      country: props.country,
      stateProvince: props.stateProvince,
      name: props.name
    })
  })

  it('should throw if loadUniversityByProps.load throws', async () => {
    const { sut, loadUniversityByPropsRepositoryStub } = makeSut()
    const props = mockProps()
    jest
      .spyOn(loadUniversityByPropsRepositoryStub, 'load')
      .mockRejectedValueOnce(new Error())
    const promise = sut.add(props)
    await expect(promise).rejects.toThrow()
  })

  it('should return null if loadUniversityByProps.load have found a university', async () => {
    const { sut, loadUniversityByPropsRepositoryStub } = makeSut()
    const props = mockProps()
    jest
      .spyOn(loadUniversityByPropsRepositoryStub, 'load')
      .mockResolvedValueOnce(mockUniversity)
    const promise = sut.add(props)
    await expect(promise).resolves.toBeNull()
  })

  it('should call addUniversityRepository.add with the correct values', async () => {
    const { sut, addUniversityRepositoryStub } = makeSut()
    const props = mockProps()
    const addSpy = jest.spyOn(addUniversityRepositoryStub, 'add')
    await sut.add(props)
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith({
      name: props.name,
      domains: props.domains,
      country: props.country,
      stateProvince: props.stateProvince,
      alphaTwoCode: props.alphaTwoCode,
      webPages: props.webPages
    })
  })

  it('should throw if addUniversityRepository.add throws', async () => {
    const { sut, addUniversityRepositoryStub } = makeSut()
    const props = mockProps()
    jest
      .spyOn(addUniversityRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error())
    const promise = sut.add(props)
    await expect(promise).rejects.toThrow()
  })
})
