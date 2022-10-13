import { faker } from '@faker-js/faker'
import { LoadUniversitiesController } from '@/presentation/controllers/load-universities'
import { InvalidParamError } from '@/presentation/errors'
import {
  badRequest,
  internalServerError,
  ok
} from '@/presentation/helpers/http-helper'
import {
  LoadUniversitiesUseCase,
  LoadUniversitiesUseCaseOutput
} from '@/domain/contracts'
import { SchemaValidator } from '../contracts'

class SchemaValidatorStub implements SchemaValidator {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

const LoadUniversitiesUseCaseStubReturn: LoadUniversitiesUseCaseOutput = {
  totalPages: 0,
  universities: []
}
class LoadUniversitiesUseCaseStub implements LoadUniversitiesUseCase {
  async load() {
    return LoadUniversitiesUseCaseStubReturn
  }
}

interface SutTypes {
  sut: LoadUniversitiesController
  schemaValidatorStub: SchemaValidator
  loadUniversitiesUseCaseStub: LoadUniversitiesUseCase
}

function makeSut(): SutTypes {
  const schemaValidatorStub = new SchemaValidatorStub()
  const loadUniversitiesUseCaseStub = new LoadUniversitiesUseCaseStub()
  const sut = new LoadUniversitiesController(
    schemaValidatorStub,
    loadUniversitiesUseCaseStub
  )
  return { sut, schemaValidatorStub, loadUniversitiesUseCaseStub }
}

function mockRequest() {
  return {
    query: {
      page: faker.datatype.number(),
      country: faker.address.country()
    }
  }
}

describe('LoadUniversities Controller', () => {
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
      page: request?.query?.page,
      country: request?.query?.country
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
    const httpRequest = mockRequest()
    jest
      .spyOn(schemaValidatorStub, 'validate')
      .mockRejectedValueOnce(new Error())
    const promise = sut.handle(httpRequest)
    await expect(promise).resolves.toEqual({
      statusCode: 500,
      body: {
        error: true,
        InternalServerError: 'Something went wrong, try again later'
      }
    })
  })

  it('should call loadUniversitiesUseCase with correct values', async () => {
    const { sut, loadUniversitiesUseCaseStub } = makeSut()
    const loadSpy = jest.spyOn(loadUniversitiesUseCaseStub, 'load')
    const fakeHttpRequest = {
      query: {
        page: faker.datatype.number(20),
        country: faker.address.country()
      }
    }
    await sut.handle(fakeHttpRequest)
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith({
      page: fakeHttpRequest.query.page,
      country: fakeHttpRequest.query.country
    })
  })

  it('should return 500 if loadUniversitiesUseCase throws', async () => {
    const { sut, loadUniversitiesUseCaseStub } = makeSut()
    jest
      .spyOn(loadUniversitiesUseCaseStub, 'load')
      .mockRejectedValueOnce(new Error())
    const fakeHttpRequest = {
      query: {
        page: faker.datatype.number(20),
        country: faker.address.country()
      }
    }
    const promise = sut.handle(fakeHttpRequest)
    await expect(promise).resolves.toEqual(internalServerError())
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const fakeHttpRequest = {
      query: {
        page: faker.datatype.number(20),
        country: faker.address.country()
      }
    }
    const promise = sut.handle(fakeHttpRequest)
    await expect(promise).resolves.toEqual(
      ok(LoadUniversitiesUseCaseStubReturn)
    )
  })
})
