import { DeleteUniversityController } from '@/presentation/controllers/delete-university'
import { SchemaValidator } from '@/presentation/contracts'
import { faker } from '@faker-js/faker'

class SchemaValidatorStub implements SchemaValidator {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

interface SutTypes {
  sut: DeleteUniversityController
  schemaValidatorStub: SchemaValidator
}

function makeSut(): SutTypes {
  const schemaValidatorStub = new SchemaValidatorStub()
  const sut = new DeleteUniversityController(schemaValidatorStub)
  return {
    sut,
    schemaValidatorStub
  }
}

function mockRequest() {
  return {
    params: {
      universityId: faker.datatype.uuid()
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
    const { sut, schemaValidatorStub } = makeSut()
    const request = mockRequest()
    const validateSpy = jest.spyOn(schemaValidatorStub, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith({
      universityId: request.params.universityId
    })
  })
})
