import { UpdateUniversityController } from '@/presentation/controllers/update-university'
import { faker } from '@faker-js/faker'
import { SchemaValidator } from '@/presentation/contracts'
import {
  UpdateUniversityUseCase,
  UpdateUniversityUseCaseInput,
  UpdateUniversityUseCaseOutput
} from '@/domain/contracts'

class SchemaValidatorStub implements SchemaValidator {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

const updateUniversityUseCaseStubReturn = {
  id: faker.datatype.uuid(),
  name: faker.lorem.words(),
  domains: [faker.internet.domainName()],
  country: faker.address.country(),
  stateProvince: faker.address.state(),
  alphaTwoCode: faker.address.countryCode(),
  webPages: [faker.internet.url()]
}
class UpdateUniversityUseCaseStub implements UpdateUniversityUseCase {
  async update(
    props: UpdateUniversityUseCaseInput
  ): Promise<UpdateUniversityUseCaseOutput> {
    return updateUniversityUseCaseStubReturn
  }
}

interface SutTypes {
  sut: UpdateUniversityController
  schemaValidatorStub: SchemaValidator
  updateUniversityUseCaseStub: UpdateUniversityUseCase
}

function makeSut(): SutTypes {
  const schemaValidatorStub = new SchemaValidatorStub()
  const updateUniversityUseCaseStub = new UpdateUniversityUseCaseStub()
  const sut = new UpdateUniversityController(
    schemaValidatorStub,
    updateUniversityUseCaseStub
  )
  return {
    sut,
    schemaValidatorStub,
    updateUniversityUseCaseStub
  }
}

function mockRequest() {
  return {
    params: {
      universityId: faker.datatype.uuid()
    },
    body: {
      webPages: [faker.internet.url()],
      name: faker.company.name(),
      domains: [faker.internet.domainName()]
    }
  }
}

describe('UpdateUniversityController', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named handle', () => {
    const { sut } = makeSut()
    expect(sut.handle).toBeDefined()
  })

  it('should call schemaValidator.validate with the correct values', () => {
    const { sut, schemaValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(schemaValidatorStub, 'validate')
    const request = mockRequest()
    sut.handle(request)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith({
      webPages: request.body.webPages,
      name: request.body.name,
      domains: request.body.domains,
      universityId: request.params.universityId
    })
  })

  it('should return 400 if schemaValidator.validate returns an error', async () => {
    const { sut, schemaValidatorStub } = makeSut()
    const request = mockRequest()
    const error = new Error('teste')
    jest.spyOn(schemaValidatorStub, 'validate').mockResolvedValueOnce(error)
    const promise = sut.handle(request)
    await expect(promise).resolves.toEqual({
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

  it('should call updateUniversityUseCase.update with the correct values', async () => {
    const { sut, updateUniversityUseCaseStub } = makeSut()
    const addSpy = jest.spyOn(updateUniversityUseCaseStub, 'update')
    const request = mockRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith({
      universityId: request.params.universityId,
      name: request.body.name,
      domains: request.body.domains,
      webPages: request.body.webPages
    })
  })

  it('should return 404 if university was not found', async () => {
    const { sut, updateUniversityUseCaseStub } = makeSut()
    jest
      .spyOn(updateUniversityUseCaseStub, 'update')
      .mockResolvedValueOnce(null)
    const request = mockRequest()
    const promise = await sut.handle(request)
    expect(promise).toEqual({
      statusCode: 404,
      body: {}
    })
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const promise = sut.handle(request)
    await expect(promise).resolves.toEqual({
      statusCode: 200,
      body: updateUniversityUseCaseStubReturn
    })
  })
})
