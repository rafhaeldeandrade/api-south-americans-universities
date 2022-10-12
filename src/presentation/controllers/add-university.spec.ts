import { AddUniversityController } from '@/presentation/controllers/add-uninversity'
import { HttpRequest, SchemaValidator } from '@/presentation/contracts'
import { faker } from '@faker-js/faker'

class SchemaValidationStub implements SchemaValidator {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

interface SutTypes {
  sut: AddUniversityController
  schemaValidationStub: SchemaValidator
}

function makeSut(): SutTypes {
  const schemaValidationStub = new SchemaValidationStub()
  const sut = new AddUniversityController(schemaValidationStub)
  return {
    sut,
    schemaValidationStub
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
})
