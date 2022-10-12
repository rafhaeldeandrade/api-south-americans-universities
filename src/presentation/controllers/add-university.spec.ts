import { AddUniversityController } from '@/presentation/controllers/add-uninversity'
import { HttpRequest, SchemaValidator } from '@/presentation/contracts'
import { faker } from '@faker-js/faker'
import {
  AddUniversityUseCase,
  AddUniversityUseCaseInput,
  AddUniversityUseCaseOutput
} from '@/domain/contracts'

class SchemaValidationStub implements SchemaValidator {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

const AddUniversityUseCaseStubReturn = {
  id: faker.datatype.uuid(),
  name: faker.lorem.words(),
  domains: [faker.internet.domainName()],
  country: faker.address.country(),
  stateProvince: faker.address.state(),
  alphaTwoCode: faker.address.countryCode(),
  webPages: [faker.internet.url()]
}
class AddUniversityUseCaseStub implements AddUniversityUseCase {
  async add(
    university: AddUniversityUseCaseInput
  ): Promise<AddUniversityUseCaseOutput> {
    return AddUniversityUseCaseStubReturn
  }
}

interface SutTypes {
  sut: AddUniversityController
  schemaValidationStub: SchemaValidator
  addUniversityUseCaseStub: AddUniversityUseCase
}

function makeSut(): SutTypes {
  const schemaValidationStub = new SchemaValidationStub()
  const addUniversityUseCaseStub = new AddUniversityUseCaseStub()
  const sut = new AddUniversityController(
    schemaValidationStub,
    addUniversityUseCaseStub
  )
  return {
    sut,
    schemaValidationStub,
    addUniversityUseCaseStub
  }
}

function mockRequest(): HttpRequest {
  return {
    body: {
      name: faker.lorem.words(),
      domains: [faker.internet.domainName()],
      country: faker.address.country(),
      stateProvince: faker.address.state(),
      alphaTwoCode: faker.address.countryCode(),
      webPages: [faker.internet.url()]
    }
  }
}

describe('AddUniversity Controller', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named handle', () => {
    const { sut } = makeSut()
    expect(sut.handle).toBeDefined()
  })

  it('should call schemaValidator.validate with the correct values', async () => {
    const { sut, schemaValidationStub } = makeSut()
    const httpRequest = mockRequest()
    const validateSpy = jest.spyOn(schemaValidationStub, 'validate')
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if schemaValidator.validate returns an error', async () => {
    const { sut, schemaValidationStub } = makeSut()
    const httpRequest = mockRequest()
    const error = new Error('teste')
    jest.spyOn(schemaValidationStub, 'validate').mockResolvedValueOnce(error)
    const promise = sut.handle(httpRequest)
    await expect(promise).resolves.toEqual({
      statusCode: 400,
      body: {
        error: true,
        [error.name]: error.message
      }
    })
  })

  it('should return 500 if schemaValidator.validate throws an error', async () => {
    const { sut, schemaValidationStub } = makeSut()
    const httpRequest = mockRequest()
    jest
      .spyOn(schemaValidationStub, 'validate')
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

  it('should call addUniversityUseCase.add with the correct values', async () => {
    const { sut, addUniversityUseCaseStub } = makeSut()
    const addSpy = jest.spyOn(addUniversityUseCaseStub, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest?.body?.name,
      domains: httpRequest?.body?.domains,
      country: httpRequest?.body?.country,
      stateProvince: httpRequest?.body?.stateProvince,
      alphaTwoCode: httpRequest?.body?.alphaTwoCode,
      webPages: httpRequest?.body?.webPages
    })
  })

  it('should return 500 if addUniversityUseCase throws an error', async () => {
    const { sut, addUniversityUseCaseStub } = makeSut()
    const httpRequest = mockRequest()
    jest
      .spyOn(addUniversityUseCaseStub, 'add')
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

  it('should return 409 if addUniversityUseCase returns null', async () => {
    const { sut, addUniversityUseCaseStub } = makeSut()
    const httpRequest = mockRequest()
    jest.spyOn(addUniversityUseCaseStub, 'add').mockResolvedValueOnce(null)
    const promise = sut.handle(httpRequest)
    await expect(promise).resolves.toEqual({
      statusCode: 409,
      body: {
        error: true,
        ResourceAlreadyExistsError: 'University already exists'
      }
    })
  })

  it('should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const promise = sut.handle(httpRequest)
    await expect(promise).resolves.toEqual({
      statusCode: 201,
      body: AddUniversityUseCaseStubReturn
    })
  })
})
