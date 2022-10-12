import {
  LoadUniversityByIdUseCase,
  LoadUniversityByIdUseCaseInput,
  LoadUniversityByIdUseCaseOutput
} from '@/domain/contracts'
import { LoadUniversityByIdController } from '@/presentation/controllers/load-university-by-id'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'
import { faker } from '@faker-js/faker'

const LoadUniversityByIdUseCaseStubReturn = {
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  country: faker.address.country(),
  stateProvince: faker.address.state(),
  domains: [faker.internet.domainName()],
  webPages: [faker.internet.url()],
  alphaTwoCode: faker.address.countryCode()
}
class LoadUniversityByIdUseCaseStub implements LoadUniversityByIdUseCase {
  async load(
    props: LoadUniversityByIdUseCaseInput
  ): Promise<LoadUniversityByIdUseCaseOutput> {
    return LoadUniversityByIdUseCaseStubReturn
  }
}

interface SutTypes {
  sut: LoadUniversityByIdController
  loadUniversityByIdUseCaseStub: LoadUniversityByIdUseCase
}

function makeSut(): SutTypes {
  const loadUniversityByIdUseCaseStub = new LoadUniversityByIdUseCaseStub()
  const sut = new LoadUniversityByIdController(loadUniversityByIdUseCaseStub)
  return {
    sut,
    loadUniversityByIdUseCaseStub
  }
}

describe('LoadUniversityById Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named handle', () => {
    const { sut } = makeSut()
    expect(sut.handle).toBeDefined()
  })

  it('should return 400 if universityId is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('universityId'))
    )
  })

  it('should call loadUniversityByIdUseCase with the correct values', async () => {
    const { sut, loadUniversityByIdUseCaseStub } = makeSut()
    const loadSpy = jest.spyOn(loadUniversityByIdUseCaseStub, 'load')
    const httpRequest = {
      params: {
        universityId: faker.datatype.uuid()
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith({
      universityId: httpRequest.params.universityId
    })
  })
})
