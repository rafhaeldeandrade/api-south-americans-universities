import { UpdateUniversityController } from '@/presentation/controllers/update-university'
import { faker } from '@faker-js/faker'
import { SchemaValidator } from '@/presentation/contracts'

class SchemaValidationStub implements SchemaValidator {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

interface SutTypes {
  sut: UpdateUniversityController
  schemaValidatorStub: SchemaValidator
}

function makeSut(): SutTypes {
  const schemaValidatorStub = new SchemaValidationStub()
  const sut = new UpdateUniversityController(schemaValidatorStub)
  return {
    sut,
    schemaValidatorStub
  }
}

function mockHttpRequest() {
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
    const httpRequest = mockHttpRequest()
    sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith({
      webPages: httpRequest.body.webPages,
      name: httpRequest.body.name,
      domains: httpRequest.body.domains,
      universityId: httpRequest.params.universityId
    })
  })
})
