import { faker } from '@faker-js/faker'

import {
  LoadUniversityByIdUseCase,
  LoadUniversityByIdUseCaseInput,
  LoadUniversityByIdUseCaseOutput
} from '@/domain/contracts'
import { LoadUniversityByIdController } from '@/presentation/controllers/load-university-by-id'
import { SchemaValidator } from '@/presentation/contracts'

class SchemaValidatorStub implements SchemaValidator {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

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
  schemaValidatorStub: SchemaValidator
  loadUniversityByIdUseCaseStub: LoadUniversityByIdUseCase
}

function makeSut(): SutTypes {
  const schemaValidatorStub = new SchemaValidatorStub()
  const loadUniversityByIdUseCaseStub = new LoadUniversityByIdUseCaseStub()
  const sut = new LoadUniversityByIdController(
    schemaValidatorStub,
    loadUniversityByIdUseCaseStub
  )
  return {
    sut,
    schemaValidatorStub,
    loadUniversityByIdUseCaseStub
  }
}

function mockRequest() {
  return {
    params: {
      universityId: faker.datatype.uuid()
    }
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

  it('should call schemaValidator.validate with correct values', async () => {
    const { sut, schemaValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(schemaValidatorStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith({
      universityId: request.params.universityId
    })
  })

  it('should return 400 if schemaValidator.validate returns an error', async () => {
    const { sut, schemaValidatorStub } = makeSut()
    const error = new Error()
    jest.spyOn(schemaValidatorStub, 'validate').mockResolvedValueOnce(error)
    const request = mockRequest()
    const promise = sut.handle(request)
    expect(promise).resolves.toEqual({
      statusCode: 400,
      body: {
        error: true,
        [error.name]: error.message
      }
    })
  })

  it('should return 500 if schemaValidator.validate throws an error', async () => {
    const { sut, schemaValidatorStub } = makeSut()
    const request = mockRequest()
    jest
      .spyOn(schemaValidatorStub, 'validate')
      .mockRejectedValueOnce(new Error())
    const promise = sut.handle(request)
    await expect(promise).resolves.toEqual({
      statusCode: 500,
      body: {
        error: true,
        InternalServerError: 'Something went wrong, try again later'
      }
    })
  })

  it('should call loadUniversityByIdUseCase with the correct values', async () => {
    const { sut, loadUniversityByIdUseCaseStub } = makeSut()
    const loadSpy = jest.spyOn(loadUniversityByIdUseCaseStub, 'load')
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith({
      universityId: request.params.universityId
    })
  })

  it('should return 500 if loadUniversityByIdUseCase throws', async () => {
    const { sut, loadUniversityByIdUseCaseStub } = makeSut()
    jest
      .spyOn(loadUniversityByIdUseCaseStub, 'load')
      .mockRejectedValueOnce(new Error())
    const request = mockRequest()
    const promise = sut.handle(request)
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
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
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
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual({
      statusCode: 404,
      body: {}
    })
  })
})
