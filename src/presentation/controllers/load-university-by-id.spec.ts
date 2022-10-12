import {
  LoadUniversityByIdUseCase,
  LoadUniversityByIdUseCaseInput,
  LoadUniversityByIdUseCaseOutput
} from '@/domain/contracts'
import { LoadUniversityByIdController } from '@/presentation/controllers/load-university-by-id'
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
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: {
        error: true,
        MissingParamError: 'Missing param: universityId'
      }
    })
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

  it('should return 500 if loadUniversityByIdUseCase throws', async () => {
    const { sut, loadUniversityByIdUseCaseStub } = makeSut()
    jest
      .spyOn(loadUniversityByIdUseCaseStub, 'load')
      .mockRejectedValueOnce(new Error())
    const httpRequest = {
      params: {
        universityId: faker.datatype.uuid()
      }
    }
    const promise = sut.handle(httpRequest)
    await expect(promise).resolves.toEqual({
      statusCode: 500,
      body: {
        error: true,
        InternalServerError: 'Something went wrong, try again later'
      }
    })
  })

  it('should return 200 with the correct value on success', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        universityId: faker.datatype.uuid()
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: LoadUniversityByIdUseCaseStubReturn
    })
  })

  it('should return 404 with the correct value if university was not found', async () => {
    const { sut, loadUniversityByIdUseCaseStub } = makeSut()
    jest
      .spyOn(loadUniversityByIdUseCaseStub, 'load')
      .mockResolvedValueOnce(null)
    const httpRequest = {
      params: {
        universityId: faker.datatype.uuid()
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 404,
      body: {}
    })
  })
})
