import { UpdateUniversityController } from '@/presentation/controllers/update-university'
import { faker } from '@faker-js/faker'
import { SchemaValidator } from '@/presentation/contracts'

class SchemaValidatorStub implements SchemaValidator {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

interface SutTypes {
  sut: UpdateUniversityController
  schemaValidatorStub: SchemaValidator
}

function makeSut(): SutTypes {
  const schemaValidatorStub = new SchemaValidatorStub()
  const sut = new UpdateUniversityController(schemaValidatorStub)
  return {
    sut,
    schemaValidatorStub
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
    const httpRequest = mockRequest()
    sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith({
      webPages: httpRequest.body.webPages,
      name: httpRequest.body.name,
      domains: httpRequest.body.domains,
      universityId: httpRequest.params.universityId
    })
  })

  it('should return 400 if schemaValidator.validate returns an error', async () => {
    const { sut, schemaValidatorStub } = makeSut()
    const httpRequest = mockRequest()
    const error = new Error('teste')
    jest.spyOn(schemaValidatorStub, 'validate').mockResolvedValueOnce(error)
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
})
