import { AddUniversity } from '@/data/add-university-use-case'
import { AddUniversityUseCaseInput } from '@/domain/contracts'
import { faker } from '@faker-js/faker'
import {
  LoadUniversityByPropsRepository,
  LoadUniversityBypropsRepositoryInput,
  LoadUniversityBypropsRepositoryOutput
} from '@/data/contracts'

const LoadUniversityByPropsRepositoryStubReturn = {
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

interface SutTypes {
  sut: AddUniversity
  loadUniversityByPropsRepositoryStub: LoadUniversityByPropsRepository
}

function makeSut(): SutTypes {
  const loadUniversityByPropsRepositoryStub =
    new LoadUniversityByPropsRepositoryStub()
  const sut = new AddUniversity(loadUniversityByPropsRepositoryStub)
  return { sut, loadUniversityByPropsRepositoryStub }
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
      .mockResolvedValueOnce(LoadUniversityByPropsRepositoryStubReturn)
    const promise = sut.add(props)
    await expect(promise).resolves.toBeNull()
  })
})
